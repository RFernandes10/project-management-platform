import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateProfile, clearError } from '../auth/authSlice';
import Header from '../../components/layout/Header';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      if (user.avatar) {
        setAvatarPreview(`http://localhost:3001${user.avatar}`);
      }
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    const data: any = {};
    if (name !== user?.name) {
      data.name = name;
    }
    if (avatar) {
      data.avatar = avatar;
    }

    if (Object.keys(data).length > 0) {
      const result = await dispatch(updateProfile(data));
      if (result.type === 'auth/updateProfile/fulfilled') {
        setSuccessMessage('Perfil atualizado com sucesso!');
        setAvatar(null);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <h1>Editar Perfil</h1>
            <p>Atualize suas informações pessoais</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-form-content">
              {/* Avatar Section */}
              <div className="profile-avatar-section">
                <h3>Foto de Perfil</h3>
                <div className="avatar-upload-large">
                  <div className="avatar-preview-large">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt={user?.name} />
                    ) : (
                      <div className="avatar-placeholder-large">
                        <span>{user?.name.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <div className="avatar-upload-controls">
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="avatar-upload" className="btn-secondary">
                      📷 {avatar ? 'Trocar Foto' : 'Escolher Nova Foto'}
                    </label>
                    <p className="upload-hint">JPG, PNG ou GIF (máx. 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="profile-info-section">
                <h3>Informações Pessoais</h3>

                <div className="form-group">
                  <label htmlFor="name">Nome Completo</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="input-disabled"
                  />
                  <p className="input-hint">O email não pode ser alterado</p>
                </div>

                <div className="form-group">
                  <label>Função</label>
                  <div className="role-badge-display">
                    <span className="badge badge-role-large">{user?.role}</span>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
