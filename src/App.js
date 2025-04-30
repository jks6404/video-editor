import VideoPlayer from './components/VideoPlayer';
import BackgroundMusicInput from './components/BackgroundMusicInput';
import SubtitlesEditor from './components/SubtitlesEditor';
import ImageOverlayEditor from './components/ImageOverlayEditor';
import RenderControls from './components/RenderControls';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">🎬 Video Editor</h1>
      <VideoPlayer />
      <BackgroundMusicInput />
      <SubtitlesEditor />
      <ImageOverlayEditor />
      <RenderControls />
    </div>
  );
}

export default App;
