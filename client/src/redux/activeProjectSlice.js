import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTeamData } from '../api/team';
import { fetchProjectTasks, updateTaskStatus } from '../api/task';

export const fetchTeamInformation = createAsyncThunk(
  'activeProject/fetchTeamMembers',
  async (teamId, { rejectWithValue }) => {
    try {
      return await fetchTeamData(teamId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  'activeProject/fetchTasks',
  async (projectId, { rejectWithValue }) => {
    try {
      return await fetchProjectTasks(projectId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTaskStatusRedux = createAsyncThunk(
  'activeProject/updateTaskStatus',
  async ({ taskId, newStatus }, { rejectWithValue }) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      return { taskId, newStatus };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const initialState = {
    creationDate: '',
    id: '',
    name: '',
    description: '',
    team: '',
    teamMembers: [],
    teamLeader: '',
    tasks: [],
    deadLine: '',
  };

  const activeProjectSlice = createSlice({
    name: 'activeUser',
    initialState,
    reducers: {
      setActiveProject: (state, { payload }) => {
        state.id = payload._id;
        state.name = payload.name;
        state.description = payload.description;
        state.team = payload.team;
        state.teamLeader = payload.teamLeader;
        state.teamMembers = payload.teamMembers;
        state.tasks = payload.tasks;
      },
      setProjectTasks: (state, { payload }) => {
        state.tasks = payload.username;
      },
      setProjectTeam: (state, { payload }) => {
        state.team = payload.team;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTeamInformation.pending, (state) => {
          state.isLoadingTeamMembers = true;
        })
        .addCase(fetchTeamInformation.fulfilled, (state, { payload }) => {
          state.teamLeader = payload.leader;
          state.teamMembers = payload.members;
          state.isLoadingTeamData = false;
        })
        .addCase(fetchTeamInformation.rejected, (state) => {
          state.isLoadingTeamData = false;
        })
        .addCase(fetchTasks.pending, (state) => {
          state.isLoadingTasks = true;
        })
        .addCase(fetchTasks.fulfilled, (state, { payload }) => {
          state.tasks = payload;
          state.isLoadingTasks = false;
        })
        .addCase(fetchTasks.rejected, (state) => {
          state.isLoadingTasks = false;
        })
        .addCase(updateTaskStatusRedux.fulfilled, (state, { payload }) => {
          const { taskId, newStatus } = payload;
          const taskIndex = state.tasks.findIndex(task => task._id === taskId);
          if (taskIndex !== -1) {
            state.tasks[taskIndex].status = newStatus;
          }
        });
    },  
  });
  export const { setActiveProject } = activeProjectSlice.actions;
  export default activeProjectSlice.reducer;