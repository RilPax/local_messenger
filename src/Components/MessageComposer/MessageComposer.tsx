import { type FormEvent, useState } from 'react';
import styles from './MessageComposer.module.scss';
interface MessageComposerProps { disabled?: boolean; onSend: (text: string) => Promise<void>; }
export const MessageComposer = ({ disabled, onSend }: MessageComposerProps) => {
  const [text, setText] = useState('');
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const trimmed = text.trim(); if (!trimmed || disabled) return; setText(''); await onSend(trimmed); };
  return <form className={styles.form} onSubmit={handleSubmit}><input className={styles.input} value={text} onChange={(event) => setText(event.target.value)} placeholder="Введите сообщение…" autoComplete="off" disabled={disabled} /><button className={styles.button} disabled={disabled || !text.trim()}>Отправить</button></form>;
};
