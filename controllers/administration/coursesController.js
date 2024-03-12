const Courses = require('../../model/Courses');
const User = require('../../model/User');
const data = require('../../routes/administration/courses.json');

const getAllCourses = async (req, res) => {
  await Courses.deleteMany({}); // Clear existing data
  await Courses.insertMany(data); //  insert the fetched data to db

  const courses = await Courses.find();
  const courseData = courses.map((data) => ({
    id: data.id,
    courseCode: data.courseCode,
    courseTitle: data.courseTitle,
    level: data.level,
    unit: data.unit,
  }));

  res.status(200).json({
    message: 'Successfully fetched courses!',
    data: courseData,
  });
};

const getCoursesByLevel = async (req, res) => {
  const param = req?.params?.id.substring(0, 3);
  if (!param) return res.status(400).json({ message: 'Year is required.' });

  try {
    const user = await User.findOne({ matricNo: req.headers.matricno }).exec();
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const registeredCourses = user.courses || [];

    const courses = await Courses.find({ level: param }).exec();
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: `Courses not found` });
    }

    const remainingCourses = courses.filter(
      (course) => !registeredCourses.includes(course.id)
    );

    if (remainingCourses.length === 0) {
      return res.status(200).json({
        message: `You have no course(s) left to register`,
        data: remainingCourses,
      });
    }

    const courseData = remainingCourses.map((data) => ({
      id: data.id,
      courseCode: data.courseCode,
      courseTitle: data.courseTitle,
      level: data.level,
      unit: data.unit,
    }));

    res.json({
      message: `Successfully fetched courses for ${param} level!`,
      data: courseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const registerCourses = async (req, res) => {
  try {
    const matricNo = req.headers.matricno;

    const user = await User.findOne({ matricNo });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const coursesData = req.body;

    if (
      !Array.isArray(coursesData) ||
      coursesData.length === 0 ||
      !coursesData.some((course) =>
        Object.values(course).every((value) => value !== '')
      )
    ) {
      return res.status(400).json({ message: 'Courses data is required.' });
    }

    for (const courseData of coursesData) {
      const courseId = courseData.id;

      if (!courseId) {
        return res.status(400).json({ message: 'Course ID is missing.' });
      }

      if (user.courses.includes(courseId)) {
        return res.status(400).json({ message: `Courses already registered ` });
      }

      user.courses.push(courseId);
    }

    await user.save();

    res.status(200).json({ message: 'Courses registered successfully.' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred while registering the courses.' });
  }
};

const getRegisteredCourses = async (req, res) => {
  // const data = db.courses.find({ level: { $not: { $type: 'number' } } });
  console.log('data');
  // try {
  //   // Find the user by matricNo
  //   const user = await User.findOne({ matricNo: req.headers.matricno }).exec();
  //   if (!user) {
  //     return res.status(404).json({ message: 'User not found.' });
  //   }
  //   // Retrieve the registered course IDs
  //   const registeredCourseIds = user.courses || [];

  //   // Find the detailed information of each registered course
  //   const registeredCourses = await Courses.find({
  //     id: { $in: registeredCourseIds },
  //     level: { $toDouble: '$level' },
  //   }).exec();

  //   console.log(registeredCourses, 'users');
  //   res.status(200).json({
  //     message: 'Successfully fetched registered courses',
  //     data: registeredCourses.map((course) => ({
  //       id: course.id,
  //       courseTitle: course.courseTitle,
  //       courseCode: course.courseCode,
  //       level: course.level,
  //       unit: course.unit,
  //     })),
  //   });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Internal server error' });
  // }
};

module.exports = {
  getAllCourses,
  getCoursesByLevel,
  registerCourses,
  getRegisteredCourses,
  // updateEmployee,
  // deleteEmployee,
  // getEmployee
};
