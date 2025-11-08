import { Router } from 'express';
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
  addComment,
  deleteComment
} from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas as rotas precisam autenticação
router.use(authMiddleware);

// Rotas de tarefas
router.get('/project/:projectId', getTasksByProject);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// Rotas de comentários
router.post('/:taskId/comments', addComment);
router.delete('/:taskId/comments/:commentId', deleteComment);

export default router;
