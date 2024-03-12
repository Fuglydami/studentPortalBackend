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
/**
 * @openapi
 * '/administration/courses/{level}':
 *  get:
 *     tags:
 *     - Administration
 *     summary: Get all courses for each level
 *     parameters:
 *       - name: level
 *         in: path
 *         required: true
 *       - name: matricNo
 *         in: header
 *         required: true
 *         schema:
 *           type: string
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
router.route('/:id').get(coursesController.getCoursesByLevel);
/**
 * @openapi
 * '/administration/courses':
 *  post:
 *     tags:
 *     - Administration
 *     summary: Register list of courses
 *     parameters:
 *       - name: matricNo
 *         in: header
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/CoursesResponse'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatusResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatusResponse'
 */
router.route('/').post(coursesController.registerCourses);

module.exports = router;
