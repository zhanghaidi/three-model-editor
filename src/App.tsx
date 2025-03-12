import { ConfigProvider, App } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import Router from './router';
import 'dayjs/locale/zh-cn';
import '@ant-design/v5-patch-for-react-19';
const Root: React.FC = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#0063f2',
        },
      }}
    >
      <App>
        <Router />
      </App>
    </ConfigProvider>
  );
};

export default Root;
