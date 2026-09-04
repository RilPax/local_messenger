export const formatMessageTime = (iso: string) =>
  new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
