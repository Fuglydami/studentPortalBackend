require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;
const swaggerDocs = require('./config/swagger');

// Connect to MongoDB
connectDB();
swaggerDocs(app, PORT);

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// routes
// app.use('/', require('./routes/root'));
app.use(
  '/authentication/register',
  require('./routes/authentication/register')
);
app.use('/authentication/login', require('./routes/authentication/login'));
app.use(
  '/authentication/refreshToken',
  require('./routes/authentication/refresh')
);
app.use('/authentication/logout', require('./routes/authentication/logout'));
app.use(verifyJWT);
app.use('/administration/courses', require('./routes/administration/courses'));
app.use(
  '/administration/get-registered-courses',
  require('./routes/administration/getRegisteredCourses')
);
app.use(
  '/administration/delete-registered-course',
  require('./routes/administration/deleteRegisteredCourse')
);

app.all('*', (req, res) => {
  res.status(404);
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
