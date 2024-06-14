const router = require("express").Router();
const Student = require("../models/Student.model");

//concatenate router in app.js with router. ex: http://localhost:8080/api/Students/create
router.post("/", async (req, res) => {
  try {
    const createdStudent = await Student.create(req.body);
    res.json(createdStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.json(allStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const studentsByCohort = await Student.find({
      cohort: req.params.cohortId,
    });
    res.json(studentsByCohort);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "cohort"
    );
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const std = await Student.findByIdAndDelete(req.params.studentId);
    res.json({ message: "Student Deleted Succesfull", std: std });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put("/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    res.json({
      message: "Student Updated succesfull",
      updatedStudent: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
