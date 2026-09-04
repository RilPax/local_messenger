import { useEffect, useRef } from 'react';
import { MessageBubble } from '@/features/chat/ui/MessageBubble';
import type { Chat, Message, User } from '@/shared/types/chat';
import styles from './Conversation.module.scss';
interface ConversationProps { chat?: Chat; messages: Message[]; users: User[]; loading: boolean; }
export const Conversation = ({ chat, messages, users, loading }: ConversationProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages.length]);
  if (!chat) return <main className={styles.root}><div className={styles.empty}>Чат не найден</div></main>;
  return <main className={styles.root}>
    <header className={styles.header}><h2 className={styles.title}>{chat.title}</h2><span className={styles.meta}>{chat.memberIds.length} участника(ов)</span></header>
    <section className={styles.messages}>
      {loading ? <div className={styles.loading}>Загрузка сообщений…</div> : messages.length === 0 ? <div className={styles.empty}>Сообщений пока нет</div> : messages.map((message) => <MessageBubble key={message.id} message={message} author={users.find((user) => user.id === message.authorId)} own={message.authorId === 'me'} />)}
      <div ref={bottomRef} />
    </section>
  </main>;
};
