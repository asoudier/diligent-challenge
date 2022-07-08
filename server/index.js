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

let robots = [
  {
    name: "robot 1",
    id: "0",
    task: "default task",
    timeComplete: new Date(
      new Date().getTime() + 1 * 60000
    ).toLocaleTimeString(),
  },
  {
    name: "robot 2",
    id: "1",
    task: undefined,
    timeComplete: undefined,
  },
  {
    name: "robot 3",
    id: "2",
    task: undefined,
    timeComplete: undefined,
  },
];

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
  res.json(robots);
});

app.post("/robots_update", (req, res) => {
  // Update Data
  robots[req.body.id] = req.body;
  res.json({ message: "success" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
