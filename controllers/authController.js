const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { matricNo, password } = req.body;
  if (!matricNo || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });

  const foundUser = await User.findOne({ matricNo: matricNo }).exec();
  if (!foundUser) {
    return res.status(400).json({
      message: 'User not found',
    }); //Unauthorized
  }
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.fullName,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1000s' }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.fullName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const data = {
      matricNo: foundUser.matricNo,
      fullName: foundUser.fullName,
      department: foundUser.department,
      email: foundUser.email,
      gender: foundUser.gender,
      session: foundUser.session,
      programme: foundUser.programme,
      faculty: foundUser.faculty,
      stateOfOrigin: foundUser.stateOfOrigin,
      lga: foundUser.lga,
      address: foundUser.address,
      phoneNumber: foundUser.phoneNumber,
      dob: foundUser.dob,
      level: foundUser.level,
      religion: foundUser.religion,
      nxtFullName: foundUser.nxtFullName,
      nxtEmail: foundUser.nxtEmail,
      nxtPhoneNo: foundUser.nxtPhoneNo,
      nxtRelationship: foundUser.nxtRelationship,
    };
    res.json({
      token: {
        access_Token: accessToken,
        expiryTime: new Date().toISOString(),
        refresh_Token: refreshToken,
      },
      data: data,
    });
  } else {
    res.status(400).json({
      message: 'User not found',
    });
  }
};

module.exports = { handleLogin };
