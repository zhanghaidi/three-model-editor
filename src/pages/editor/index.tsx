import Sidebar from '@/components/Sidebar';
import Toolbar from '@/components/Toolbar';
import ThreeEditor from '@/editor/ThreeEditor';

export default function Editor() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Toolbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <ThreeEditor />
      </div>
    </div>
  );
}
