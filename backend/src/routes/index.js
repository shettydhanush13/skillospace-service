const express = require('express');
const router = express.Router();

const healthCheckRoute = require("./healthcheck")
const authRoutes = require("./auth")
const listingRoutes = require("./listing")

router.use('/healthcheck', healthCheckRoute);
router.use('/auth', authRoutes);
router.use('/listing', listingRoutes);

module.exports = router;
