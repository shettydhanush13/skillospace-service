const express = require('express');
const router = express.Router();
const authenticate = require("../../core/authentication")

const { addSkill, getAllSkill, getSkillById, updateSkill, deleteSkill } = require('../../controller/skill');

router.post('/', addSkill);
router.get('/', getAllSkill)
router.get('/:skillId', getSkillById);
router.put('/:skillId', updateSkill);
router.delete('/:skillId', deleteSkill);

module.exports = router;