import { useState } from "react";

function VideoPlayer() {
  const [videoURL, setVideoURL] = useState(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoURL(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="p-4 bg-white shadow rounded mb-4">
        <h2 className="text-lg font-semibold mb-2">🎥 Upload Your Video</h2>
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
      </div>
      
      {videoURL && (
        <video controls className="w-full border rounded" src={videoURL}>
          Your browser does not support video.
        </video>
      )}
    </div>
  );
}

export default VideoPlayer;
