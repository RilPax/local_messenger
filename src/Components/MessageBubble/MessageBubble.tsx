import type { Message, User } from '@/Utils/types/chat';
import { formatMessageTime } from '@/Utils/date';
import styles from './MessageBubble.module.scss';
interface MessageBubbleProps { message: Message; author?: User; own: boolean; }
export const MessageBubble = ({ message, author, own }: MessageBubbleProps) => (
  <article className={`${styles.message} ${own ? styles.own : ''}`}>
    {!own && <span className={styles.author}>{author?.name ?? 'Неизвестный'}</span>}
    <p className={styles.text}>{message.text}</p>
    <time className={styles.time} dateTime={message.createdAt}>{formatMessageTime(message.createdAt)}</time>
  </article>
);
