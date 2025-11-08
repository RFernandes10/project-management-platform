import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  members?: any[];
  _count?: {
    tasks: number;
  };
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/projects");
      return response.data.projects;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erro ao buscar projetos"
      );
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/create",
  async (data: { name: string; description?: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/projects", data);
      return response.data.project;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erro ao criar projeto"
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async (
    data: { id: string; name: string; description?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/projects/${data.id}`, {
        name: data.name,
        description: data.description,
      });
      return response.data.project;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erro ao atualizar projeto"
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/projects/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Erro ao deletar projeto"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch projects
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProjects.fulfilled,
      (state, action: PayloadAction<Project[]>) => {
        state.loading = false;
        state.projects = action.payload;
      }
    );
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create project
    builder.addCase(createProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.projects.unshift(action.payload); // Adiciona no início
      }
    );
    builder.addCase(createProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update project
    builder.addCase(
      updateProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      }
    );

    // Delete project
    builder.addCase(
      deleteProject.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
      }
    );
  },
});

export const { clearError } = projectSlice.actions;
export default projectSlice.reducer;
