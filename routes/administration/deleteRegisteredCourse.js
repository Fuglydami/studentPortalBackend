const express = require('express');
const router = express.Router();
const coursesController = require('../../controllers/administration/deleteRegisteredCourse');

/**
 * @openapi
 * '/administration/delete-registered-course':
 *  delete:
 *     tags:
 *     - Administration
 *     summary: Get list of register courses
 *     parameters:
 *       - name: matricNo
 *         in: header
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/LogoutUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router.route('/').delete(coursesController.deleteRegisteredCourse);

module.exports = router;
