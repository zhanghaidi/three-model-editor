import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Viewport from '@/components/Viewport';

import styles from './index.module.scss';

export default function Editor() {
  return (
    <div className={styles.editor}>
      <Header />
      <div className={styles.main}>
        <Viewport />
        <Sidebar />
      </div>
    </div>
  );
}
