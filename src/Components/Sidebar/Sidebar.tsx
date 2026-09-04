import { NavLink } from 'react-router-dom';
import type { Chat } from '@/Utils/types/chat';
import styles from './Sidebar.module.scss';
interface SidebarProps { chats: Chat[]; }
export const Sidebar = ({ chats }: SidebarProps) => (
  <aside className={styles.sidebar}>
    <header className={styles.header}><h1 className={styles.title}>Local Messenger</h1><span className={styles.subtitle}>Учебный LAN-мессенджер</span></header>
    <nav className={styles.list}>{chats.map((chat) => <NavLink key={chat.id} to={`/chat/${chat.id}`} className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}><span className={styles.name}>{chat.title}</span><span className={styles.lastMessage}>{chat.lastMessage ?? 'Нет сообщений'}</span>{chat.unreadCount > 0 && <span className={styles.badge}>{chat.unreadCount}</span>}</NavLink>)}</nav>
  </aside>
);
