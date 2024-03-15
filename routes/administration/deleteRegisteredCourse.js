const express = require('express');
const router = express.Router();
const coursesController = require('../../controllers/administration/deleteRegisteredCourse');

/**
 * @openapi
 * '/administration/delete-registered-course/{courseId}':
 *  delete:
 *     tags:
 *     - Administration
 *     summary: Delete a registered course
 *     parameters:
 *       - name: matricNo
 *         in: header
 *       - name: courseId
 *         in: path
 *         required: true
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

router.route('/:id').delete(coursesController.deleteRegisteredCourse);

module.exports = router;
