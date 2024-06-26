const multer = require('multer');


const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'img');
  },
  filename: (req, file, cb) => {
    const name = file.originalname;
    cb(null, name);
  },
});

const helps = multer({ storage: diskStorage}).single('image');

 module.exports = helps;