import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Erros de validação do Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Erro de validação',
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }

  // Log do erro (em produção usaria um logger tipo Winston)
  console.error('Error:', error);

  // Erro genérico
  res.status(error.status || 500).json({
    error: error.message || 'Erro interno do servidor'
  });
};
