import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addMemberToProject
} from '../controllers/project.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas as rotas precisam de autenticação
router.use(authMiddleware);

// Rotas de projetos
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// Adicionar membro ao projeto
router.post('/:id/members', addMemberToProject);

export default router;
