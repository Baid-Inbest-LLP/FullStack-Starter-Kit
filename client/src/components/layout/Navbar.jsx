import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Popover } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconBell, IconBellOff } from '@tabler/icons-react';
import { useLogout } from '../../hooks/useAuth';
import { setTheme } from '../../store/slices/commonSlice';
import ConfirmModal from '../common/ConfirmModal';

const Navbar = ({ sidebarOpen, onToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.common);
  const logoutMutation = useLogout();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(next));
  };

  const handleLogoutConfirm = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        notifications.show({ message: 'Logged out successfully', color: 'green' });
        navigate('/login');
        setShowLogoutConfirm(false);
      },
    });
  };

  return (
    <header className="app-navbar h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="navbar-toggle p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="navbar-theme p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
        <Popover position="bottom-end" width={300} shadow="md" radius="md" withinPortal>
          <Popover.Target>
            <button
              type="button"
              className="navbar-notification p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              aria-label="Notifications"
              title="Notifications"
            >
              <IconBell className="w-5 h-5" stroke={2} />
            </button>
          </Popover.Target>
          <Popover.Dropdown className="navbar-notification-panel">
            <p className="navbar-notification-title">Notifications</p>
            <div className="navbar-notification-empty">
              <IconBellOff size={28} stroke={1.6} />
              <span>No new notifications</span>
            </div>
          </Popover.Dropdown>
        </Popover>
        <button
          type="button"
          onClick={() => setShowLogoutConfirm(true)}
          className="navbar-logout group inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Log out"
        >
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
      <ConfirmModal
        open={showLogoutConfirm}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmLabel="Logout"
        variant="primary"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </header>
  );
};

export default Navbar;
