const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
//cors middleware
const cors = require("cors");
//Mongoose middleware
const mongoose = require("mongoose");
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohortsData = require("./cohorts.json")
const studentsData = require("./students.json")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors({ origin: ["http://localhost:5173"] }));
// Set up Mongoose middleware here:
mongoose
  .connect("mongodb://localhost:27017/cohort-toolsDB")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));
// ...

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//Route /api/cohorts returning all data in cohorts.json

app.get("/api/cohorts", (req, res) => {
  Cohort.find().then((cohorts) => {
    console.log("Cohorts List:", cohorts)
    res.json(cohorts)
  });
})

app.get("/api/students", (req, res) => {
  Student.find().then((students) => {
    console.log("Students List:", students)
    res.json(students)
  });
})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

