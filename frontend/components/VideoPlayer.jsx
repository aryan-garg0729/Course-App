import React, { useRef, useState } from 'react'

function VideoPlayer({ selectedVideo }) {
  // console.log(selectedVideo)
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  // Function to handle metadata loaded event
  const handleLoadedMetadata = () => {
    const videoDuration = videoRef.current.duration;
    setDuration(videoDuration); // Set duration in state
  };
  return (
    <div className="flex-1">
      <div className="w-full">
        {/* <video
            ref={videoRef}
            key={selectedVideo.url}
            controls
            className="w-full rounded-lg shadow-lg"
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source src={selectedVideo.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}

          {/* or embed from youtube */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/YefD_gj3svM?start=3107"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded YouTube Video"
          ></iframe>
        </div>
      </div>
      <h2 className="mt-4 text-xl font-bold">{selectedVideo.title}</h2>
      <p className="text-gray-600">{`Duration: ${Math.floor(duration / 60)}min`}</p>
    </div>
  )
}

export default VideoPlayer