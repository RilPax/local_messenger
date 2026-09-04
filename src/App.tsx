import { Navigate, Route, Routes } from 'react-router-dom';
import { MessengerPage } from '@/Pages/Messenger/MessengerPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/chat/general" replace />} />
    <Route path="/chat/:chatId" element={<MessengerPage />} />
    <Route path="*" element={<Navigate to="/chat/general" replace />} />
  </Routes>
);
