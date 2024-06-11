const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type:String, unique:true},
    phone: String,
    linkedinUrl: String,
    languages: Array,
    program: String,
    background: String,
    image: String,
    cohort_id: Number,
    projects: Array
  })

  const Student = mongoose.model('Student', studentSchema);


  module.exports = Student;