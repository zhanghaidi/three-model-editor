import { Collapse, CollapseProps } from 'antd';
import React from 'react';

import styles from '@/styles/sidebarProject.module.scss';

import SidebarProjectEffects from './SidebarProjectEffects';
import SidebarProjectRenderer from './SidebarProjectRenderer';

const SidebarProject: React.FC = () => {
  const items: CollapseProps['items'] = [
    {
      key: 'renderer',
      label: <span className={styles.title}>渲染器</span>,
      children: <SidebarProjectRenderer />,
    },
    {
      key: 'effects',
      label: <span className={styles.title}>特效</span>,
      children: <SidebarProjectEffects />,
    },
  ];
  return (
    <Collapse
      items={items}
      defaultActiveKey={['renderer', 'effects']}
      expandIconPosition="end"
      className={styles.sidebarProject}
    />
  );
};

export default SidebarProject;
