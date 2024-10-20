import React from 'react'

function VideoPlayer({selectedVideo}) {
  console.log(selectedVideo)
  return (
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
  )
}

export default VideoPlayer