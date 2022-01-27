const express = require('express');
const router = express.Router();
const authenticate = require("../../core/authentication")

const { addSkill, getAllSkill, getSkillById, updateSkill, deleteSkill } = require('../../controller/skill');

router.post('/', addSkill);
router.get('/', getAllSkill)
router.get('/:skill_id', authenticate, getSkillById);
router.put('/:skill_id', updateSkill);
router.delete('/:skill_id', deleteSkill);

module.exports = router;