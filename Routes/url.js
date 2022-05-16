const express = require('express');
const router = express.Router();
const Url = require('../Models/skuaadUrl') // import uri database model
const { shortenUrl, getUrl, getStats } = require('../Controller/Uri')




router.post('/shorten', shortenUrl);
router.get('/shortcode', getUrl);
router.get('/shortcode/stats', getStats);

module.exports = router;
