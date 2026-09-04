import type { Chat, Message, SendMessagePayload, User } from '@/shared/types/chat';

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));
const users: User[] = [
  { id: 'me', name: 'Руслан', status: 'online' },
  { id: 'alex', name: 'Алексей', status: 'online' },
  { id: 'dima', name: 'Дима', status: 'offline' },
];
const chats: Chat[] = [
  { id: 'general', title: 'Общий чат', memberIds: ['me', 'alex', 'dima'], lastMessage: 'Проверяем локальный мессенджер 👋', unreadCount: 0 },
  { id: 'alex', title: 'Алексей', memberIds: ['me', 'alex'], lastMessage: 'Потом подключим WebSocket.', unreadCount: 2 },
];
let messages: Message[] = [
  { id: 'm-1', chatId: 'general', authorId: 'alex', text: 'Проверяем локальный мессенджер 👋', createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
  { id: 'm-2', chatId: 'general', authorId: 'me', text: 'Фронт уже готов к подключению backend.', createdAt: new Date(Date.now() - 1000 * 60 * 9).toISOString() },
  { id: 'm-3', chatId: 'alex', authorId: 'alex', text: 'Потом подключим WebSocket.', createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString() },
];
export const chatApi = {
  async getUsers(): Promise<User[]> { await wait(); return structuredClone(users); },
  async getChats(): Promise<Chat[]> { await wait(); return structuredClone(chats); },
  async getMessages(chatId: string): Promise<Message[]> { await wait(); return structuredClone(messages.filter((message) => message.chatId === chatId)); },
  async sendMessage(payload: SendMessagePayload): Promise<Message> {
    await wait(120);
    const newMessage: Message = { id: crypto.randomUUID(), ...payload, text: payload.text.trim(), createdAt: new Date().toISOString() };
    messages = [...messages, newMessage];
    return structuredClone(newMessage);
  },
};
