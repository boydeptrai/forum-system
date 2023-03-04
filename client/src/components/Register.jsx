import React from "react";
import { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username,setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const singUp = () => {
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        username,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((res) =>res.json())
    .then((data) =>{
      if (data.error_message){
        alert(data.error_message)
      } else {
        alert("Account created successfully!")
        navigate("/")
      }
    })
    .catch((err) =>console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    singUp()
    setEmail("");
    setPassword("");
    setUsername("")
  };
  return (
    <main className="register">
      <h1 className="registerTitle">Create an account </h1>
      <form className="registerForm" onSubmit={handleSubmit}>
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
