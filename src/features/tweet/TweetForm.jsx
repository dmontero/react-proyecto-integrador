import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendTweet } from "./tweetSlice";

function TweetForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendTweet(text));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New tweet</h3>
      <textarea
        cols="30"
        rows="10"
        placeholder="Say something"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button type="submit">Send</button>
    </form>
  );
}

export default TweetForm;
