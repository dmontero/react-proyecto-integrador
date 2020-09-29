import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "./userSlice";

function LoginForm({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.loginError);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }, history));
      }}
    >
      <h3>Login</h3>
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
      <Link to="/signup">Don't have an account?</Link>
    </form>
  );
}

export default LoginForm;
