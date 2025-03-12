import { createHashRouter, Navigate } from 'react-router-dom';

import Editor from '@/pages/editor';
import Error404 from '@/pages/exception/404';
function createRoot() {
  return createHashRouter([
    {
      path: '/',
      element: <Navigate to="/editor" />,
    },
    {
      path: '/editor',
      element: <Editor />,
    },
    {
      path: '/model',
      element: <Error404 />,
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
