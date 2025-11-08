import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

// Listar tarefas de um projeto
export const getTasksByProject = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = req.userId;

    // Verifica se usuário é membro do projeto
    const isMember = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: userId
      }
    });

    if (!isMember) {
      return res.status(403).json({ 
        error: 'Você não tem acesso a este projeto' 
      });
    }

    const tasks = await prisma.task.findMany({
      where: { projectId },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ tasks });
  } catch (error) {
    throw error;
  }
};

// Criar tarefa
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, title, description, priority } = req.body;
    const userId = req.userId;

    if (!title) {
      return res.status(400).json({ 
        error: 'Título da tarefa é obrigatório' 
      });
    }

    // Verifica se usuário é membro do projeto
    const isMember = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: userId
      }
    });

    if (!isMember) {
      return res.status(403).json({ 
        error: 'Você não tem permissão para adicionar tarefas neste projeto' 
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        projectId
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Tarefa criada com sucesso',
      task
    });
  } catch (error) {
    throw error;
  }
};

// Atualizar tarefa
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assigneeId } = req.body;
    const userId = req.userId;

    // Busca tarefa e verifica permissão
    const task = await prisma.task.findUnique({
      where: { id },
      include: { project: true }
    });

    if (!task) {
      return res.status(404).json({ 
        error: 'Tarefa não encontrada' 
      });
    }

    const isMember = await prisma.projectMember.findFirst({
      where: {
        projectId: task.projectId,
        userId: userId
      }
    });

    if (!isMember) {
      return res.status(403).json({ 
        error: 'Você não tem permissão para editar esta tarefa' 
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: title || task.title,
        description: description !== undefined ? description : task.description,
        status: status || task.status,
        priority: priority || task.priority,
        assigneeId: assigneeId || task.assigneeId
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      message: 'Tarefa atualizada com sucesso',
      task: updatedTask
    });
  } catch (error) {
    throw error;
  }
};

// Deletar tarefa
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const task = await prisma.task.findUnique({
      where: { id },
      include: { project: true }
    });

    if (!task) {
      return res.status(404).json({ 
        error: 'Tarefa não encontrada' 
      });
    }

    const isMember = await prisma.projectMember.findFirst({
      where: {
        projectId: task.projectId,
        userId: userId
      }
    });

    if (!isMember) {
      return res.status(403).json({ 
        error: 'Você não tem permissão para deletar esta tarefa' 
      });
    }

    await prisma.task.delete({
      where: { id }
    });

    res.json({
      message: 'Tarefa deletada com sucesso'
    });
  } catch (error) {
    throw error;
  }
};

// Adicionar comentário
export const addComment = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    const { content } = req.body;
    const userId = req.userId;

    if (!content) {
      return res.status(400).json({ 
        error: 'Conteúdo do comentário é obrigatório' 
      });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        taskId,
        authorId: userId!
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Comentário adicionado',
      comment
    });
  } catch (error) {
    throw error;
  }
};

// Deletar comentário
export const deleteComment = async (req: AuthRequest, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.userId;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ 
        error: 'Comentário não encontrado' 
      });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ 
        error: 'Você não pode deletar este comentário' 
      });
    }

    await prisma.comment.delete({
      where: { id: commentId }
    });

    res.json({
      message: 'Comentário deletado'
    });
  } catch (error) {
    throw error;
  }
};
