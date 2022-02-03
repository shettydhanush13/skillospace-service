const express = require('express');
const router = express.Router();
const authenticate = require("../../core/authentication")

const { addProgressLesson, getProgressLesson } = require('../../controller/progress_lesson');

router.post('/', authenticate, addProgressLesson);
router.get('/:progress_id', authenticate, getProgressLesson);

module.exports = router;