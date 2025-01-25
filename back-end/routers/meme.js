const express = require("express");
const { getMemes, createAmeme, getAMeme } = require("../controllers/meme");
const router = express.Router();

router.get("/", getMemes);
router.post("/", createAmeme);
router.get("/:memeId", getAMeme);

module.exports = router;
