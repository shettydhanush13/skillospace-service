const express = require('express');
const router = express.Router();
const authenticate = require("../../core/authentication")

const { addListing, getAllListing, getMyListing, updateListing, deleteListing } = require('../../controller/listing');

router.post('/', authenticate, addListing);
router.get('/', getAllListing);
router.get('/myListing', authenticate, getMyListing);
router.put('/:listingId', authenticate, updateListing);
router.delete('/:listingId', authenticate, deleteListing);

module.exports = router;