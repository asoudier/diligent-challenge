// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

const users = [
  {
    username: "john",
    password: "12345",
  },
  {
    username: "anna",
    password: "password",
  },
];

const defaultTasks = [
  {
    name: "task 1",
    id: "1",
    timeComplete: Date.now(),
  },
  {
    name: "task 2",
    id: "2",
    timeComplete: Date.now(),
  },
  {
    name: "task3",
    id: "3",
    timeComplete: Date.now(),
  },
];

const robots = [
  {
    name: "robot 1",
    id: "1",
    tasks: [],
  },
  {
    name: "robots 2",
    id: "2",
    tasks: [],
  },
];

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/login", (req, res) => {
  // Filter user from the users array by username and password
  const user = users.find((u) => {
    return u.username === req.body.username && u.password === req.body.password;
  });
  if (user) {
    // Generate a random access token
    const accessToken = `${Math.floor(Math.random() * 1000001)}`;
    res.json({
      accessToken,
    });
  } else {
    res.json({
      error: "Username or password incorrect",
    });
  }
});

app.get("/robots", (req, res) => {
  res.json({ data: robots });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
