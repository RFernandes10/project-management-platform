import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Header from '../../components/layout/Header';
import { fetchTasksByProject, updateTask } from './taskSlice';
import TaskModal from './TaskModal';
import TaskCard from './TaskCard';
import './TasksPage.css';

const TasksPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchTasksByProject(projectId));
    }
  }, [dispatch, projectId]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    
    if (taskId) {
      await dispatch(updateTask({
        id: taskId,
        status: newStatus as any
      }));
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const columns = [
    { id: 'TODO', title: 'A Fazer', color: '#718096' },
    { id: 'IN_PROGRESS', title: 'Em Progresso', color: '#667eea' },
    { id: 'IN_REVIEW', title: 'Em Revisão', color: '#f59e0b' },
    { id: 'DONE', title: 'Concluído', color: '#10b981' }
  ];

  return (
    <>
      <Header />
      <div className="tasks-page">
        <div className="tasks-header">
          <div>
            <h1>Quadro de Tarefas</h1>
            <p>{tasks.length} tarefa(s) no total</p>
          </div>
          <button className="btn-primary" onClick={handleCreateTask}>
            + Nova Tarefa
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Carregando tarefas...</div>
        ) : (
          <div className="kanban-board">
            {columns.map((column) => (
              <div
                key={column.id}
                className="kanban-column"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="column-header" style={{ borderTopColor: column.color }}>
                  <h3>{column.title}</h3>
                  <span className="task-count">
                    {getTasksByStatus(column.id).length}
                  </span>
                </div>

                <div className="column-content">
                  {getTasksByStatus(column.id).map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDragStart={handleDragStart}
                      onEdit={handleEditTask}
                    />
                  ))}

                  {getTasksByStatus(column.id).length === 0 && (
                    <div className="empty-column">
                      <p>Nenhuma tarefa</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <TaskModal
            task={editingTask}
            projectId={projectId!}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default TasksPage;
