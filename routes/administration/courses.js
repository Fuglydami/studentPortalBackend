const express = require('express');
const router = express.Router();
const coursesController = require('../../controllers/administration/coursesController');

/**
 * @openapi
 * '/administration/courses':
 *  get:
 *     tags:
 *     - Administration
 *     summary: Get all courses for all level
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

router.route('/').get(coursesController.getAllCourses);

// router.route('/:id')
//     .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router;
