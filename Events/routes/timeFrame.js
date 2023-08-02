const express = require('express');
const multer = require('multer');
const router = express.Router();

const { populateDB, getUpcomingAnniversary, getUpcomingBirthdays } = require('../controllers/timeFrameCtrl');

const excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/excelUploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const excelUploads = multer({ storage: excelStorage });

router.post('/populatedb', excelUploads.single('uploadfile'), populateDB);
router.get('/birthdays/:days', getUpcomingBirthdays);
router.get('/anniversaries/:days', getUpcomingAnniversary);

module.exports = router