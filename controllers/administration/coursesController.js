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
  // const registeredCourses = User.courses || [];
  const courses = await Courses.find({ level: param }).exec();
  const registeredCourses = await User.find();

  if (!courses || courses.length === 0) {
    return res.status(404).json({ message: `Courses not found` });
  }

  const remainingCourses = courses.filter(
    (course) => !registeredCourses[0]?.courses.includes(course.id)
  );

  if (remainingCourses.length === 0) {
    return res
      .status(200)
      .json({
        message: `You have no course left to register`,
        data: remainingCourses,
      });
  }
  // console.log(remainingCourses, 'remainingCourse');
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

// const registerCourses = async (req, res) => {
//   // try {
//   // Extract matricNo from the request header
//   const matricNo = req.headers.matricno;

//   // Find the user by matricNo
//   const user = await User.findOne({ matricNo });
//   if (!user) {
//     return res.status(404).json({ message: 'User not found.' });
//   }

//   // Validate request body

//   const courses = req.body;

//   if (!Array.isArray(courses) || courses.length === 0) {
//     return res.status(400).json({ message: 'Courses data is required.' });
//   }

//   // Register each course for the user
//   for (const _id of courses) {
//     const course = await Courses.findById(_id);

//     if (!course) {
//       return res.status(400).json({ message: `Course ${_id} not found.` });
//     }

//     if (user.courses.includes(_id)) {
//       return res
//         .status(400)
//         .json({ message: `User already registered for course ${_id}.` });
//     }

//     user.courses.push(_id);
//   }

//   // Save the user object after registering all courses
//   await user.save();

//   res.status(200).json({ message: 'Courses registered successfully.' });
//   // } catch (error) {
//   //   res
//   //     .status(500)
//   //     .json({ message: 'An error occurred while registering the courses.' });
//   // }
// };
// const createNewEmployee = async (req, res) => {
//     if (!req?.body?.firstname || !req?.body?.lastname) {
//         return res.status(400).json({ 'message': 'First and last names are required' });
//     }

//     try {
//         const result = await Employee.create({
//             firstname: req.body.firstname,
//             lastname: req.body.lastname
//         });

//         res.status(201).json(result);
//     } catch (err) {
//         console.error(err);
//     }
// }

// const updateEmployee = async (req, res) => {
//     if (!req?.body?.id) {
//         return res.status(400).json({ 'message': 'ID parameter is required.' });
//     }

//     const employee = await Employee.findOne({ _id: req.body.id }).exec();
//     if (!employee) {
//         return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
//     }
//     if (req.body?.firstname) employee.firstname = req.body.firstname;
//     if (req.body?.lastname) employee.lastname = req.body.lastname;
//     const result = await employee.save();
//     res.json(result);
// }

// const deleteEmployee = async (req, res) => {
//     if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

//     const employee = await Employee.findOne({ _id: req.body.id }).exec();
//     if (!employee) {
//         return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
//     }
//     const result = await employee.deleteOne(); //{ _id: req.body.id }
//     res.json(result);
// }

// const getEmployee = async (req, res) => {
//     if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

//     const employee = await Employee.findOne({ _id: req.params.id }).exec();
//     if (!employee) {
//         return res.status(204).json({ "message": `No employee matches ID ${req.params.id}.` });
//     }
//     res.json(employee);
// }

module.exports = {
  getAllCourses,
  getCoursesByLevel,
  registerCourses,
  // createNewEmployee,
  // updateEmployee,
  // deleteEmployee,
  // getEmployee
};
