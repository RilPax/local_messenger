export type UserStatus = 'online' | 'offline';
export interface User { id: string; name: string; status: UserStatus; }
export interface Chat { id: string; title: string; memberIds: string[]; lastMessage?: string; unreadCount: number; }
export interface Message { id: string; chatId: string; authorId: string; text: string; createdAt: string; }
export interface SendMessagePayload { chatId: string; authorId: string; text: string; }
