import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

const Header: React.FC = () => {
  return (
    <header className="h-[50px] flex items-center px-5 bg-gray-900 text-white shadow-md border-b border-gray-700">
      <Space>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          className="bg-transparent border border-gray-600 text-white hover:bg-gray-700"
        >
          保存场景
        </Button>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          className="bg-transparent border border-gray-600 text-white hover:bg-gray-700"
        >
          下载模型
        </Button>
      </Space>
    </header>
  );
};

export default Header;
