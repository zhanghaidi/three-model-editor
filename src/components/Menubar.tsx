import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';

import { useThemeStore } from '@/store/themeStore';

import MenubarFile from './MenubarFile';
import MenubarView from './MenubarView';

const Menubar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="menubar">
      <div className="menubar-left">
        <Space>
          <MenubarFile />
          <MenubarView />
        </Space>
      </div>

      {/* ✅ 右侧：主题切换按钮 */}
      <div className="menubar-right">
        <Switch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
      </div>
    </div>
  );
};

export default Menubar;
