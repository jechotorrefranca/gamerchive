import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//add auth check and route role based option to avoid non-admin access

import Homepage from './pages/Homepage';
import AccessDenied from './pages/AccessDenied';
import GameInfo from './pages/GameInfo';

const router = createBrowserRouter([
  {
    path: "/",
    element: <GameInfo />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  // replace / into homepage later
  {
    path: "/accessDenied",
    element: <AccessDenied />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;