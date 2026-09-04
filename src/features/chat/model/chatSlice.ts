import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chatApi } from '@/features/chat/api/chatApi';
import type { Chat, Message, SendMessagePayload, User } from '@/shared/types/chat';

interface ChatState { users: User[]; chats: Chat[]; messagesByChat: Record<string, Message[]>; isBootLoading: boolean; loadingChatId: string | null; sending: boolean; error: string | null; }
const initialState: ChatState = { users: [], chats: [], messagesByChat: {}, isBootLoading: false, loadingChatId: null, sending: false, error: null };
export const loadMessenger = createAsyncThunk('chat/loadMessenger', async () => { const [users, chats] = await Promise.all([chatApi.getUsers(), chatApi.getChats()]); return { users, chats }; });
export const loadMessages = createAsyncThunk('chat/loadMessages', async (chatId: string) => ({ chatId, messages: await chatApi.getMessages(chatId) }));
export const sendMessage = createAsyncThunk('chat/sendMessage', async (payload: SendMessagePayload) => chatApi.sendMessage(payload));
const chatSlice = createSlice({
  name: 'chat', initialState,
  reducers: { receiveMessage(state, action: { payload: Message }) { const message = action.payload; const current = state.messagesByChat[message.chatId] ?? []; if (!current.some((item) => item.id === message.id)) state.messagesByChat[message.chatId] = [...current, message]; } },
  extraReducers: (builder) => { builder
    .addCase(loadMessenger.pending, (state) => { state.isBootLoading = true; state.error = null; })
    .addCase(loadMessenger.fulfilled, (state, action) => { state.isBootLoading = false; state.users = action.payload.users; state.chats = action.payload.chats; })
    .addCase(loadMessenger.rejected, (state) => { state.isBootLoading = false; state.error = 'Не удалось загрузить чаты'; })
    .addCase(loadMessages.pending, (state, action) => { state.loadingChatId = action.meta.arg; })
    .addCase(loadMessages.fulfilled, (state, action) => { state.loadingChatId = null; state.messagesByChat[action.payload.chatId] = action.payload.messages; })
    .addCase(loadMessages.rejected, (state) => { state.loadingChatId = null; state.error = 'Не удалось загрузить сообщения'; })
    .addCase(sendMessage.pending, (state) => { state.sending = true; })
    .addCase(sendMessage.fulfilled, (state, action) => { state.sending = false; const message = action.payload; state.messagesByChat[message.chatId] = [...(state.messagesByChat[message.chatId] ?? []), message]; const chat = state.chats.find((item) => item.id === message.chatId); if (chat) chat.lastMessage = message.text; })
    .addCase(sendMessage.rejected, (state) => { state.sending = false; state.error = 'Не удалось отправить сообщение'; }); },
});
export const { receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
