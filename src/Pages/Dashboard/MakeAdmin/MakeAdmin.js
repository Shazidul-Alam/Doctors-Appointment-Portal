import { Alert, Button, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('')
    const [success,setSuccess] = useState(false)
    const{token}=useAuth()
    const handleAdminSubmit = e => {
        const user={email}
        console.log('hey',user);
        fetch('http://localhost:5500/users/admin',{
            method:'PUT',
            headers:{
                'authorization':`Bearer ${token}`,
                'content-type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data=>{
            if(data.modifiedCount){
                console.log(data);
                setSuccess(true)
            }
            
        })
        e.preventDefault();
    }
    const handleBlur=e=>{
        setEmail(e.target.value);
    }
    return (
        <div>
            <h1>Hello Admin Bhaishab</h1>
            <form align='center' onSubmit={handleAdminSubmit}>
                <TextField
                    sx={{ width: '55%', m: 1 }}
                    label="email"
                    type="email"
                    onBlur={handleBlur}
                    variant="standard" />
                <br />
                <Button sx={{mt:2}} type="submit" variant='contained'>Make Admin</Button>
            </form>
            {success && <Alert severity="success"> Admin Made Successfully</Alert>}
        </div>
    );
};

export default MakeAdmin;