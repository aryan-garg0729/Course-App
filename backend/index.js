const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const {User, Course, Video} = require('./db')
const z = require('zod')
const jwt = require('jsonwebtoken');
const  {JWT_SECRET} = require('./config.js');
const authmiddleware = require('./middleware/user.js');
const cors = require('cors')


// zod schemas
const emailSchema = z.string().email({ message: "Invalid email address" });
const roleSchema = z.enum(['student', 'instructor', 'admin']);

// middlewares
app.use(cors())
app.use(bodyParser.json());

// routes
app.get('/courses',async(req,res)=>{
    try {
        const courses = await Course.find({});
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
    
})
app.get('/mycourses',authmiddleware,async(req,res)=>{
    const email = req.body.email
    try {
        const user = await User.findOne({ email })
          .populate({
            path: 'enrolledCourses', // Populating enrolled courses
            model: 'Course',
          })
          .populate({
            path: 'createdCourses', // Populating created courses
            model: 'Course',
          });
    
        if (!user) {
          res.json({ message: 'User not found' });
        }
        
        if(user.role=='student')res.send(user.enrolledCourses);
        else res.send(user.createdCourses);
      } catch (error) {
        console.error('Error fetching user courses:', error);
        res.status(500).json({message:"Server Error"})
      }
    
})

app.get('/my-courses/content',authmiddleware,async(req,res)=>{
    const course_id =req.query.courseId;
    const videos = await Video.find({course_id})
    console.log(videos)
    res.send(videos)
})

app.post('/signup',async(req,res)=>{
    const {name, email, password,role} = req.body;
    // data validation
    console.log(req.body)
    if(!(emailSchema.safeParse(email).success && roleSchema.safeParse(role).success)){
        res.status(400).json({message:"wrong data format"});
        return;
    }

    // create user
    // todo: hash password
    try{
        const user = await User.create({
            name,
            email,
            password,
            role
        })
        console.log(user);
        res.status(201).send({message:"user created"});

    }catch(e){
        res.status(409).json({message:"user exists"});
    }
})

app.post('/signin',async(req,res)=>{
    const {email, password} = req.body;
    // data validation
    if(!emailSchema.safeParse(email).success){
        res.send("wrong data format");
        return;
    }

    const user = await User.findOne({email,password});
    if(!user)return res.status(403).json({message:"Incorrect email or password"});

    const token = jwt.sign({email:email,role:user.role},JWT_SECRET);
    res.status(200).json({message:token});
})

app.post('/buy',authmiddleware,async(req,res)=>{
    const course = req.body.courseId;
    console.log(course)
    const user = await User.findOne({email:req.body.email});
    const alreadyEnrolled = user.enrolledCourses.includes(course);

    if (alreadyEnrolled) {
        return res.status(400).json({ message: 'You are already enrolled in this course' });
    }
    await User.updateOne({
        email:user.email
    },{
        '$push':{
            enrolledCourses:course
        }
    });
    await Course.updateOne({
        _id:course
    },{
        '$push':{
            studentsEnrolled:user._id
        }
    })
    res.status(200).json({message:'Purchase successful'})
})
app.get('/profile',authmiddleware,async(req,res)=>{
    try {
        const email = req.body.email; 
        console.log(email)
        // Fetch the user from the database
        const user = await User.findOne({email})
        .populate('enrolledCourses')
        .populate('createdCourses')
        .exec();
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        console.log(user)
        // Send the user data
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});