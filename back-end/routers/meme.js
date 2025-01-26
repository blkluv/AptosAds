const express = require("express");
const {
  getMemes,
  createAmeme,
  getAMeme,
  memeAction,
  likeMeme,
  betMeme
} = require("../controllers/meme");
const router = express.Router();

router.get("/", getMemes);
router.post("/", createAmeme);
router.get("/:memeId", getAMeme);
router.post("/:memeId", memeAction);
router.post("/:memeId", likeMeme);
router.post("/bet/:memeId", betMeme);

module.exports = router;
