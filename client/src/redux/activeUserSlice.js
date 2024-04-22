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
        state.username = payload.name;
      },
      setUserUsernameAndBio: (state, { payload }) => {
        state.username = payload.name;
        state.bio = payload.bio;
      },
    },
  });
  export const { setActiveUser, setUserUsernameAndBio } = activeUserSlice.actions;
  export default activeUserSlice.reducer;