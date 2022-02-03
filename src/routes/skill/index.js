const express = require('express');
const router = express.Router();
const authenticate = require("../../core/authentication")

const { addSkill, getAllSkill, getSkillById, updateSkill, deleteSkill } = require('../../controller/skill');

router.post('/', authenticate, addSkill);
router.get('/', getAllSkill)
router.get('/:skill_id', getSkillById);
router.put('/:skill_id', authenticate, updateSkill);
router.delete('/:skill_id', authenticate, deleteSkill);

module.exports = router;