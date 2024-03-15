const Courses = require('../../model/Courses');

const User = require('../../model/User');

const deleteRegisteredCourse = async (req, res) => {
  try {
    const user = await User.findOne({ matricNo: req.headers.matricno }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const courseId = req?.params.id;
    console.log(courseId, 'courseId');
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required.' });
    }
    const courseIndex = user.courses.indexOf(courseId);
    if (courseIndex === -1) {
      return res.status(400).json({ message: 'Course is not registered.' });
    }
    user.courses.splice(courseIndex, 1);

    await user.save();

    res.status(200).json({
      message: 'Course deleted successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  deleteRegisteredCourse,
};
