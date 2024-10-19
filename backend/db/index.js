const mongoose = require('mongoose');
const { string, number } = require('zod');
mongoose.connect('mongodb://127.0.0.1:27017/AGCourses')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' }, // Defines user roles
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Array of course IDs
  createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],  // Courses created by the instructor
  dateJoined: { type: Date, default: Date.now }
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Instructor's User ID
    instructorName:String,
    thumbnail:String,
    content: [{
      type: { type: String, enum: ['video', 'article'], required: true },  // Type of content
      url: { type: String, required: true }  // Video or article URL
    }],
    category: { type: String, required: true },  // Course category (e.g., programming, business)
    learnPoints: [{type:String}],
    avgRating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // List of enrolled students
    lastUpdated: { type: Date, default: Date.now }
  });
  const VideoSchema = new mongoose.Schema({
    course_id: {
      type: mongoose.Schema.Types.ObjectId,  // Foreign key to the Course collection
      ref: 'Course',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    duration: {
      type: String,  // Duration in hh:mm:ss format
      required: true
    },
    videoIndex: {
      type: Number,  // Order of the video in the course
      required: true
    },
    resources: [
      {
        type: String  // URL for additional resources such as PDFs or notes
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  VideoSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });
  courseSchema.pre('save', function (next) {
    this.lastUpdated = Date.now();
    next();
  });

  const ratingSchema = new mongoose.Schema({
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',  // Reference to the 'Course' model
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the 'User' model
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5  // Ratings typically range from 1 to 5
    },
    review: {
      type: String,
      required: false,
      maxlength: 1000  // Optional, max character limit for review text
    },
    createdAt: {
      type: Date,
      default: Date.now  // Automatically set the creation date
    }
  });

// Adding a method to calculate the average rating for a course
ratingSchema.statics.calculateAvgRating = async function(courseId) {
  const result = await this.aggregate([
    { $match: { course: courseId } },
    {
      $group: {
        _id: '$course',
        avgRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);
  
  try {
    await mongoose.model('Course').findByIdAndUpdate(courseId, {
      avgRating: result[0] ? result[0].avgRating : 0,
      totalReviews: result[0] ? result[0].numReviews : 0
    });
  } catch (error) {
    console.error(error);
  }
};

// Call average rating calculation after a new review is saved
ratingSchema.post('save', function() {
  this.constructor.calculateAvgRating(this.course);
});
 
const Course = mongoose.model('Course', courseSchema);  
const User = mongoose.model('User', userSchema);
const Review = mongoose.model('Review', userSchema);
const Video = mongoose.model('Video', VideoSchema);

module.exports = {
    Course, 
    User,
    Review,
    Video,
}
