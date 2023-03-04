const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const users = [];

//generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  let result = users.filter(
    (user) => user.email === email && user.password === password
  );
  if (result.length !== 1) {
    return res.json({error_message: "Incorrect Credentials"})
  }
  res.json({message: "Login successfully!", id: result[0].id})
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
app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
