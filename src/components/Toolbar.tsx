import { Button } from 'antd';
import React from 'react';

const Toolbar: React.FC = () => {
  return (
    <div style={{ padding: 10, background: '#222', color: '#fff', display: 'flex' }}>
      <Button type="primary" style={{ marginRight: 10 }}>
        新建
      </Button>
      <Button>打开</Button>
      <Button>保存</Button>
      <Button>撤销</Button>
      <Button>重做</Button>
    </div>
  );
};

export default Toolbar;
