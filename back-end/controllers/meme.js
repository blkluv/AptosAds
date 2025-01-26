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

module.exports = {
	createAmeme,
	getMemes,
	getAMeme,
};
