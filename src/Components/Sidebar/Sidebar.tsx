import { NavLink } from 'react-router-dom';
import type { Chat } from '@/Utils/types/chat';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  chats: Chat[];
}

const getChatAvatar = (chat: Chat) => chat.memberIds.length > 2 ? '👥' : chat.title.slice(0, 1).toUpperCase();

export const Sidebar = ({ chats }: SidebarProps) => (
  <aside className={styles.sidebar}>
    <header className={styles.header}>
      <div className={styles.brandIcon} aria-hidden="true">💬</div>
      <div>
        <h1 className={styles.title}>Local Messenger</h1>
        <span className={styles.subtitle}>Учебный LAN-мессенджер</span>
      </div>
    </header>

    <nav className={styles.list}>
      {chats.map((chat) => (
        <NavLink
          key={chat.id}
          to={`/chat/${chat.id}`}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
        >
          <div className={`${styles.avatar} ${chat.memberIds.length > 2 ? styles.groupAvatar : ''}`} aria-hidden="true">
            {getChatAvatar(chat)}
          </div>
          <div className={styles.content}>
            <div className={styles.topLine}>
              <span className={styles.name}>{chat.title}</span>
            </div>
            <span className={styles.lastMessage}>{chat.lastMessage ?? 'Нет сообщений'}</span>
          </div>
          {chat.unreadCount > 0 && <span className={styles.badge}>{chat.unreadCount}</span>}
        </NavLink>
      ))}
    </nav>
  </aside>
);
