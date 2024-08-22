import { useState, useCallback, useRef, useEffect } from 'react';
import { useChatLegalVisaApi } from '../../contexts/chatbot/ChatLegalVisaApi';
import { useRecentChatsApi } from '../../contexts/chatbot/ChatRecentApi';
import { v4 as uuidv4 } from 'uuid';

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
            const loadingMessage = { id: Date.now() + 1, isLoading: true, isUser: false };

            setMessages(prevMessages => [...prevMessages, userMessage, loadingMessage]);

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

                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === loadingMessage.id
                            ? {
                                ...msg,
                                isLoading: false,
                                text: response.answer,
                                detectedLanguage: response.detected_language
                            }
                            : msg
                    )
                );

                if (response.chatHisNo) {
                    currentChatHisNoRef.current = response.chatHisNo;
                    sessionIdRef.current = response.chatHisNo.toString();
                    isNewSessionRef.current = false;
                    localStorage.setItem('chatSessionId', sessionIdRef.current);
                }

            } catch (error) {
                console.error('메시지 전송 중 오류 발생:', error);
                console.log('Response data:', error.response?.data);
                setError(error);
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === loadingMessage.id
                            ? { ...msg, isLoading: false, text: "죄송합니다, 메시지 처리 중 오류가 발생했습니다. 다시 시도해 주세요." }
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