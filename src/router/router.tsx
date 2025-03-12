import { createHashRouter, Navigate } from 'react-router-dom';

import { ThreeEditor } from '@/components/ThreeEditor/ThreeEditor';
import Error404 from '@/pages/exception/404';
import Home from '@/pages/home';
function createRoot() {
  return createHashRouter([
    {
      path: '/',
      element: <Navigate to="/home" />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/editor',
      element: <ThreeEditor />,
    },

    {
      path: '*',
      element: <Navigate to="/404" />,
    },
    {
      path: '/404',
      element: <Error404 />,
    },
  ]);
}

const router = createRoot();
export { router };
