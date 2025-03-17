import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

const Header: React.FC = () => {
  return (
    <header className="h-[50px] flex items-center px-5 bg-gray-900 text-white shadow-md border-b border-gray-700 fixed top-0 left-0 w-full z-20">
      <Space>
        <Button type="primary" icon={<SaveOutlined />} className="bg-gray-700 border-none hover:bg-gray-600">
          保存场景
        </Button>
        <Button type="primary" icon={<DownloadOutlined />} className="bg-gray-700 border-none hover:bg-gray-600">
          下载模型
        </Button>
      </Space>
    </header>
  );
};

export default Header;
