import { EyeOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';

import { useEditorStore } from '@/store/editorStore';

const MenubarHelp: React.FC = () => {
  const { showGrid, showHelpers, toggleGrid, toggleHelpers } = useEditorStore();

  // ✅ 视图菜单
  const viewMenu: MenuProps = {
    selectable: true,
    items: [
      {
        key: 'grid',
        label: (
          <div>
            <span>显示网格</span>
            <span>{showGrid && <CheckOutlined />}</span>
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
          <div>
            <span>显示辅助线</span>
            <span>{showHelpers && <CheckOutlined />}</span>
          </div>
        ),
        onClick: (e) => {
          e.domEvent.stopPropagation();
          toggleHelpers();
        },
      },
    ],
  };

  return (
    <Dropdown menu={viewMenu} placement="bottom" arrow={{ pointAtCenter: true }}>
      <Button icon={<EyeOutlined />}>视图</Button>
    </Dropdown>
  );
};

export default MenubarHelp;
