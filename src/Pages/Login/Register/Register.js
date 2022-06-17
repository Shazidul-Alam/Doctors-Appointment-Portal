import { Container, Typography, Button, CircularProgress, Alert } from '@mui/material';
import React,{useState} from 'react';
import  Grid  from '@mui/material/Grid';
import login from '../../../images/login.png'
import  TextField  from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const [loginData,setLoginData]=useState({})
    

    const {user,registerUser,isLoading,authError}=useAuth()
    


    const handleOnChange=e=>{
        const field=e.target.name;
        const value=e.target.value;
        const newLoginData={...loginData}
        newLoginData[field]=value;
        console.log(newLoginData);
        setLoginData(newLoginData)
        

    }

    const handleLoginSubmit=e=>{
        if(loginData.password !== loginData.password2){
            alert('Password is incorrect')
            return
        }
        registerUser(loginData.email, loginData.password)
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{mt:25}}>
                <Typography  variant="h5" gutterBottom>Registration</Typography>
                {!isLoading &&<form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            type='email'
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
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Retype Your Password"
                            type="password"
                            name="password2"
                            onChange={handleOnChange}
                            variant="standard" />

                        <Button sx={{ width: '75%', m: 2 }} type="submit" variant="contained">Register</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/login">
                            <Button sx={{ml:14}} variant="text">Already Registered? Please Login</Button>
                        </NavLink>
                   </form>}
                   {isLoading && <CircularProgress></CircularProgress>}
                   {user?.email && <Alert severity="success">Successfully Created</Alert> }
                   {authError && <Alert severity="error">{authError}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                   <img src={login} style={{width: '100%'}} alt="" />
                </Grid>
                
            </Grid>
        </Container>
    );
};

export default Register;