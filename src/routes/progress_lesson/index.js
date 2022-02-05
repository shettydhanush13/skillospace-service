const express = require('express');
const router = express.Router();
const authenticate = require("../../core/authentication")

const { addProgressLesson, getProgressLesson } = require('../../controller/progress_lesson');

router.post('/', addProgressLesson);
router.get('/:progress_id', getProgressLesson);

module.exports = router;