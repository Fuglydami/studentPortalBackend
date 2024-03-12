const Courses = require('../../model/Courses');
const User = require('../../model/User');

const getRegisteredCourses = async (req, res) => {
  try {
    const user = await User.findOne({ matricNo: req.headers.matricno }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const registeredCourseIds = user.courses || [];
    const registeredCourses = await Courses.find({
      id: { $in: registeredCourseIds },
    }).exec();

    res.status(200).json({
      message: 'Successfully fetched registered courses',
      data: registeredCourses.map((course) => ({
        id: course.id,
        courseTitle: course.courseTitle,
        courseCode: course.courseCode,
        level: course.level,
        unit: course.unit,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getRegisteredCourses,
};
