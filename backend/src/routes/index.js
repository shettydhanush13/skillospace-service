const express = require('express');
const router = express.Router();

const healthCheckRoute = require("./healthcheck")

router.use('/healthcheck', healthCheckRoute);

module.exports = router;
