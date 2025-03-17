import { DownloadOutlined, SaveOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';

import { useSceneStore } from '@/store/sceneStore';

const Header: React.FC = () => {
  const { showGrid, showHelpers, toggleGrid, toggleHelpers } = useSceneStore();

  // ✅ 视图菜单（保持 Dropdown 打开）
  const viewMenu: MenuProps = {
    selectable: true, // ✅ 允许选中但不自动关闭
    items: [
      {
        key: 'grid',
        label: (
          <div className="flex justify-between items-center w-full">
            <span>显示网格</span>
            <span className="min-w-[20px]">{showGrid && <CheckOutlined />}</span> {/* ✅ 预留位置，不改变对齐 */}
          </div>
        ),
        onClick: (e) => {
          e.domEvent.stopPropagation(); // ✅ 阻止默认关闭
          toggleGrid();
        },
      },
      {
        key: 'helpers',
        label: (
          <div className="flex justify-between items-center w-full">
            <span>显示辅助线</span>
            <span className="min-w-[20px]">{showHelpers && <CheckOutlined />}</span> {/* ✅ 预留位置，不改变对齐 */}
          </div>
        ),
        onClick: (e) => {
          e.domEvent.stopPropagation(); // ✅ 阻止默认关闭
          toggleHelpers();
        },
      },
    ],
  };

  return (
    <header className="h-[50px] flex items-center px-5 bg-gray-900 text-white shadow-md border-b border-gray-700 fixed top-0 left-0 w-full z-50">
      <Space>
        {/* 🔹 视图设置按钮 */}
        <Dropdown menu={viewMenu} trigger={['click']} placement="bottomLeft">
          <Button icon={<EyeOutlined />} className="bg-gray-700 border-none hover:bg-gray-600">
            视图
          </Button>
        </Dropdown>

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
