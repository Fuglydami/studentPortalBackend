const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  let {
    matricNo,
    password,
    fullName,
    department,
    email,
    programme,
    gender,
    session,
    faculty,
    stateOfOrigin,
    lga,
    address,
    phoneNumber,
    dob,
    level,
    religion,
    nxtFullName,
    nxtEmail,
    nxtPhoneNo,
    nxtRelationship,
  } = req.body;
  if (
    (!matricNo,
    !password,
    !fullName,
    !department,
    !email,
    !programme,
    !gender,
    !session,
    !faculty,
    !stateOfOrigin,
    !lga,
    !address,
    !phoneNumber,
    !dob,
    !level,
    !religion,
    !nxtFullName,
    !nxtEmail,
    !nxtPhoneNo,
    !nxtRelationship)
  )
    return res.status(400).json({ message: 'All fields are required.' });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ matricNo: matricNo }).exec();
  if (duplicate)
    return res.status(400).json({
      message: 'This user already exist',
    });

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      matricNo,

      fullName,
      department,
      email,
      programme,
      gender,
      session,
      faculty,
      stateOfOrigin,
      lga,
      address,
      phoneNumber,
      dob,
      level,
      religion,
      nxtFullName,
      nxtEmail,
      nxtPhoneNo,
      nxtRelationship,
      password: hashedPwd,
    });

    console.log(result);

    res.status(200).json({ message: `Profile successfully created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
