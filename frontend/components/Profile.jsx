import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from './atoms';

const Profile = () => {
  const [user, setUser] = useRecoilState(userState); // Using Recoil to manage user state
  const [loading, setLoading] = useState(!user); // Only show loading if user data is not present
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user profile data only if it's not already in the state
    if (!user) {
      console.log("first")
      axios.get('http://localhost:3000/profile', {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('Authorization')),
        },
      })
        .then((response) => {
          setUser(response.data); // Save the data in Recoil state
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to load profile data');
          setLoading(false);
        });
    } else {
      setLoading(false); // Data is already available, no need to load
    }
  }, [user, setUser]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 animate-pulse">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {/* Skeleton structure */}
        <div className="mb-6">
          <div className="h-6 w-56 bg-gray-300 mb-2"></div>
          <div className="h-4 w-40 bg-gray-200 mb-1"></div>
          <div className="h-4 w-64 bg-gray-200 mb-1"></div>
          <div className="h-4 w-32 bg-gray-200 mb-1"></div>
          <div className="h-4 w-48 bg-gray-200"></div>
        </div>
        <div className="mb-6">
          <div className="h-6 w-48 bg-gray-300 mb-2"></div>
          <ul className="list-disc pl-5">
            {[...Array(3)].map((_, i) => (
              <li key={i} className="h-4 w-64 bg-gray-200 mb-1"></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

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
