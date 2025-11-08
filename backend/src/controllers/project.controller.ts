import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

// Listar todos os projetos do usuário
export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    // Busca projetos onde o usuário é membro
    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: userId
          }
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        },
        _count: {
          select: {
            tasks: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ projects });
  } catch (error) {
    throw error;
  }
};

// Buscar projeto por ID
export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const project = await prisma.project.findFirst({
      where: {
        id,
        members: {
          some: {
            userId: userId
          }
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        },
        tasks: {
          include: {
            assignee: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({ 
        error: 'Projeto não encontrado' 
      });
    }

    res.json({ project });
  } catch (error) {
    throw error;
  }
};

// Criar novo projeto
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = req.userId;

    if (!name) {
      return res.status(400).json({ 
        error: 'Nome do projeto é obrigatório' 
      });
    }

    // Cria o projeto e já adiciona o criador como membro
    const project = await prisma.project.create({
      data: {
        name,
        description,
        members: {
          create: {
            userId: userId!,
            role: 'PROJECT_MANAGER' // Criador vira gerente do projeto
          }
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      message: 'Projeto criado com sucesso',
      project
    });
  } catch (error) {
    throw error;
  }
};

// Atualizar projeto
export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.userId;

    // Verifica se o usuário é membro do projeto
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId: id,
        userId: userId
      }
    });

    if (!membership) {
      return res.status(403).json({ 
        error: 'Você não tem permissão para editar este projeto' 
      });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        name,
        description
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        }
      }
    });

    res.json({
      message: 'Projeto atualizado com sucesso',
      project
    });
  } catch (error) {
    throw error;
  }
};

// Deletar projeto
export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Verifica se o usuário é gerente do projeto
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId: id,
        userId: userId,
        role: 'PROJECT_MANAGER'
      }
    });

    if (!membership) {
      return res.status(403).json({ 
        error: 'Apenas gerentes podem deletar o projeto' 
      });
    }

    // Deleta o projeto (cascade vai deletar members e tasks)
    await prisma.project.delete({
      where: { id }
    });

    res.json({
      message: 'Projeto deletado com sucesso'
    });
  } catch (error) {
    throw error;
  }
};

// Adicionar membro ao projeto
export const addMemberToProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { userEmail, role } = req.body;
    const currentUserId = req.userId;

    // Verifica se quem está adicionando é gerente
    const isManager = await prisma.projectMember.findFirst({
      where: {
        projectId: id,
        userId: currentUserId,
        role: 'PROJECT_MANAGER'
      }
    });

    if (!isManager) {
      return res.status(403).json({ 
        error: 'Apenas gerentes podem adicionar membros' 
      });
    }

    // Busca usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    });

    if (!user) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    // Verifica se já é membro
    const existingMember = await prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId: user.id,
          projectId: id
        }
      }
    });

    if (existingMember) {
      return res.status(400).json({ 
        error: 'Usuário já é membro do projeto' 
      });
    }

    // Adiciona membro
    const member = await prisma.projectMember.create({
      data: {
        userId: user.id,
        projectId: id,
        role: role || 'DEVELOPER'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Membro adicionado com sucesso',
      member
    });
  } catch (error) {
    throw error;
  }
};
