const User = require('../../model/User');
const bcrypt = require('bcrypt');

const requiredFields = [
  'matricNo',
  'password',
  'fullName',
  'department',
  'email',
  'programme',
  'gender',
  'session',
  'faculty',
  'stateOfOrigin',
  'lga',
  'address',
  'phoneNumber',
  'dob',
  'level',
  'religion',
  'nxtFullName',
  'nxtEmail',
  'nxtPhoneNo',
  'nxtRelationship',
];
const handleNewUser = async (req, res) => {
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ message: 'All fields are required.', missingFields });
  }

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ matricNo: req.body.matricNo }).exec();
  if (duplicate)
    return res.status(400).json({
      message: 'This user already exist',
    });

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(req.body.password, 10);

    //create and store the new user
    const result = await User.create({
      ...req.body,
      password: hashedPwd,
    });

    res.status(200).json({ message: `Profile successfully created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
