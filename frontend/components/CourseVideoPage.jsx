import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

// Example video URL data (replace with actual data from the database)
// const videoData = [
//   {
//     title: "Introduction to Course",
//     url: "https://www.example.com/video1.mp4",
//     duration: "10:00",
//     videoIndex: 1,
//   },
//   {
//     title: "Lesson 2: Advanced Topic",
//     url: "https://www.example.com/video2.mp4",
//     duration: "15:00",
//     videoIndex: 2,
//   },
//   {
//     title: "Lesson 3: Mastery Topic",
//     url: "https://www.example.com/video3.mp4",
//     duration: "12:30",
//     videoIndex: 3,
//   },
// ];

const CourseVideoPage = () => {
  // State for the selected video
  const location = useLocation()
  const courseId = location.state.courseId||{}
  const [selectedVideo, setSelectedVideo] = useState("");
  const [videoData,setVideoData] = useState([]);

  // Mock fetch for videos (you can replace this with axios or fetch)
  useEffect(() => {
    // Fetch video data from backend (example)
    axios.get(`http://localhost:3000/my-courses/content`, {
        params: {courseId: courseId }, // Sending courseId as a query parameter
        headers: {
          Authorization: JSON.parse(localStorage.getItem('Authorization')),
        },
      })
        .then((response) => {
            setVideoData(response.data)
            setSelectedVideo(()=>response.data[0])
        })
        .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Left side: Video Player */}
      <div className="flex-1">
        <div className="w-full">
          <video
            key={selectedVideo.url}
            controls
            className="w-full rounded-lg shadow-lg"
          >
            <source src={selectedVideo.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <h2 className="mt-4 text-xl font-bold">{selectedVideo.title}</h2>
        <p className="text-gray-600">{`Duration: ${selectedVideo.duration}`}</p>
      </div>

      {/* Right side: Video List */}
      <div className="md:w-1/3 w-full bg-gray-100 p-4 rounded-lg shadow-lg overflow-y-auto h-96">
        <h3 className="text-lg font-semibold mb-4">Course Content</h3>
        <ul className="space-y-2">
          {videoData.map((video, index) => (
            <li
              key={index}
              className={`p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${
                selectedVideo.videoIndex === video.videoIndex ? "bg-purple-200" : ""
              }`}
              onClick={() => setSelectedVideo(video)}
            >
              <div className="flex justify-between">
                <span>{`${video.videoIndex}. ${video.title}`}</span>
                <span className="text-gray-500 text-sm">{video.duration}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseVideoPage;
