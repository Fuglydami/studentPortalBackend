const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterUserInput:
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
 *          default: pass1234
 *    RegisterUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */

const registerSchema = new Schema({
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

module.exports = mongoose.model('Register', registerSchema);
