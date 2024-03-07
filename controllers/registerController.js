const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate)
    return res.status(400).json({
      message: 'This user already exist',
    });

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      username: username,
      password: hashedPwd,
    });

    console.log(result);

    res.status(200).json({ message: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
