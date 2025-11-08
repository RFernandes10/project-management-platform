import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { deleteTask } from './taskSlice';
import './TaskCard.css';

interface TaskCardProps {
  task: any;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onEdit: (task: any) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, onEdit }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      await dispatch(deleteTask(task.id));
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      LOW: '#10b981',
      MEDIUM: '#3b82f6',
      HIGH: '#f59e0b',
      URGENT: '#ef4444'
    };
    return colors[priority as keyof typeof colors] || colors.MEDIUM;
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      LOW: 'Baixa',
      MEDIUM: 'Média',
      HIGH: 'Alta',
      URGENT: 'Urgente'
    };
    return labels[priority as keyof typeof labels] || priority;
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="task-card-header">
        <span
          className="task-priority"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {getPriorityLabel(task.priority)}
        </span>
        <div className="task-actions">
          <button
            className="btn-icon-small"
            onClick={() => onEdit(task)}
            title="Editar"
          >
            ✏️
          </button>
          <button
            className="btn-icon-small"
            onClick={handleDelete}
            title="Deletar"
          >
            🗑️
          </button>
        </div>
      </div>

      <h4 className="task-title">{task.title}</h4>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {task.assignee && (
        <div className="task-assignee">
          <span className="assignee-avatar">
            {task.assignee.name.charAt(0).toUpperCase()}
          </span>
          <span className="assignee-name">{task.assignee.name}</span>
        </div>
      )}

      {task.comments && task.comments.length > 0 && (
        <div className="task-footer">
          <span className="comment-count">
            💬 {task.comments.length} comentário(s)
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
