import { FileOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';

import Exporter from './Exporter';

const MenubarFile: React.FC = () => {
  // ✅ 文件菜单
  const fileMenu: MenuProps = {
    items: [
      {
        key: 'import',
        label: <Button icon={<FileOutlined />}>导入</Button>,
      },
      {
        key: 'export',
        label: <Exporter />,
      },
    ],
  };

  return (
    <header>
      <Dropdown menu={fileMenu} placement="bottom" arrow={{ pointAtCenter: true }}>
        <Button icon={<FileOutlined />}>文件</Button>
      </Dropdown>
    </header>
  );
};

export default MenubarFile;
