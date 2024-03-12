const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *    LogoutUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - matricNo
 *        - password
 *      properties:
 *        matricNo:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: pass1234
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: object
 *        data:
 *          type: object
 *    RegisterUserInput:
 *      type: object
 *      required:
 *        - matricNo,
 *        - password,
 *        - fullName,
 *        - department,
 *        - email,
 *        - programme,
 *        - gender,
 *        - session,
 *        - faculty,
 *        - stateOfOrigin,
 *        - lga,
 *        - address,
 *        - phoneNumber,
 *        - dob,
 *        - level,
 *        - religion,
 *        - nxtFullName,
 *        - nxtEmail,
 *        - nxtPhoneNo,
 *        - nxtRelationship
 *      properties:
 *        matricNo:
 *          type: string
 *          default: 1720008
 *        password:
 *          type: string
 *          default: ""
 *        fullName:
 *          type: string
 *          default: Jane Doe
 *        department:
 *          type: string
 *          default: NURSING (NSR)
 *        email:
 *          type: string
 *          default: Johndoe@gmail.com
 *        gender:
 *          type: string
 *          default: female
 *        session:
 *          type: string
 *          default: 2023/2024 Rain
 *        programme:
 *          type: string
 *          default: NURSING SCIENCE
 *        faculty:
 *          type: string
 *          default: CLINICAL SCIENCES(FMS)
 *        stateOfOrigin:
 *          type: string
 *          default: Ondo
 *        lga:
 *          type: string
 *          default: Akure South
 *        address:
 *          type: string
 *          default: 13, Ifedola Street, off Idanre Garage, Akure.
 *        phoneNumber:
 *          type: string
 *          default: 07031208888
 *        dob:
 *          type: string
 *          default: Monday, 08 April 1996
 *        level:
 *          type: string
 *          default: 500L-B.Nsc
 *        religion:
 *          type: string
 *          default: Muslim
 *        nxtFullName:
 *          type: string
 *          default: Tola adeniyi
 *        nxtEmail:
 *          type: string
 *          default: adeniyi@gmail.com
 *        nxtPhoneNo:
 *          type: string
 *          default: 008031208888
 *        nxtRelationship:
 *          type: string
 *          default: sister
 *    RegisterUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */

const userSchema = new Schema({
  matricNo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  programme: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  session: {
    type: String,
    required: false,
  },
  faculty: {
    type: String,
    required: false,
  },
  stateOfOrigin: {
    type: String,
    required: false,
  },
  lga: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  dob: {
    type: String,
    required: false,
  },
  level: {
    type: String,
    required: false,
  },
  religion: {
    type: String,
    required: false,
  },
  nxtFullName: {
    type: String,
    required: false,
  },
  nxtEmail: {
    type: String,
    required: false,
  },
  nxtPhoneNo: {
    type: String,
    required: false,
  },
  nxtRelationship: {
    type: String,
    required: false,
  },
  refreshToken: String,
  courses: [
    {
      type: Number,
      required: true,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
