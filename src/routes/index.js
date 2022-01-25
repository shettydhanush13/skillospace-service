const express = require('express');
const router = express.Router();

const healthCheckRoute = require("./healthcheck")
const authRoutes = require("./auth")
const progressRoutes = require("./progress")
const skillRoutes = require("./skill")
const lessonsRoutes = require("./lessons")

router.use('/healthcheck', healthCheckRoute);
router.use('/auth', authRoutes);
router.use('/progress', progressRoutes);
router.use('/skill', skillRoutes);
router.use('/lesson', lessonsRoutes);

module.exports = router;
