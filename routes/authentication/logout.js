const express = require('express');
const router = express.Router();
const logoutController = require('../../controllers/authentication/logoutController');

/**
 * @openapi
 * /authentication/logout:
 *  post:
 *     tags:
 *     - Auth
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LogoutUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router.post('/', logoutController.handleLogout);

module.exports = router;
