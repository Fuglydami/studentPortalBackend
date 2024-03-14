const express = require('express');
const router = express.Router();
const refreshTokenController = require('../../controllers/authentication/refreshTokenController');

/**
 * @openapi
 * /authentication/refreshToken:
 *  post:
 *     tags:
 *     - Auth
 *     summary: initiate refresh token
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

router.post('/', refreshTokenController.handleRefreshToken);

module.exports = router;
