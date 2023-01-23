import { configureStore } from "@reduxjs/toolkit";

import userReducer from './stateSlices/userSlice'

export default configureStore({
  reducer: {
    users:userReducer
  },
});
