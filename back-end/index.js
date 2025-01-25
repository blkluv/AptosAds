const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routers/user");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/memes", require("./routers/meme"));
app.use("/api/users", userRouter);
app.use("*", (_req, res) => {
  res.status(404).send("404 Not Found");
});

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
