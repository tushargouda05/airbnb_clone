const cookieToken = (user, res, statusCode = 200) => {
  const token = user.getJWTToken();
  const isProd = process.env.NODE_ENV === 'production';
  const days = Number(process.env.COOKIE_TIME || 1);

  const options = {
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  };

  user.password = undefined;
  res.status(statusCode).cookie('token', token, options).json({ success: true, user });
};

module.exports = cookieToken;
