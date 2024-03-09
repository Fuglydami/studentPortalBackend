const fetch = require('node-fetch');
const Courses = require('../../model/Courses');

const getAllCourses = async (req, res) => {
  try {
    const response = await fetch(process.env.ALL_COURSES_URL);
    const { data } = await response.json();

    if (!data || !Array.isArray(data)) {
      return res.status(404).json({ message: 'Courses not found.' });
    }

    await Courses.deleteMany({}); // Clear existing data
    await Courses.insertMany(data); //  insert the fetched data to db

    const courses = await Courses.find();
    const courseData = courses.map((data) => ({
      id: data.id,
      courseCode: data.courseCode,
      courseTitle: data.courseTitle,
    }));

    res.status(200).json({
      message: 'Successfully fetched courses!',
      data: courseData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'An error occurred while fetching courses.' });
  }
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
  // createNewEmployee,
  // updateEmployee,
  // deleteEmployee,
  // getEmployee
};