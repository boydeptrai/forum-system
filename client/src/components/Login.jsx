import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    setEmail("");
    setPassword("");
  };
  return (
    <main className="login">
      <h1 className="loginTitle">Log into your account </h1>
      <form className="loginForm" onChange={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          required
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="password"
          name="password"
          required
          id="password"
          value={password}
          onChange={(e) => setPassword(e.value.password)}
        />
        <button className="loginBtn">SIGN IN</button>
        <p>
          Don't have an account? <Link to="/register">Create one</Link>{" "}
        </p>
      </form>
    </main>
  );
};

export default Login;
