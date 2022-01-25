const express = require('express');
const router = express.Router();

const { signup, login, logout, token, clearDB } = require('../../controller/auth');

router.post('/signup', signup);
router.post('/login', login);
router.delete('/logout', logout);
router.post('/token', token);
router.delete('/table', clearDB)

module.exports = router;