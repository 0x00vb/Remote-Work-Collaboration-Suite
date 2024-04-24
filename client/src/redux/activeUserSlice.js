import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    email: '',
    profilePic: '',
    username: '',
  };

  const activeUserSlice = createSlice({
    name: 'activeUser',
    initialState,
    reducers: {
      setActiveUser: (state, { payload }) => {
        state.id = payload.id;
        state.email = payload.email;
        state.profilePic = payload.profilePic;
        state.username = payload.username;
      },
      setUserUsername: (state, { payload }) => {
        state.username = payload.username;
      },
    },
  });
  export const { setActiveUser, setUserUsername } = activeUserSlice.actions;
  export default activeUserSlice.reducer;