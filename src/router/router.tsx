import { createBrowserRouter, Navigate } from 'react-router-dom';

import Editor from '@/pages/editor';
import Error404 from '@/pages/exception/404';
import Model from '@/pages/model';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Editor />,
  },
  {
    path: '/editor',
    element: <Editor />,
  },
  {
    path: '/model',
    element: <Model />,
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
