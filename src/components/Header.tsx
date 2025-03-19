import { EyeOutlined, FileOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';

import { useEditorStore } from '@/store/editorStore';

import Exporter from './Exporter';
import Loader from './Loader';

const Header: React.FC = () => {
  const { showGrid, showHelpers, toggleGrid, toggleHelpers } = useEditorStore();

  // ✅ 视图菜单
  const viewMenu: MenuProps = {
    selectable: true,
    items: [
      {
        key: 'grid',
        label: (
          <div className="flex justify-between items-center w-full">
            <span>显示网格</span>
            <span className="min-w-[20px]">{showGrid && <CheckOutlined />}</span>
          </div>
        ),
        onClick: (e) => {
          e.domEvent.stopPropagation();
          toggleGrid();
        },
      },
      {
        key: 'helpers',
        label: (
          <div className="flex justify-between items-center w-full">
            <span>显示辅助线</span>
            <span className="min-w-[20px]">{showHelpers && <CheckOutlined />}</span>
          </div>
        ),
        onClick: (e) => {
          e.domEvent.stopPropagation();
          toggleHelpers();
        },
      },
    ],
  };

  // ✅ 文件菜单
  const fileMenu: MenuProps = {
    items: [
      {
        key: 'import',
        label: <Loader />,
      },
      {
        key: 'export',
        label: <Exporter />,
      },
    ],
  };

  return (
    <header className="h-[50px] flex items-center px-5 bg-gray-900 text-white shadow-md border-b border-gray-700 fixed top-0 left-0 w-full z-50">
      <Space>
        {/* 🔹 文件按钮 */}
        <Dropdown menu={fileMenu} trigger={['click']} placement="bottomLeft">
          <Button icon={<FileOutlined />} className="bg-gray-700 border-none hover:bg-gray-600">
            文件
          </Button>
        </Dropdown>

        {/* 🔹 视图按钮 */}
        <Dropdown menu={viewMenu} trigger={['click']} placement="bottomLeft">
          <Button icon={<EyeOutlined />} className="bg-gray-700 border-none hover:bg-gray-600">
            视图
          </Button>
        </Dropdown>
      </Space>
    </header>
  );
};

export default Header;
