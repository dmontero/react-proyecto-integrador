import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signupUser } from "./userSlice";
// import store from "../../app/store";

function SignupForm({ history }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.signupError);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(signupUser({ email, username, password }, history));
      }}
    >
      <h3>Signup</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        required
      />
      {error && <div style={{ color: "red" }}>{error.message}</div>}
      <button type="submit">Submit</button>
      <br />
      <Link to="/login">Already have an account?</Link>
    </form>
  );
}

export default SignupForm;
