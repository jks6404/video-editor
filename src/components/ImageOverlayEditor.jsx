import { useState, useRef } from "react";

function ImageOverlayEditor() {
  const [imageURL, setImageURL] = useState(null);
  const imgRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageURL(URL.createObjectURL(file));
    }
  };

  const handleDrag = (e) => {
    const img = imgRef.current;
    if (img) {
      img.style.left = `${e.clientX - img.offsetWidth / 2}px`;
      img.style.top = `${e.clientY - img.offsetHeight / 2}px`;
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold">🖼️ Image Overlay</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      <div className="relative mt-4 w-full h-64 bg-gray-200 rounded overflow-hidden">
        {imageURL && (
          <img
            ref={imgRef}
            src={imageURL}
            alt="Overlay"
            draggable="true"
            onDrag={handleDrag}
            className="absolute max-w-[150px] border-2 border-blue-500 rounded opacity-90 cursor-move"
          />
        )}
      </div>
    </div>
  );
}

export default ImageOverlayEditor;
