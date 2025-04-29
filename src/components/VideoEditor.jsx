// VideoEditor.jsx
import React, { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = new FFmpeg();

function VideoEditor() {
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [outputUrl, setOutputUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRender = async () => {
    if (!videoFile || !audioFile) {
      alert("Please upload both video and audio files.");
      return;
    }

    setIsProcessing(true);
    setOutputUrl(null);

    // Load ffmpeg.wasm
    if (!ffmpeg.loaded) {
      await ffmpeg.load();
    }

    // Write input files to memory
    const videoBuffer = await videoFile.arrayBuffer();
    const audioBuffer = await audioFile.arrayBuffer();
    await ffmpeg.writeFile("input.mp4", new Uint8Array(videoBuffer));
    await ffmpeg.writeFile("input.mp3", new Uint8Array(audioBuffer));

    // Combine video + audio
    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-i",
      "input.mp3",
      "-c:v",
      "copy",
      "-c:a",
      "aac",
      "-shortest",
      "output.mp4",
    ]);

    // Read output
    const outputData = await ffmpeg.readFile("output.mp4");
    const url = URL.createObjectURL(
      new Blob([outputData.buffer], { type: "video/mp4" })
    );
    setOutputUrl(url);
    setIsProcessing(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Video Editor</h1>

      <div className="mb-3">
        <label>Video File:</label>
        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setVideoFile(e.target.files?.[0])}
        />
      </div>

      <div className="mb-3">
        <label>Audio File (MP3):</label>
        <input
          type="file"
          accept="audio/mp3"
          onChange={(e) => setAudioFile(e.target.files?.[0])}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleRender}
        disabled={isProcessing}
      >
        {isProcessing ? "Rendering..." : "Render"}
      </button>

      {outputUrl && (
        <div className="mt-5">
          <h2 className="text-lg font-semibold">Preview:</h2>
          <video src={outputUrl} controls width="600" className="mt-2" />
          <a
            href={outputUrl}
            download="edited-video.mp4"
            className="inline-block mt-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            Download Video
          </a>
        </div>
      )}
    </div>
  );
}

export default VideoEditor;
