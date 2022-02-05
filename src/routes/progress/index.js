const express = require('express');
const router = express.Router();
const authenticate = require("../../core/authentication")

const { addProgress, getMyProgress, getProgressBySkillId, deleteProgress } = require('../../controller/progress');

router.post('/', authenticate, addProgress);
router.get('/myProgress', authenticate, getMyProgress);
router.get('/:skill_id', getProgressBySkillId);
router.delete('/:progressId', deleteProgress);

module.exports = router;