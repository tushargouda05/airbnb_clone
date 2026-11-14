const express = require('express');
const multer = require('multer');
const { isLoggedIn } = require('../middlewares/user');

const routes = express.Router();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

const {
  register,
  login,
  logout,
  googleLogin,
  uploadPicture,
  updateUserDetails,
} = require('../controllers/userController');

// Public
routes.route('/register').post(register);
routes.route('/login').post(login);
routes.route('/google/auth').post(googleLogin);

// Protected
routes.route('/update-picture').post(isLoggedIn, upload.single('picture'), uploadPicture);
routes.route('/update-user').put(isLoggedIn, updateUserDetails);
routes.route('/logout').post(isLoggedIn, logout);

module.exports = routes;