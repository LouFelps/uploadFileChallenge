import type { RouteObject } from 'react-router-dom';
import Home from '../../pages/home';

export default [
  {
    path: '/',
    element: <Home />,
  },
] as RouteObject[];
