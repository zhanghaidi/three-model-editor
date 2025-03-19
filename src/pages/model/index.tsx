import FileControls from '@/components/Exporter';
import Outliner from '@/components/Outliner';

function Model() {
  return (
    <div className="editor">
      <FileControls />
      <div className="main-content">
        <Outliner />
      </div>
    </div>
  );
}

export default Model;
