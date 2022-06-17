import { Container, Typography, Button, CircularProgress, Alert } from '@mui/material';
import React,{useState} from 'react';
import  Grid  from '@mui/material/Grid';
import loginimg from '../../../images/login.png'
import  TextField  from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
    const [loginData,setLoginData]=useState({})
    const {user,login,isLoading,authError}=useAuth()

    const location=useLocation()
    const history=useHistory()

    const handleOnChange=e=>{
        const field=e.target.name;
        const value=e.target.value;
        const newLoginData={...loginData}
        newLoginData[field]=value;
        setLoginData(newLoginData)
    }

    const handleLoginSubmit=e=>{
        login(loginData.email,loginData.password,location,history)
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{mt:25}}>
                <Typography  variant="h5" gutterBottom>Login</Typography>
                <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onChange={handleOnChange}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            variant="standard" />

                        <Button sx={{ width: '75%', m: 2 }} type="submit" variant="contained">Login</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/register">
                            <Button sx={{ml:1}} variant="text">New User? Please Register</Button>
                        </NavLink>
                   </form>
                   {isLoading && <CircularProgress></CircularProgress>}
                   {user?.email && <Alert severity="success">Successfully LoggedIn</Alert> }
                   {authError && <Alert severity="error">{authError}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                   <img src={loginimg} style={{width: '100%'}} alt="" />
                </Grid>
                
            </Grid>
        </Container>
    );
};

export default Login;