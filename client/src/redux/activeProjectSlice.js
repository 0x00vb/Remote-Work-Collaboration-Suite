import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    name: '',
    description: '',
    team: '',
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
  });
  export const { setActiveProject } = activeProjectSlice.actions;
  export default activeProjectSlice.reducer;