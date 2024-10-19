import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MyCourses = () => {
    const [courses, setCourseData] = useState([]);
    const notify = (message, status) => {
        if (status == 200) toast.success(message)
        else toast.error(message)
    }
    useEffect(() => {
        axios.get('http://localhost:3000/mycourses', {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('Authorization'))
            }
        }).then((res) => {
            setCourseData(()=>res.data);
        }).catch((error) => { notify(error.response.data.message,400); })
    }, [])
    
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Courses</h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
          {courses.map((course) =>{
            course.bought=true;
            return (
                <Link key={course._id} to={`/my-courses/${course._id}`} state={{courseId:course._id}}><Card course={course}/></Link>
              )
          }) }
        </div>
      ) : (
        <p className="text-center text-gray-600">You are not enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default MyCourses;
