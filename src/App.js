import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//add auth checker and route based options

import Homepage from './components/pages/Homepage';
import AccessDenied from './components/pages/AccessDenied';

const router = createBrowserRouter([
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/accessDenied",
    element: <AccessDenied />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;