import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username,setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    setEmail("");
    setPassword("");
  };
  return (
    <main className="register">
      <h1 className="registerTitle">Create an account </h1>
      <form className="registerForm" onChange={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          required
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          required
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="email">Password</label>
        <input
          type="password"
          name="password"
          required
          id="password"
          value={password}
          onChange={(e) => setPassword(e.value.password)}
        />
        <button className="registerBtn">REGISTER</button>
        <p>
          Don't have an account? <Link to="/">Sign in</Link>{" "}
        </p>
      </form>
    </main>
  );
};

export default Register;
