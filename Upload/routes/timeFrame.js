const express = require('express');
const multer = require('multer');
const router = express.Router();

const {populateDB} = require('../controllers/timeFrameCtrl');

const excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/excelUploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const excelUploads = multer({ storage: excelStorage });

router.post('/', excelUploads.single('uploadfile'), populateDB);


module.exports = router