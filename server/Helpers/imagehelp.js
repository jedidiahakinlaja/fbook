const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'../public/images'));
  },
  filename: (req, file, cb) => {
    const name = Date.now()+'-'+ file.originalname;
    cb(null, name);
  },
});

const storage = multer({ storage: diskStorage}).single('image');

 module.exports = storage;