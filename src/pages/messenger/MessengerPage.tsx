import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadMessages, loadMessenger, sendMessage } from '@/features/chat/model/chatSlice';
import { Sidebar } from '@/widgets/sidebar/Sidebar';
import { Conversation } from '@/widgets/conversation/Conversation';
import { MessageComposer } from '@/widgets/message-composer/MessageComposer';
import styles from './MessengerPage.module.scss';

export const MessengerPage = () => {
  const { chatId = 'general' } = useParams();
  const dispatch = useAppDispatch();
  const { chats, users, messagesByChat, isBootLoading, loadingChatId, sending, error } = useAppSelector((state) => state.chat);
  useEffect(() => { if (chats.length === 0) void dispatch(loadMessenger()); }, [chats.length, dispatch]);
  useEffect(() => { if (!messagesByChat[chatId]) void dispatch(loadMessages(chatId)); }, [chatId, dispatch, messagesByChat]);
  const currentChat = chats.find((chat) => chat.id === chatId);
  const messages = messagesByChat[chatId] ?? [];
  if (isBootLoading && chats.length === 0) return <div className={styles.state}>Загрузка мессенджера…</div>;
  if (error && chats.length === 0) return <div className={styles.state}>{error}</div>;
  return <div className={styles.page}>
    <Sidebar chats={chats} />
    <section className={styles.chatColumn}>
      <Conversation chat={currentChat} messages={messages} users={users} loading={loadingChatId === chatId} />
      {currentChat && <MessageComposer disabled={sending} onSend={async (text) => { await dispatch(sendMessage({ chatId, authorId: 'me', text })).unwrap(); }} />}
    </section>
  </div>;
};
