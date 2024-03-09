const Courses = require('../../model/Courses');
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
  }));

  res.status(200).json({
    message: 'Successfully fetched courses!',
    data: courseData,
  });
};
const getCoursesByLevel = async (req, res) => {
  const param = req?.params?.id.substring(0, 3);
  if (!param) return res.status(400).json({ message: 'Year is required.' });

  const courses = await Courses.find({ level: param }).exec();

  if (!courses || courses.length === 0) {
    return res.status(404).json({ message: `Courses not found` });
  }
  const courseData = courses.map((data) => ({
    id: data.id,
    courseCode: data.courseCode,
    courseTitle: data.courseTitle,
    level: data.level,
  }));

  res.json({
    message: `Successfully fetched courses for ${param} level!`,
    data: courseData,
  });
};
const registerCourses = async (req, res) => {
  console.log('register courses');
};
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
