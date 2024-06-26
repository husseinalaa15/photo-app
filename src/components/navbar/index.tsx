import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import {  Link, useNavigate } from 'react-router-dom';
import { logout } from '../../sotre/authSlice';

const Navbar = () => {
  const user = useSelector((state:any) => state.auth); // Assuming your auth state is stored in the Redux store
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const handleLogout = () => {
    dispatch(logout());
    // Redirect to the home page after logout
    return navigate('/')
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{display:"flex",alignItems:"center",padding:"10px"}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to='/'>
            <img src="/logo.png" width={"30px"} alt="photoapp" />
          </Link>
        </Typography>
        {user.id && (
          <Button color="inherit" onClick={() =>  navigate('/favorites')}>
            Favorites
          </Button>
        )}
        {user.id ? (
          <>
            {user.photoURL ? (
              <Avatar alt={user.displayName || ''} src={user.photoURL} />
            ) : (
              <Avatar>{user.email?.charAt(0).toUpperCase()}</Avatar>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() =>   navigate('/login')}>
            Login
          </Button>
        )}
      
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
