import { useState } from "react";

function SubtitlesEditor() {
  const [subtitles, setSubtitles] = useState([]);

  const addSubtitle = () => {
    setSubtitles([...subtitles, { text: '', start: '', end: '' }]);
  };

  const updateSubtitle = (index, field, value) => {
    const newSubs = [...subtitles];
    newSubs[index][field] = value;
    setSubtitles(newSubs);
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold">📄 Subtitles</h2>
      {subtitles.map((s, i) => (
        <div key={i} className="my-2 space-y-1">
          <input
            className="border p-1 w-full"
            placeholder="Subtitle Text"
            value={s.text}
            onChange={(e) => updateSubtitle(i, 'text', e.target.value)}
          />
          <div className="flex gap-2">
            <input
              className="border p-1 flex-1"
              placeholder="Start Time (s)"
              value={s.start}
              onChange={(e) => updateSubtitle(i, 'start', e.target.value)}
            />
            <input
              className="border p-1 flex-1"
              placeholder="End Time (s)"
              value={s.end}
              onChange={(e) => updateSubtitle(i, 'end', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button
        onClick={addSubtitle}
        className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
      >
        + Add Subtitle
      </button>
    </div>
  );
}
export default SubtitlesEditor;
