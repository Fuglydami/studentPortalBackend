const express = require('express');
const router = express.Router();
const coursesController = require('../../controllers/administration/getRegisteredCourses');

/**
 * @openapi
 * '/administration/get-registered-courses':
 *  get:
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
 *                $ref: '#/components/schemas/CoursesResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router.route('/').get(coursesController.getRegisteredCourses);

module.exports = router;
