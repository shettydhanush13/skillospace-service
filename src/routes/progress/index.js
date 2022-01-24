const express = require('express');
const router = express.Router();
const authenticate = require("../../core/authentication")

const { addProgress, getMyProgress, updateProgress, deleteProgress } = require('../../controller/progress');

router.post('/', addProgress);
router.get('/myProgress', getMyProgress);
router.put('/:progressId', updateProgress);
router.delete('/:progressId', deleteProgress);

module.exports = router;