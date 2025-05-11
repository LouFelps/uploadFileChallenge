import {
  RouterProvider, createBrowserRouter, Outlet, type RouteObject,
} from 'react-router-dom';
import home from './home';

const routes = [{
  path: '',
  element: (
    <>
      <Outlet />
    </>

  ),
  children: [
    ...home,
  ],
}] as RouteObject[];

export default function RoutesApp() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Outlet />
      ),
      children: [
        ...routes,
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}
