import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user profile data using Promises
    axios.get('http://localhost:3000/profile',{
        headers: {
            Authorization: JSON.parse(localStorage.getItem('Authorization'))
        }
    }) // Adjust the API route as necessary
      .then((response) => {
        console.log(response.data)
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load profile data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      
      {user && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Date Joined:</strong> {new Date(user.dateJoined).toLocaleDateString()}</p>
          </div>

          {/* Show courses based on user role */}
          {user.role === 'instructor' && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Courses Created</h2>
              {user.createdCourses.length > 0 ? (
                <ul className="list-disc pl-5">
                  {user.createdCourses.map(course => (
                    <li key={course._id}>{course.title}</li>
                  ))}
                </ul>
              ) : (
                <p>No courses created yet.</p>
              )}
            </div>
          )}

          {user.role === 'student' && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Enrolled Courses</h2>
              {user.enrolledCourses.length > 0 ? (
                <ul className="list-disc pl-5">
                  {user.enrolledCourses.map(course => (
                    <li key={course._id}>{course.title}</li>
                  ))}
                </ul>
              ) : (
                <p>No enrolled courses yet.</p>
              )}
            </div>
          )}

          {/* Admin-specific content */}
          {user.role === 'admin' && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Admin Privileges</h2>
              <p>As an admin, you have full access to manage the platform.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
