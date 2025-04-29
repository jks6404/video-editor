import { useState } from "react";

function RenderControls() {
  const [loading, setLoading] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleRender = () => {
    setLoading(true);
    setRendered(false);
    setDownloadUrl(null);

    // Simulate rendering by waiting 2 seconds
    setTimeout(() => {
      setLoading(false);
      setRendered(true);

      // Simulate a video file using Blob
      const blob = new Blob(["Fake video content"], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    }, 2000);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "mock-rendered-video.mp4";
    a.click();
  };

  return (
    <div className="p-4 bg-white shadow rounded text-center">
      <button
        onClick={handleRender}
        className="px-6 py-2 bg-green-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Rendering..." : "Render"}
      </button>

      {rendered && !loading && (
        <div className="mt-4">
          <p className="text-green-700 font-semibold">✅ Render Complete</p>
          <button
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
            onClick={handleDownload}
          >
            ⬇ Download
          </button>
        </div>
      )}
    </div>
  );
}

export default RenderControls;