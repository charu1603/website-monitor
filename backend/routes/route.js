const express = require('express');
const { getWebsites, addWebsite } = require('../controllers/websiteController');
const router = express.Router();

router.get('/', getWebsites);
router.post('/', addWebsite); 

module.exports = router;

