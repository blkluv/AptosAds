const express = require("express");
const {
  getMemes,
  createAmeme,
  getAMeme,
  memeAction,
  likeMeme,
} = require("../controllers/meme");
const router = express.Router();

router.get("/", getMemes);
router.post("/", createAmeme);
router.get("/:memeId", getAMeme);
router.post("/action/:memeId", memeAction);
router.post("/like/:memeId", likeMeme);

module.exports = router;
