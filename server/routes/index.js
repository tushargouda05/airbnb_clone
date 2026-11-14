const express = require('express');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { isLoggedIn } = require('../middlewares/user');

const router = express.Router();


const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

// Upload a photo from a URL (login required)
router.post('/upload-photo', isLoggedIn, async (req, res) => {
  try {
    const { link } = req.body;
    if (!link || !/^https?:\/\//i.test(link)) {
      return res.status(400).json({ message: 'A valid http(s) image link is required' });
    }
    const result = await cloudinary.uploader.upload(link, { folder: 'airbnb-clone' });
    res.status(200).json({ message: 'Photo uploaded successfully', url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading photo', error: error.message });
  }
});

// Upload up to 10 photos from the device (login required)
// Frontend: FormData with the field name "photos"
router.post('/upload-photos', isLoggedIn, upload.array('photos', 10), async (req, res) => {
  const files = req.files || [];
  try {
    if (files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const results = await Promise.all(
      files.map((file) => cloudinary.uploader.upload(file.path, { folder: 'airbnb-clone' }))
    );
    res.status(200).json({
      message: 'Photos uploaded successfully',
      urls: results.map((r) => r.secure_url),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading photos', error: error.message });
  } finally {
    // Always remove temp files, even if the upload failed
    await Promise.all(files.map((f) => fs.promises.unlink(f.path).catch(() => {})));
  }
});

module.exports = router;