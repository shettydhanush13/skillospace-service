const express = require('express');
const router = express.Router();
const authenticate = require("../../core/authentication")

const { addProgress, getMyProgress, getProgressBySkillId, updateProgress, deleteProgress } = require('../../controller/progress');

router.post('/', addProgress);
router.get('/myProgress', getMyProgress);
router.get('/:skill_id', getProgressBySkillId);
router.put('/:progressId', updateProgress);
router.delete('/:progressId', deleteProgress);

module.exports = router;