import api from "../../app/api";

const { createSlice } = require("@reduxjs/toolkit");

const tweetSlice = createSlice({
  name: "tweets",
  initialState: {
    tweets: [],
    sendingTweet: false,
    gettingTweets: false,
    sendTweeterror: null,
    getTweetsError: null,
  },
  reducers: {
    sendTweetStart(state, action) {
      state.sendingTweet = true;
    },
    sendTweetSuccess(state, action) {
      state.sendingTweet = false;
      state.sendTweetError = null;
      state.tweets.push(action.payload);
    },
    sendTweetError(state, action) {
      state.sendingTweet = false;
      state.sendTweetError = action.payload;
    },
    getTweetsStart(state, action) {
      state.gettingTweets = true;
    },
    getTweetsSuccess(state, action) {
      state.gettingTweets = false;
      state.getTweetsError = null;
      state.tweets = action.payload.reverse();
    },
    getTweetsError(state, action) {
      state.gettingTweets = false;
      state.getTweetsError = action.payload;
    },
  },
});

export const {
  sendTweetError,
  sendTweetStart,
  sendTweetSuccess,
  getTweetsStart,
  getTweetsSuccess,
  getTweetsError,
} = tweetSlice.actions;

export const sendTweet = (text) => async (dispatch) => {
  dispatch(sendTweetStart());

  try {
    const response = await api.post("/tweets", { text });
    dispatch(sendTweetSuccess(response.data));
    dispatch(getTweets());
  } catch (error) {
    dispatch(sendTweetError(error.reponse?.data));
  }
};

export const getTweets = () => async (dispatch) => {
  dispatch(getTweetsStart());

  try {
    const response = await api.get("/tweets");
    dispatch(getTweetsSuccess(response.data));
  } catch (error) {
    dispatch(getTweetsError(error.response?.data));
  }
};

export default tweetSlice.reducer;
