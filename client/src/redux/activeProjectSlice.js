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
        state.id = payload.id;
        state.name = payload.email;
        state.description = payload.profilePic;
        state.team = payload.username;
        state.tasks = payload.tasks;
      },
      setProjectTasks: (state, { payload }) => {
        state.tasks = payload.username;
      },
    },
  });
  export const { setActiveProject } = activeProjectSlice.actions;
  export default activeProjectSlice.reducer;