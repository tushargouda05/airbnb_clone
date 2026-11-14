const fs = require('fs');
const bcrypt = require('bcryptjs'); // use 'bcrypt' if that's what your User model uses
const cloudinary = require('cloudinary').v2;
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /user/register
exports.register = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email?.toLowerCase().trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    cookieToken(user, res);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'User already exists' });
    }
    res.status(500).json({ message: 'Internal Server error' });
  }
};

// POST /user/login
exports.login = async (req, res) => {
  try {
    const { password } = req.body;
    const email = req.body.email?.toLowerCase().trim();

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server error' });
  }
};

// POST /user/google/auth   body: { credential }  (the Google ID token)
exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required' });
    }

    // Verify the token with Google instead of trusting name/email from the client
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, picture, email_verified } = ticket.getPayload();

    if (!email || !email_verified) {
      return res.status(400).json({ message: 'Google account email is not verified' });
    }

    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        picture,
        password: await bcrypt.hash(Math.random().toString(36).slice(-12), 10),
      });
    }
    cookieToken(user, res);
  } catch (err) {
    res.status(401).json({ message: 'Google authentication failed' });
  }
};

// POST /user/update-picture   (FormData field: picture)
exports.uploadPicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No picture uploaded' });
  }
  const { path } = req.file;
  try {
    const result = await cloudinary.uploader.upload(path, {
      folder: 'AirbnbClone/Users',
    });
    res.status(200).json({ message: 'Picture uploaded successfully', url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server error' });
  } finally {
    await fs.promises.unlink(path).catch(() => {});
  }
};

// PUT /user/update-user   body: { name?, password?, picture? }
exports.updateUserDetails = async (req, res) => {
  try {
    const { name, password, picture } = req.body;

    // Always update the logged-in user, never one chosen by the client
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (picture) user.picture = picture;
    if (password) user.password = password;

    const updatedUser = await user.save();
    cookieToken(updatedUser, res);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server error' });
  }
};

// POST /user/logout
exports.logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// GET /user/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(401).json({ message: 'Not authenticated' });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server error' });
  }
};