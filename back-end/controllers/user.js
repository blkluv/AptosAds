const User = require('../models/user');

const handleAuth = async (req, res) => {
	try {
		const { name, email, wallet } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			return res
				.status(200)
				.send({ message: 'User authenticated successfully', user });
		}
		if (!user) {
			const newUser = new User({ email, name, wallet });
			await newUser.save();
			res
				.status(201)
				.send({ message: 'User created successfully', user: newUser });
		}
		res.status(200).send({ message: 'User authenticated successfully', user });
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
};

module.exports = { handleAuth };
