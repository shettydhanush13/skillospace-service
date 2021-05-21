const express = require('express');
const router = express.Router();

const healthCheckRoute = require("./healthcheck")
const authRoutes = require("./auth")

router.use('/healthcheck', healthCheckRoute);
router.use('/auth', authRoutes);

module.exports = router;
