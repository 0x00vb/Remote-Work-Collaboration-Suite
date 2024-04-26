import { configureStore } from "@reduxjs/toolkit";
import activeUserSlice from "./redux/activeUserSlice";
import chatsSlice from "./redux/chatsSlice";
import activeProjectSlice from './redux/activeProjectSlice';
const store = configureStore({
  reducer: {
    activeUser: activeUserSlice,
    chats: chatsSlice,
    activeProject: activeProjectSlice
  },
});
export default store;