
import React, { useState } from "react";
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/register", {
    username: username,
      email: email,
      password: password,
      });
      alert("Student Registation Successfully");

    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="container1">
      <h2 className="heading1">Registration Form</h2>
      <form action="POST">
        <div className="container">
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit" onSubmit={handleSubmit}>Register</button>
          <label>
            <input type="checkbox" checked="checked" name="remember" />{" "}
            Remember me
          </label>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
