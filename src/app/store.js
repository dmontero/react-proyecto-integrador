import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import tweetsReducer from "../features/tweet/tweetSlice";

export default configureStore({
  reducer: {
    feed: tweetsReducer,
    user: userReducer,
  },
});
