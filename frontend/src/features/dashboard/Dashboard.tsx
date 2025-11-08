import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProjects } from '../projects/projectSlice';
import Header from '../../components/layout/Header';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { projects } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const totalProjects = projects.length;
  const totalTasks = projects.reduce((acc, project) => acc + (project._count?.tasks || 0), 0);
  const totalMembers = projects.reduce((acc, project) => acc + (project.members?.length || 0), 0);
  const recentProjects = projects.slice(0, 3);

  const handleNavigateToProjects = () => {
    navigate('/projects');
  };

  const handleNavigateToProject = (projectId: string) => {
    navigate(`/projects/${projectId}/tasks`);
  };

  const getAvatarUrl = (avatar: string | null | undefined) => {
    return avatar ? `http://localhost:3001${avatar}` : null;
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-welcome">
            <div>
              <h1>Bem-vindo, {user?.name}! 👋</h1>
              <p>Aqui está um resumo das suas atividades</p>
            </div>
            <button className="btn-primary" onClick={handleNavigateToProjects}>
              Ver Todos os Projetos
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card stat-card-blue">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>{totalProjects}</h3>
                <p>Projetos Ativos</p>
              </div>
            </div>

            <div className="stat-card stat-card-green">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>{totalTasks}</h3>
                <p>Total de Tarefas</p>
              </div>
            </div>

            <div className="stat-card stat-card-purple">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>{totalMembers}</h3>
                <p>Membros da Equipe</p>
              </div>
            </div>

            <div className="stat-card stat-card-orange">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>{user?.role}</h3>
                <p>Sua Função</p>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Projetos Recentes</h2>
              <button className="btn-link" onClick={handleNavigateToProjects}>
                Ver todos →
              </button>
            </div>

            {recentProjects.length > 0 ? (
              <div className="projects-list">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="project-item"
                    onClick={() => handleNavigateToProject(project.id)}
                  >
                    <div className="project-item-header">
                      <h3>{project.name}</h3>
                      <span className="project-badge">
                        {project._count?.tasks || 0} tarefas
                      </span>
                    </div>
                    <p className="project-item-description">
                      {project.description || 'Sem descrição'}
                    </p>
                    <div className="project-item-footer">
                      {/* Avatares dos membros */}
                      <div className="members-avatars">
                        {project.members?.slice(0, 3).map((member: any) => (
                          <div 
                            key={member.id} 
                            className="member-avatar-small"
                            title={member.user.name}
                          >
                            {getAvatarUrl(member.user.avatar) ? (
                              <img 
                                src={getAvatarUrl(member.user.avatar)!} 
                                alt={member.user.name}
                              />
                            ) : (
                              <span>{member.user.name.charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                        ))}
                        {(project.members?.length || 0) > 3 && (
                          <div className="member-avatar-small member-avatar-more">
                            <span>+{(project.members?.length || 0) - 3}</span>
                          </div>
                        )}
                      </div>
                      <span className="created-date">
                        {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-small">
                <p>Nenhum projeto criado ainda</p>
                <button className="btn-primary" onClick={handleNavigateToProjects}>
                  Criar Primeiro Projeto
                </button>
              </div>
            )}
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Seu Perfil</h2>
            </div>

            <div className="profile-card">
              <div className="profile-avatar">
                {getAvatarUrl(user?.avatar) ? (
                  <img 
                    src={getAvatarUrl(user?.avatar)!} 
                    alt={user?.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  user?.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="profile-info">
                <h3>{user?.name}</h3>
                <p className="profile-email">{user?.email}</p>
                <div className="profile-badges">
                  <span className="badge badge-role">{user?.role}</span>
                  <span className="badge badge-status">Ativo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
