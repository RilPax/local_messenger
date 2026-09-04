# Local Messenger — frontend

Учебный frontend для LAN-мессенджера. Пока данные берутся из mock API внутри приложения. Архитектура подготовлена так, чтобы позже заменить mock на REST + WebSocket.

## Запуск

```bash
npm install
npm run dev
```

## Что уже есть

- React + TypeScript
- React Router DOM
- Redux Toolkit
- Axios instance для будущего backend
- SCSS + CSS Modules
- список чатов
- отображение сообщений
- отправка сообщений через mock API
- отдельный reducer `receiveMessage` для будущих WebSocket-событий

## Куда подключать backend позже

1. `src/shared/api/http.ts` — REST URL и axios.
2. `src/features/chat/api/chatApi.ts` — заменить mock методы на HTTP-запросы.
3. Добавить `src/shared/api/socket.ts` — WebSocket клиент.
4. На событие `message:new` диспатчить `receiveMessage(message)`.
