import { ConfigProvider, theme } from 'antd';

import { ThreeEditor } from './components/ThreeEditor';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <ThreeEditor />
    </ConfigProvider>
  );
}

export default App;
