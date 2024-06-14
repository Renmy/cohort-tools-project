const router = require("express").Router();
const Cohort = require("../models/Cohort.model");
//concatenate router in app.js with router. ex: http://localhost:8080/api/cohorts/create
router.post("/", async (req, res) => {
  try {
    const createdCohort = await Cohort.create(req.body);
    res.json(createdCohort);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allCohorts = await Cohort.find();
    res.json(allCohorts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    res.json(cohort);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete("/:cohortId", async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.json({ message: "Cohort Deleted succesfull" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put("/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true }
    );
    res.json({
      message: "Cohort Updated succesfull",
      updatedCohort: updatedCohort,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
