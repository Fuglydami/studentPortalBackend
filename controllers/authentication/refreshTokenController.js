const User = require('../../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.log(decoded, 'foundedddddUser');
    if (err || foundUser.fullName !== decoded.username)
      return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '100000s' }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
