const express = require('express');
const router = express.Router();
const authenticate = require("../../core/authentication")

const { addLesson, getLessonsBySkill, updateLesson, deleteLesson } = require('../../controller/lessons');

router.post('/', authenticate, addLesson);
router.get('/:skill_id', authenticate, getLessonsBySkill);
router.put('/:lesson_id', authenticate, updateLesson);
router.delete('/:lesson_id', authenticate, deleteLesson);

module.exports = router;