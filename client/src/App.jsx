import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './lib/session';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/home/HomePage';
import SettingsPage from './pages/settings/SettingsPage';
import ControlCenterLayout from './pages/control-center/ControlCenterLayout';
import ThemeSettingsPage from './pages/control-center/ThemeSettingsPage';

function PublicOnly({ children }) {
  if (isAuthenticated()) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicOnly>
              <LoginPage />
            </PublicOnly>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="control-center" element={<ControlCenterLayout />}>
            <Route index element={<Navigate to="theme" replace />} />
            <Route path="theme" element={<ThemeSettingsPage />} />          </Route>
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
