import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../features/auth/authSlice';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const avatarUrl = user?.avatar 
    ? `http://localhost:3001${user.avatar}` 
    : null;

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={() => handleNavigation('/dashboard')}>
          <h1>📊 Project Manager</h1>
        </div>

        <nav className="header-nav">
          <button 
            className="nav-link"
            onClick={() => handleNavigation('/dashboard')}
          >
            Dashboard
          </button>
          <button 
            className="nav-link"
            onClick={() => handleNavigation('/projects')}
          >
            Projetos
          </button>
        </nav>

        <div className="header-user">
          <div 
            className="user-avatar-menu"
            onClick={() => handleNavigation('/profile')}
          >
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={user?.name} 
                className="user-avatar-img"
              />
            ) : (
              <div className="user-avatar-placeholder">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="user-name">{user?.name}</span>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
