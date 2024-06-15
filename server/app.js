const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
//import for mongoose connection
const connectDB = require("./config/mongoose.connection");
//cors middleware
const cors = require("cors");
//dotenv config for DB URI
require("dotenv").config();
//importing routers
const cohortRouter = require("./routes/cohort.routes.js");
const studentRouter = require("./routes/student.routes.js");
const authRouter = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes.js");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// const cohortsData = require("./cohorts.json");
// const studentsData = require("./students.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors({ origin: ["http://localhost:5173"] }));
// Set up Mongoose middleware here: there is another way creating a config file for the conection
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
//   .catch((err) => console.error("Error connecting to MongoDB", err));

// ...

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/cohorts", cohortRouter);
app.use("/api/students", studentRouter);
app.use("/auth", authRouter);
app.use("/api/users", userRouter);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//Route /api/cohorts returning all data in cohorts.json

// app.get("/api/cohorts", (req, res) => {
//   Cohort.find().then((cohorts) => {
//     res.json(cohorts);
//   });
// });

// app.get("/api/students", (req, res) => {
//   Student.find().then((students) => {
//     res.json(students);
//   });
// });

// START SERVER
app.listen(PORT, () => {
  console.clear();
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
