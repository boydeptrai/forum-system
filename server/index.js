const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const users = [];
const threadList = [];

//generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  let result = users.filter(
    (user) => user.email === email && user.password === password
  );
  if (result.length !== 1) {
    return res.json({ error_message: "Incorrect Credentials" });
  }
  res.json({ message: "Login successfully!", id: result[0].id });
});

app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
  const id = generateID();

  const result = users.filter(
    (user) => user.email === email && user.password === password
  );

  if (result.length === 0) {
    const newUser = { id, email, password, username };
    users.push(newUser);

    return res.json({ message: "Account created successfully!" });
  }

  res.json({
    error_message: " User already exists",
  });
});

app.post("/api/create/thread", async (req, res) => {
  const { thread, userId } = req.body;
  const threadId = generateID();

  //add post details to the array
  threadList.unshift({
    id: threadId,
    title: thread,
    userId,
    replies: [],
    likes: [],
  });

  res.json({
    message: "Thread create successfully!",
    threads: threadList,
  });
});

app.get("/api/all/threads", (req, res) => {
  res.json({
    threads: threadList,
  });
});

app.post("/api/thread/like", (req, res) => {
  // accepts the post id and the user id
  const { threadId, userId } = req.body;

  //gets the react post
  const result = threadList.filter((thread) => thread.id === userId);

  // gets a like property
  const threadLikes = result[0].likes;

  //authenticates the reaction
  const authenticateReaction = threadLikes.filter((user) => user === userId);
  // adds the users to the like array
  if (authenticateReaction.length === 0) {
    threadLikes.push(userId);
    return res.json({
      message: "You've create the post!",
    });
  }
  res.json({
    error_message: "You can only react once!",
  });
});

app.post("/api/thread/replies", (req, res) => {
  const { id } = req.body;
  const result = threadList.filter((thread) => thread.id === id);

  res.json({
    replies: result[0].replies,
    title: result[0].title,
  });
});

app.post("/api/create/reply", async (req, res) => {
  // accepts the post id, user id, and reply
  const { id, userId, reply } = req.body;
  //search for the exact post that was replied
  const result = threadList.filter((thread) => thread.id === id);
  // search for the user via its id
  const user = users.filter((user) => user.id === userId);
  //save the user name and reply
  result[0].replies.unshift({
    userId: user[0].id,
    name: user[0].username,
    text: reply,
  });
  res.json({
    message: "Response added successfully!",
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
