import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import VideoModal from "./VideoModal";
import VideoPlayer from "./VideoPlayer";
import VideoList from "./VideoList";
import ReviewSection from "./Reviews";

// Bind modal to your app element to prevent accessibility-related issues
Modal.setAppElement('#root');

const CourseVideoPage = () => {
  const location = useLocation()
  const courseId = location.state.course._id || {}
  // State for the selected video
  const [selectedVideo, setSelectedVideo] = useState({});
  // all data related to course videos
  const [videoData, setVideoData] = useState([]);
  // is the user instructor or student?
  const [role, setRole] = useState('');
  // State to control modal visibility and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  // is the modal opened for creating new video or editing
  const [create, setcreate] = useState(false);
  const [updated, setupdated] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/my-courses/content`, {
      params: { courseId: courseId }, // Sending courseId as a query parameter
      headers: {
        Authorization: JSON.parse(localStorage.getItem('Authorization')),
      },
    })
      .then((response) => {
        setVideoData(response.data.videos)
        // console.log(response)
        setRole(response.data.role);
        if (response.data.videos.length > 0) setSelectedVideo(() => response.data.videos[0])
      })
      .catch((error) => console.error(error));
  }, [updated]);
  // notify toast
  const notify = (message, status) => {
    if (status == 200) toast.success(message)
    else toast.error(message)
  }



  // handle deletion of video
  const handleDelete = async (id) => {
    try {
      console.log(id)
      const res = await axios.delete("http://localhost:3000/deleteVideo", {
        params: { _id: id },
        headers: {
          Authorization: JSON.parse(localStorage.getItem('Authorization')),
        }
      })
      notify(res.data.message, 200)
      setupdated((prev) => !prev);

    } catch (error) {
      notify(error.response.data.message, 400)
    }

  }

  // Function to open modal and set the current video data
  const handleEdit = (video) => {
    setFormData(video);
    setIsModalOpen(true);
    setcreate(false)
  };

  // Function to open modal and set course id 
  const handleCreate = () => {
    console.log(courseId)
    setFormData({
      title: "",
      duration: "",
      url: "",
      course_id: courseId
    });
    setcreate(true);
    setIsModalOpen(true);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission (e.g., send data to backend)
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log('Edited video data:', formData);
    // Add logic here to send updated data to the backend (e.g., axios PUT request)
    try {
      const res = await axios.put("http://localhost:3000/editVideo", { video: formData }, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('Authorization')),
        }
      })
      notify(res.data.message, 200)
      setupdated((prev) => !prev);

    } catch (error) {
      notify(error.response.data.message, 400)
    }
    setIsModalOpen(false);
  };

  // Handle form submission to add new video
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    console.log('New video data:', formData);

    try {
      const res = await axios.post("http://localhost:3000/addVideo", { video: formData }, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('Authorization')),
        },
      });
      notify(res.data.message, 200);
      // After successfully adding, refresh the video list or add the new video to videoData
      // setVideoData((prevVideos) => [...prevVideos, res.data.newVideo]);  // Update the video list
      setIsModalOpen(false);  // Close the modal
      setupdated((prev) => !prev);

    } catch (error) {
      notify(error.response.data.message, 400);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Left side: Video Player */}
        <VideoPlayer selectedVideo={selectedVideo} />

        {/* Right side: Video List */}
        <VideoList
          videoData={videoData}
          selectedVideo={selectedVideo}
          setSelectedVideo={setSelectedVideo}
          role={role} handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleCreate={handleCreate}
        />

        <VideoModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={create ? handleAddSubmit : handleEditSubmit}
          title={create ? "Create Video" : "Edit Video"}
        />

      </div>
      <ReviewSection course_id={courseId} allowReviews={true}/>
    </div>
  );
};

export default CourseVideoPage;
