const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authentication/loginController');

/**
 * @openapi
 * '/authentication/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login a student
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router.post('/', authController.handleLogin);

module.exports = router;
