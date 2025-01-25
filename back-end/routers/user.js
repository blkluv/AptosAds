const express = require('express');
const { handleAuth } = require('../controllers/user');

const router = express.Router();

router.post('/auth', handleAuth);

module.exports = router;
