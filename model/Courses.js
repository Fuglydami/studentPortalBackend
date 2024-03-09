const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *    CoursesResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        courseCode:
 *          type: string
 *        courseTitle:
 *          type: string
 *        level:
 *          type: number
 *      '400':
 *        description: courses not found
 */

const coursesSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Courses', coursesSchema);
