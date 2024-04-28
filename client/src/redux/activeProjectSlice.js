import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTeamData } from '../api/team';

// Thunk to fetch team members
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

// Thunk to fetch project tasks
export const fetchProjectTasks = createAsyncThunk(
  'activeProject/fetchProjectTasks',
  async (projectId, { rejectWithValue }) => {
    try {
      return await fetchProjectTasks(projectId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
    id: '',
    name: '',
    description: '',
    team: '',
    teamData: [],
    tasks: [],
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
          state.teamMembers = payload;
          state.isLoadingTeamMembers = false;
        })
        .addCase(fetchTeamInformation.rejected, (state) => {
          state.isLoadingTeamMembers = false;
        })
        .addCase(fetchProjectTasks.pending, (state) => {
          state.isLoadingTasks = true;
        })
        .addCase(fetchProjectTasks.fulfilled, (state, { payload }) => {
          state.tasks = payload;
          state.isLoadingTasks = false;
        })
        .addCase(fetchProjectTasks.rejected, (state) => {
          state.isLoadingTasks = false;
        });
    },  
  });
  export const { setActiveProject } = activeProjectSlice.actions;
  export default activeProjectSlice.reducer;