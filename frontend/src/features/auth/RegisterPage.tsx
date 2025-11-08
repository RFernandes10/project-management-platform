import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { register, clearError } from "./authSlice";
import "./AuthPages.css";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);

      // Cria preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: any = { name, email, password };
    if (avatar) {
      credentials.avatar = avatar;
    }

    dispatch(register(credentials));
  };

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-large">
        <h1>Criar Conta</h1>
        <p className="auth-subtitle">Comece a gerenciar seus projetos</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Avatar Upload */}
          <div className="form-group avatar-upload-group">
            <label>Foto de Perfil (Opcional)</label>
            <div className="avatar-upload-container">
              <div className="avatar-preview">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" />
                ) : (
                  <div className="avatar-placeholder">
                    <span>📷</span>
                  </div>
                )}
              </div>
              <div className="avatar-upload-button">
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="avatar" className="btn-upload">
                  {avatar ? "Trocar Foto" : "Escolher Foto"}
                </label>
                <p className="upload-hint">JPG, PNG ou GIF (máx. 5MB)</p>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Nome Completo *</label>
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
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <p className="auth-footer">
          Já tem uma conta? <a href="/login">Faça login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
