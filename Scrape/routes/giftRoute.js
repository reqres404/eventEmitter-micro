const express = require('express');
const {getGift} = require('../controllers/scrapeController')
const router = express.Router();

router.use("/",getGift)

module.exports = router