const express = require('express');
const router = express.Router();

const { signup, login, logout, token } = require('../../controller/auth');

router.post('/signup', signup);
router.post('/login', login);
router.delete('/logout', logout);
router.post('/token', token);

module.exports = router;