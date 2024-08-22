import { useState, useCallback, useRef, useEffect } from 'react';
import { useChatLegalVisaApi } from '../../contexts/chatbot/ChatLegalVisaApi';
import { useRecentChatsApi } from '../../contexts/chatbot/ChatRecentApi';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'dompurify';

export const useChatLegalVisa = (initialSelectedChat, categoryNo) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const sessionIdRef = useRef(null);
    const currentChatHisNoRef = useRef(null);
    const isNewSessionRef = useRef(true);
    const legalVisaApi = useChatLegalVisaApi();
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
        if (!chatHisNo || loadedChatHistoryRef.current === chatHisNo) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const userNo = userData.apiData.userno;
            const response = await recentChatsApi.fetchChatHistory(userNo, chatHisNo);
            if (response && response.apiData) {
                const formattedMessages = response.apiData.flatMap(msg => {
                    const messages = [];
                    if (msg.question) {
                        messages.push({
                            id: `q-${msg.chatHisSeq}`,
                            text: msg.question,
                            isUser: true,
                            detectedLanguage: msg.detectedLanguage
                        });
                    }
                    if (msg.answer) {
                        messages.push({
                            id: `a-${msg.chatHisSeq}`,
                            text: msg.answer,
                            isUser: false,
                            detectedLanguage: msg.detectedLanguage
                        });
                    }
                    return messages;
                });
                setMessages(formattedMessages);
                loadedChatHistoryRef.current = chatHisNo;
            }
        } catch (err) {
            console.error('채팅 내역을 불러오는 중 오류 발생:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [recentChatsApi, userData]);

    useEffect(() => {
        const handleInitialChat = () => {
            if (initialSelectedChat?.chatHisNo !== prevInitialSelectedChatRef.current?.chatHisNo) {
                if (initialSelectedChat && initialSelectedChat.chatHisNo) {
                    currentChatHisNoRef.current = initialSelectedChat.chatHisNo;
                    sessionIdRef.current = initialSelectedChat.chatHisNo.toString();
                    isNewSessionRef.current = false;
                    if (loadedChatHistoryRef.current !== initialSelectedChat.chatHisNo) {
                        loadChatHistory(initialSelectedChat.chatHisNo);
                    }
                } else {
                    setMessages([]);
                    currentChatHisNoRef.current = null;
                    generateNewSessionId();
                    isNewSessionRef.current = true;
                    loadedChatHistoryRef.current = null;
                }
                prevInitialSelectedChatRef.current = initialSelectedChat;
            }
        };

        handleInitialChat();
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
                const response = await legalVisaApi.LegalVisaChatBotData(requestData);
    
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
    
                const formatText = (text) => {
                    // 중복 적용된 <strong> 태그를 피하기 위해 단락 단위로 변환
                    return text.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
                        // 이미 <strong> 태그로 감싸져 있지 않다면, 감싸줍니다.
                        if (!p1.includes("<strong>")) {
                            return `<strong>${p1}</strong>`;
                        }
                        return p1; // 이미 <strong> 태그로 감싸져 있으면 그대로 반환
                    });
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
    }, [legalVisaApi, categoryNo, userData, generateNewSessionId]);
    
    

    return {
        messages,
        setMessages,
        loading,
        error,
        sendMessage,
        loadChatHistory
    };
};