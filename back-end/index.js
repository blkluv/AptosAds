const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routers/user");
const memeRouter = require("./routers/meme");
const cors = require("cors");
const port = 5000;

const app = express();
app.use(
  cors({
    origin: [
      'https://memebet.luvnft.com',
      'http://localhost:5173',
      'http://localhost:5000'
    ],
    credentials: true
  })
);
connectDB();
app.use(express.json());

app.use("/api/memes", memeRouter);
app.use("/api/users", userRouter);
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
