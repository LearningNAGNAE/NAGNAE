import { useState, useCallback, useRef, useEffect } from 'react';
import { useChatMedicalApi } from '../../contexts/chatbot/ChatMedicalApi';
import { useRecentChatsApi } from '../../contexts/chatbot/ChatRecentApi';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'dompurify';

export const useChatMedical = (initialSelectedChat, categoryNo) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const sessionIdRef = useRef(null);
    const currentChatHisNoRef = useRef(null);
    const isNewSessionRef = useRef(true);
    const medicalApi = useChatMedicalApi();
    const recentChatsApi = useRecentChatsApi();
    const loadedChatHistoryRef = useRef(null);
    const prevInitialSelectedChatRef = useRef(null);

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const formatText = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };
    
    const sanitizeHTML = (html) => {
        return DOMPurify.sanitize(html);
    };

    const generateNewSessionId = useCallback(() => {
        const newSessionId = uuidv4();
        sessionIdRef.current = newSessionId;
        localStorage.setItem('chatSessionId', newSessionId);
        return newSessionId;
    }, []);

    const loadChatHistory = useCallback(async (chatHisNo) => {
        // ... (기존 코드 유지)
    }, [recentChatsApi, userData]);

    useEffect(() => {
        // ... (기존 코드 유지)
    }, [initialSelectedChat, loadChatHistory, generateNewSessionId]);

    const sendMessage = useCallback(async (messageText) => {
        if (messageText.trim()) {
            setLoading(true);
            setError(null);
            const userMessage = { id: Date.now(), text: messageText, isUser: true };
            const botMessage = { id: Date.now() + 1, text: '', isUser: false, isLoading: true };
    
            setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);
    
            try {
                if (!sessionIdRef.current) {
                    generateNewSessionId();
                }
    
                const requestData = {
                    question: messageText,
                    userNo: userData.apiData.userno,
                    categoryNo: categoryNo,
                    session_id: sessionIdRef.current,
                    chat_his_no: currentChatHisNoRef.current,
                    is_new_session: isNewSessionRef.current
                };
    
                console.log("Sending request data:", requestData);
                const response = await medicalApi.MedicalChatBotData(requestData);
    
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
    
                let fullResponse = '';
                let currentParagraph = '';
                let paragraphs = [];
                let isNewParagraph = true;
    
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === botMessage.id
                            ? { ...msg, isLoading: false, isStreaming: true }
                            : msg
                    )
                );
    
                const updateMessage = (text) => {
                    setMessages(prevMessages =>
                        prevMessages.map(msg =>
                            msg.id === botMessage.id
                                ? { ...msg, text: sanitizeHTML(text) }
                                : msg
                        )
                    );
                };
    
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    
                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n\n');
                    
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = JSON.parse(line.slice(6));
                            
                            if (data.type === 'content') {
                                if (isNewParagraph && data.text.trim()) {
                                    currentParagraph += data.text;
                                    isNewParagraph = false;
                                } else {
                                    currentParagraph += (currentParagraph ? ' ' : '') + data.text;
                                }
                                fullResponse = [...paragraphs, currentParagraph].join('\n\n');
                                updateMessage(formatText(fullResponse));
                                await new Promise(resolve => setTimeout(resolve, 30));
                            } else if (data.type === 'newline') {
                                if (currentParagraph.trim()) {
                                    paragraphs.push(formatText(currentParagraph.trim()));
                                    currentParagraph = '';
                                    isNewParagraph = true;
                                    fullResponse = paragraphs.join('\n\n');
                                    updateMessage(fullResponse);
                                    await new Promise(resolve => setTimeout(resolve, 200));
                                }
                            } else if (data.type === 'end') {
                                if (currentParagraph.trim()) {
                                    paragraphs.push(formatText(currentParagraph.trim()));
                                    fullResponse = paragraphs.join('\n\n');
                                    updateMessage(fullResponse);
                                }
                                setMessages(prevMessages =>
                                    prevMessages.map(msg =>
                                        msg.id === botMessage.id
                                            ? { ...msg, isStreaming: false, chatHisNo: data.chatHisNo, chatHisSeq: data.chatHisSeq, detectedLanguage: data.detected_language }
                                            : msg
                                    )
                                );
                                currentChatHisNoRef.current = data.chatHisNo;
                                sessionIdRef.current = data.chatHisNo.toString();
                                isNewSessionRef.current = false;
                            }
                        }
                    }
                }
    
            } catch (error) {
                console.error('메시지 전송 중 오류 발생:', error);
                setError(error);
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === botMessage.id
                            ? { ...msg, isStreaming: false, isLoading: false, text: "죄송합니다, 메시지 처리 중 오류가 발생했습니다. 다시 시도해 주세요." }
                            : msg
                    )
                );
            } finally {
                setLoading(false);
            }
        }
    }, [medicalApi, categoryNo, userData, generateNewSessionId]);

    const sendImage = useCallback(async (imageFile) => {
        setLoading(true);
        setError(null);
        const userMessage = { id: Date.now(), image: URL.createObjectURL(imageFile), isUser: true };
        const botMessage = { id: Date.now() + 1, text: '', isUser: false, isLoading: true };

        setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);

        try {
            const response = await medicalApi.describeImage(imageFile);
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.id === botMessage.id
                        ? {
                            ...msg,
                            isLoading: false,
                            text: response.description,
                        }
                        : msg
                )
            );

            if (response.chatHisNo) {
                currentChatHisNoRef.current = response.chatHisNo;
                sessionIdRef.current = response.chatHisNo.toString();
                isNewSessionRef.current = false;
            }

        } catch (error) {
            console.error('이미지 전송 중 오류 발생:', error);
            setError(error);
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.id === botMessage.id
                        ? { ...msg, isLoading: false, text: "죄송합니다, 이미지 처리 중 오류가 발생했습니다. 다시 시도해 주세요." }
                        : msg
                )
            );
        } finally {
            setLoading(false);
        }
    }, [medicalApi]);

    return {
        messages,
        setMessages,
        loading,
        error,
        sendMessage,
        sendImage,
        loadChatHistory
    };
};