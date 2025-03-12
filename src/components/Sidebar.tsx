import { Card } from 'antd';
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div style={{ width: 250, background: '#333', padding: 10, color: '#fff' }}>
      <Card title="对象属性" style={{ background: '#444', color: '#fff' }}>
        <p>位置: (x, y, z)</p>
        <p>旋转: (x, y, z)</p>
        <p>缩放: (x, y, z)</p>
      </Card>
    </div>
  );
};

export default Sidebar;
