import mongoose, { Schema, Types } from "mongoose";

const facultySchema = mongoose.Schema({
    name: {type: String, enum: ["Economics", "Engineering", "Law"]},
    capacity: {type: Number, min: 10, max: 200}
})

const facultyModel = mongoose.model("Faculty", facultySchema)

const studentSchema = mongoose.Schema({
    name: String,
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty"
    }
})

const studentModel = mongoose.model("Student", studentSchema)


export { studentModel, facultyModel }