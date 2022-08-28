import { useUser } from '@queries/useUser';
import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import { SendChat, ChatEvent } from './chatType';

export interface Message {
  content: string;
  senderId: number;
  id: number;
}
export default function useChat(chatRoomId: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useUser();

  const receiveMessage = (newMessage: Message) => {
    setMessages((prev) => [newMessage, ...prev]);
  };

  const socket = useMemo(() => io('ws://localhost:8080/goldMarket'), []);
  useEffect(() => {
    socket.on(ChatEvent.CONNECT, () => {
      setIsConnected(true);
    });

    socket.on(ChatEvent.LEAVE, () => {
      setIsConnected(false);
    });

    socket.on(ChatEvent.RECIEVE_MESSAGE, (newMessage: Message) => {
      receiveMessage(newMessage);
    });
    socket.emit(ChatEvent.ENTER, { chatRoomId, userId: user.id });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receive');
    };
  }, []);

  const sendMessage = (message: Partial<SendChat>) => {
    socket.emit(ChatEvent.SEND_MESSAGE, { ...message, chatRoomId });
  };

  return { sendMessage, messages };
}
