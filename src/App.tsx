import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import './App.css';
import { Box } from '@mui/material';
import Navbar from './components/navbar';
import Login from './pages/login/login';
import ErrorPage from './err';
import SignUp from './pages/signup/signup';
import HomePage from './pages';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './sotre/authSlice';
import FavoritesLanding from './pages/favorites';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const MainLayout = () => (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: 'primary.common',
          padding: '0px 25px',
        }}
      >
        <Outlet />
      </Box>
    </>
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/login', element: <Login /> },
        { path: '/registeration', element: <SignUp /> },
        { path: '/favorites', element: <FavoritesLanding /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
