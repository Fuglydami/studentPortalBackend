const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

/**
 * @openapi
 * '/register':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register a student
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/RegisterUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router.post('/', registerController.handleNewUser);

module.exports = router;
