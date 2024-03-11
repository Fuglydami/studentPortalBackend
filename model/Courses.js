const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *    GetCourseInput:
 *      type: object
 *      required:
 *        - matricNo
 *      properties:
 *        matricNo:
 *          type: string
 *          default: ""
 *    CoursesResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          default: ""
 *        courseCode:
 *          type: string
 *          default: ""
 *        courseTitle:
 *          type: string
 *          default: ""
 *        level:
 *          type: number
 *          default: ""
 *        unit:
 *          type: string
 *          default: ""
 *    StatusResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        data:
 *          type: array
 */

const coursesSchema = new Schema({
  id: {
    type: Number,
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
  unit: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Courses', coursesSchema);
