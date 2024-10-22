// VideoList.js
import React from "react";

const VideoList = ({ videoData,selectedVideo, setSelectedVideo, role, handleEdit, handleDelete, handleCreate }) => {
  return (
    <div className="md:w-1/3 w-full bg-gray-100 p-4 rounded-lg shadow-lg overflow-y-auto h-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Course Content</h3>
          {role=='instructor'?<button
            onClick={() => handleCreate()}  // Open the Add Video modal
            className="px-2 bg-green-500 text-white rounded text-3xl hover:bg-green-600 "
          >
            +
          </button>:<></>}
        </div>

        <ul className="space-y-2">
          {videoData.map((video, index) => (
            <li
              key={index}
              className={`p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${selectedVideo.videoIndex === video.videoIndex ? "bg-purple-200" : ""
                }`}
              onClick={() => {setSelectedVideo(video);console.log(video.title)}}
            >
              <div className="flex justify-between items-center group">
                <span className="py-1">{`${index + 1}. ${video.title}`}</span>

                {role == "instructor" ? (<div className="space-x-2 hidden group-hover:flex">
                  <button onClick={() => handleEdit(video)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(video._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>) : <></>}

                {/* <span className="text-gray-500 text-sm">{video.duration}</span> */}
              </div>

            </li>
          ))}
        </ul>
      </div>
  );
};

export default VideoList;
