import { useEffect, useRef } from 'react';
import { MessageBubble } from '@/Components/MessageBubble/MessageBubble';
import type { Chat, Message, User } from '@/Utils/types/chat';
import groupIcon from '@/Assets/icons/group.svg';
import styles from './Conversation.module.scss';

interface ConversationProps {
  chat?: Chat;
  messages: Message[];
  users: User[];
  loading: boolean;
}

const getMembersLabel = (count: number) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} участник`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} участника`;
  return `${count} участников`;
};

export const Conversation = ({ chat, messages, users, loading }: ConversationProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  if (!chat) {
    return <main className={styles.root}><div className={styles.empty}>Чат не найден</div></main>;
  }

  const isGroup = chat.memberIds.length > 2;
  const directUser = !isGroup ? users.find((user) => user.id !== 'me' && chat.memberIds.includes(user.id)) : undefined;

  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <div className={`${styles.chatAvatar} ${isGroup ? styles.groupAvatar : ''}`} aria-hidden="true">
          {isGroup ? <img src={groupIcon} alt="" className={styles.avatarIcon} /> : chat.title.slice(0, 1).toUpperCase()}
        </div>
        <div className={styles.headerText}>
          <h2 className={styles.title}>{chat.title}</h2>
          <span className={styles.meta}>{isGroup ? getMembersLabel(chat.memberIds.length) : directUser?.status === 'online' ? 'В сети' : 'Не в сети'}</span>
          {isGroup && <span className={styles.description}>Здесь мы все вместе 👋</span>}
        </div>
      </header>

      <section className={styles.messages}>
        {messages.length > 0 && !loading && <div className={styles.dayLabel}>Сегодня</div>}
        {loading ? (
          <div className={styles.loading}>Загрузка сообщений…</div>
        ) : messages.length === 0 ? (
          <div className={styles.empty}>Сообщений пока нет</div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              author={users.find((user) => user.id === message.authorId)}
              own={message.authorId === 'me'}
            />
          ))
        )}
        <div ref={bottomRef} />
      </section>
    </main>
  );
};
