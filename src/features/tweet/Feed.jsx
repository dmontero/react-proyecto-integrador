import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tweet from "./Tweet";
import TweetForm from "./TweetForm";
import { getTweets } from "./tweetSlice";

function Feed() {
  const tweets = useSelector((state) => state.feed.tweets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTweets());
    const timer = setInterval(() => dispatch(getTweets()), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <TweetForm />
      <h3>Feed</h3>
      <div className="feed">
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} data={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
