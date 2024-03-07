const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: pass123
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        fullName:
 *          type: string
 *        token:
 *          type: string

 */

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);
