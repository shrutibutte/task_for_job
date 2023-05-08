import React, { useState } from "react";
import axios from "axios"
import "./style.css"
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  async function handleSubmit(event) {
      event.preventDefault();
      try {
        await axios.post("http://localhost:3000/login", {
          email,password
          }).then((res) =>
          {
           console.log(res)
           const data = res.data;
          
           if (data.status === true)
           {
              alert("Login Successfully");
              navigate('/home');
           }
           else
           {
                 alert("Login Failed")
           }  
        }, fail => {
         console.error(fail); // Error!
});
      }

       catch (err) {
        alert(err);
      }
    
    }

  return (
    

     <div className="container1">
      <h2 className="heading1">Registration Form</h2>
      <form action="POST">
        <div className="container">
          
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
          <button type="submit" onSubmit={handleSubmit}>Login</button>
         
        </div>
      </form>
    </div>
  );
}

export default Login;