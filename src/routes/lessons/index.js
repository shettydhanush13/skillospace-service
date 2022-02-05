const express = require('express');
const router = express.Router();
const authenticate = require("../../core/authentication")

const { addLesson, getLessonsBySkill, updateLesson, deleteLesson } = require('../../controller/lessons');

router.post('/', addLesson);
router.get('/:skill_id', getLessonsBySkill);
router.put('/:lesson_id', updateLesson);
router.delete('/:lesson_id', deleteLesson);

module.exports = router;