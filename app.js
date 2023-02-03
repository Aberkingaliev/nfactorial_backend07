import express from "express"
import mongoose from "mongoose"
import {facultyModel, studentModel} from "./studentDB.js"

const app = express()
app.use(express.json())
const db_url = "mongodb+srv://erkingaliev-21:GoCTyuYp0NaT5UZt@cluster0.et0mjkf.mongodb.net/Student"

app.get("/students/", async (req,res)=>{
    const { faculty} = req.query
    console.log(faculty) // economic
    const foundedFaculty = await facultyModel.find({"name": faculty})
    console.log(foundedFaculty)
    const foundedStudent = await studentModel.find({"faculty": foundedFaculty[0]._id})
    res.send(foundedStudent)
})

app.post("/students/create", async(req,res)=>{
    const body = req.body
    const faculty = await facultyModel.findOne({_id: body.faculty})
    const newStudent = await new studentModel({name: body.name, faculty: faculty._id}).save()
    res.send(newStudent)
})

app.post("/faculty/create", async(req,res)=>{
    const body = req.body
    const newFaculty = await new facultyModel(body).save()
    res.send(newFaculty)
})


async function startApp(){
    try{
        mongoose.connect(db_url, (err)=>{
            if(err){
                console.log(err)
            }
        })
        app.listen(8000)
    }catch(err){
        console.log(err)
    }
}

startApp()


process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
      console.log('Http server closed.');
    });
})