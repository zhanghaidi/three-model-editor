import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Space>
        <Button type="primary" icon={<SaveOutlined />}>
          保存场景
        </Button>
        <Button type="primary" icon={<DownloadOutlined />}>
          下载模型
        </Button>
      </Space>
    </header>
  );
};

export default Header;
