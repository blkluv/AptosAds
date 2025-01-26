const Meme = require('../models/meme');
const User = require('../models/user');

const createAmeme = async (req, res) => {
	try {
		const { title, media, description, email } = req.body;
		const user = await User.findOne({ email });
   media = { link: "https://www.w3schools.com/html/html5_video.asp", mediaType: 'video' };

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
    // amount in APTOS coin
		const { memeId, amount } = req.params;
		const { action, email } = req.body;
		const u = await User.findOne({ email });
		if (!u) {
			return res.status(404).send({ message: 'User not founds' });
		}
		const meme = await Meme.findById(memeId);
		if (!meme) {
			return res.status(404).send({ message: 'Meme not found' });
		}
		if (!['viral', 'notViral'].includes(action)) {
			return res.status(400).send({ message: 'Invalid action' });
		}
		meme.bets[action].push({ user: u._id, amount });
		u[`${action}Bets`].push(memeId);
		await u.save();
		await meme.save();
		res.status(200).send({ message: 'Action successful', meme });
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};

const likeMeme = async (req, res) => {
  try {
    const { memeId } = req.params;
    const { email } = req.body;
    console.log("memeId", memeId);

    const meme = await Meme.findById(memeId);
    if (!meme) {
      return res.status(404).send({ message: "Meme not found" });
    }
    const user = await User.findOne({ email });
    const userId = user._id;

    console.log("user", user, user._id);
    if (meme.likers.includes(userId)) {
      return res.status(400).send({ message: "You have already liked this meme" });
    }
    meme.likers.push(userId);
    user.likedMemes.push(memeId);
    await user.save();
    await meme.save();
    res.status(200).send({ message: "Meme liked successfully", meme });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const betMeme = async (req, res) => {
	try {
		const { email, amount, betType } = req.body;
		const u = await User.findOne({ email });
		if (!u) {
			return res.status(404).send({ message: 'User not found' });
		}
		const { memeId } = req.params;
		const meme = await Meme.findById(memeId);
		if (!meme) {
			return res.status(404).send({ message: 'Meme not found' });
		}
		if (!['viral', 'notViral'].includes(betType)) {
			return res.status(400).send({ message: 'Invalid bet type' });
		}
		if (betType === 'viral') {
			meme.bets.viral.push({ user: u._id, amount });
		} else {
			meme.bets.notViral.push({ user: u._id, amount });
		}
	} catch (error) {
    console.log("error in betting meme")
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
	createAmeme,
	getMemes,
	getAMeme,
	memeAction,
	likeMeme,
	betMeme,
};
