import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CardSkeleton from './CardSkeleton';
import { useRecoilState } from 'recoil';
import { myCourses } from './atoms';

const MyCourses = () => {
  const [courses, setCourseData] = useRecoilState(myCourses);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const notify = (message, status) => {
    if (status === 200) toast.success(message);
    else toast.error(message);
  };

  useEffect(() => {
    if (!courses) {
      axios.get('http://localhost:3000/mycourses', {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('Authorization'))
        }
      }).then((res) => {
        setCourseData(res.data.courses);
        setRole(res.data.role);
        setLoading(false);
      }).catch((error) => {
        notify(error.response.data.message, 400);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [courses, setCourseData]);

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-gray-100 p-8">
          <h1 className="text-3xl font-bold text-center mb-8">My Courses</h1>
          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 p-8">
          <h1 className="text-3xl font-bold text-center mb-8">My Courses</h1>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
              {courses.map((course) => {
                // Create a copy of the course object and add the 'bought' property
                const courseWithBought = { ...course, bought: true };
                return (
                  <Card course={courseWithBought} role={role} path={`/my-courses/${course._id}`} key={course._id} />
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-600">You are not enrolled in any courses yet.</p>
          )}
        </div>
      )}
    </>
  );
};

export default MyCourses;
