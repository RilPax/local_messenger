import type { Message, User } from '@/Utils/types/chat';
import { formatMessageTime } from '@/Utils/date';
import styles from './MessageBubble.module.scss';

interface MessageBubbleProps {
  message: Message;
  author?: User;
  own: boolean;
}

export const MessageBubble = ({ message, author, own }: MessageBubbleProps) => (
  <article className={`${styles.row} ${own ? styles.ownRow : ''}`}>
    {!own && <div className={styles.avatar} aria-hidden="true">{author?.name?.slice(0, 1).toUpperCase() ?? '?'}</div>}
    <div className={styles.content}>
      <div className={`${styles.metaLine} ${own ? styles.ownMetaLine : ''}`}>
        {!own && <span className={styles.author}>{author?.name ?? 'Неизвестный'}</span>}
        <time className={styles.time} dateTime={message.createdAt}>{formatMessageTime(message.createdAt)}</time>
      </div>
      <div className={`${styles.message} ${own ? styles.own : ''}`}>
        <p className={styles.text}>{message.text}</p>
      </div>
    </div>
  </article>
);
