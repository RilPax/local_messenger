import { type FormEvent, useState } from 'react';
import styles from './MessageComposer.module.scss';

interface MessageComposerProps {
  disabled?: boolean;
  onSend: (text: string) => Promise<void>;
}

export const MessageComposer = ({ disabled, onSend }: MessageComposerProps) => {
  const [text, setText] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    setText('');
    await onSend(trimmed);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.attachButton} type="button" aria-label="Прикрепить файл" title="Прикрепить файл">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.5 12.5 14.8 6.2a3 3 0 0 1 4.2 4.2l-8.2 8.2a5 5 0 0 1-7.1-7.1l8.6-8.6" />
        </svg>
      </button>

      <input
        className={styles.input}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Написать сообщение..."
        autoComplete="off"
        disabled={disabled}
      />

      <button className={styles.sendButton} disabled={disabled || !text.trim()} aria-label="Отправить сообщение" title="Отправить сообщение">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m4 4 16 8-16 8 3-8-3-8Z" />
          <path d="M7 12h13" />
        </svg>
      </button>
    </form>
  );
};
