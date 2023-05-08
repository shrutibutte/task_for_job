const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const User = require("./Model/schema.js");
const mongoose = require("mongoose");
const cors = require("cors");
// import jwt token
const jwt = require("jsonwebtoken");

const sendmail = require("./sendmail.js");
// create reusable transporter object using SMTP transport

const SecretKey = "secretkey";

app.use(cors());

// create resgistation api
app.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    // how to encreatp password in nodejs

    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// create login api
app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const users = await User.find();
    console.log("kkkkkkk");
    console.log(users);
    console.log(Email, Password);
    for (let i = 0; i < users.length; i++) {
      console.log(users[i].Email, users[i].Password);
      if (users[i].Email == Email && users[i].Password == Password) {
        console.log("login successfull");
        const token = jwt.sign({ id: users[i]._id }, SecretKey);
        return res.status(200).json({ token, message: "login successfull" });
      }
    }
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/verify", verifyToken, (req, res) => {
  jwt.verify(req.token, SecretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (typeof token !== "undefined") {
    req.token = token;

    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to mongoDB", err);
  });
