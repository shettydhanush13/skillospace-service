const express = require('express');
const router = express.Router();

const { healthcheck } = require('../../controller/healthcheck');

router.get('', healthcheck);

module.exports = router;