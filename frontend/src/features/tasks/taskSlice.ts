import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  projectId: string;
  assigneeId: string | null;
  createdAt: string;
  updatedAt: string;
  assignee?: {
    id: string;
    name: string;
    email: string;
  };
  comments?: any[];
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchTasksByProject = createAsyncThunk(
  'tasks/fetchByProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tasks/project/${projectId}`);
      return response.data.tasks;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erro ao buscar tarefas');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/create',
  async (data: { projectId: string; title: string; description?: string; priority?: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/tasks', data);
      return response.data.task;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erro ao criar tarefa');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async (data: { id: string; title?: string; description?: string; status?: string; priority?: string; assigneeId?: string }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/tasks/${data.id}`, data);
      return response.data.task;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erro ao atualizar tarefa');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Erro ao deletar tarefa');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasksByProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasksByProject.fulfilled, (state, action: PayloadAction<Task[]>) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasksByProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    });

    builder.addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });

    builder.addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
