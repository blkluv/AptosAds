const Meme = require('../models/meme');
const User = require('../models/user');

const createAmeme = async (req, res) => {
	try {
		const { title, media, description, email } = req.body;
		const user = await User.findOne({ email });
		const meme = new Meme({
			title,
      description,
			media,
			creator: user._id,
		});
		await meme.save();
		res.status(201).send({ message: 'Meme created successfully', meme });
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

const getMemes = async (_req, res) => {
	try {
		const memes = await Meme.find().populate('creator', 'username _id').exec();
		res.status(200).send(memes);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};

const getAMeme = async (req, res) => {
	try {
		const { memeId } = req.params;
		const meme = await Meme.findById(memeId).populate('creator').exec();
		res.status(200).send(meme);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};

const memeAction = async (req, res) => {
    try {
        const { memeId } = req.params;
        const { action } = req.body;
        const meme = await Meme.findById(memeId);
        if (!meme) {
            return res.status(404).send({ message: "Meme not found" });
        }
        if (!["viral", "notViral"].includes(action)) {
            return res.status(400).send({ message: "Invalid action" });
        }
        meme.bets[action].push(req.user._id);
        const user = await User.findById(req.user._id);
        user[`${action}Bets`].push(memeId);
        await user.save();
        await meme.save();
        res.status(200).send({ message: "Action successful", meme });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const likeMeme = async (req, res) => {
  try {
    const { memeId } = req.params;
    const meme = await Meme.findById(memeId);
    if (!meme) {
      return res.status(404).send({ message: "Meme not found" });
    }
    meme.likes.push(req.user._id);
    const user = await User.findById(req.user._id);
    user.likedMemes.push(memeId);
    await user.save();
    await meme.save();
    res.status(200).send({ message: "Meme liked successfully", meme });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
module.exports = {
	createAmeme,
	getMemes,
	getAMeme,
  memeAction,
    likeMeme,
};
