import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Header from '../../components/layout/Header';
import {
  fetchProjects,
  deleteProject,
  clearError,
} from './projectSlice';
import ProjectModal from './ProjectModal';
import './ProjectsPage.css';

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projects, loading, error } = useAppSelector(
    (state) => state.projects
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  // Carrega projetos ao montar o componente
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Limpa erros ao desmontar
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Função para obter URL do avatar
  const getAvatarUrl = (avatar: string | null | undefined) => {
    return avatar ? `http://localhost:3001${avatar}` : null;
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja deletar este projeto?')) {
      await dispatch(deleteProject(id));
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}/tasks`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  return (
    <>
      <Header />
      <div className="projects-page">
        <div className="projects-header">
          <div>
            <h1>Meus Projetos</h1>
            <p>Gerencie todos os seus projetos</p>
          </div>
          <button className="btn-primary" onClick={handleCreateProject}>
            + Novo Projeto
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button 
              className="btn-close-error"
              onClick={() => dispatch(clearError())}
            >
              ✕
            </button>
          </div>
        )}

        {loading && <div className="loading">Carregando projetos...</div>}

        <div className="projects-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => handleProjectClick(project.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="project-card-header">
                <h3>{project.name}</h3>
                <div className="project-actions">
                  <button
                    className="btn-icon"
                    onClick={(e) => handleEditProject(project, e)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={(e) => handleDeleteProject(project.id, e)}
                    title="Deletar"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <p className="project-description">
                {project.description || 'Sem descrição'}
              </p>

              {/* AQUI É A PARTE NOVA COM AVATARES */}
              <div className="project-footer">
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

                <span className="task-count">
                  📋 {project._count?.tasks || 0} tarefas
                </span>
              </div>
            </div>
          ))}

          {!loading && projects.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📁</div>
              <h3>Nenhum projeto ainda</h3>
              <p>Crie seu primeiro projeto para começar!</p>
              <button className="btn-primary" onClick={handleCreateProject}>
                Criar Primeiro Projeto
              </button>
            </div>
          )}
        </div>

        {isModalOpen && (
          <ProjectModal
            project={editingProject}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default ProjectsPage;
