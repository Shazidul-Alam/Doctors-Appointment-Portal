import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import BookingModal from '../BookingModal/BookingModal';


const Booking = ({ booking,date,setBookingSuccess }) => {
    const [openBooking, setBookingOpen] = React.useState(false);
    const handleBookingOpen = () => setBookingOpen(true);
    const handleBookingClose = () => setBookingOpen(false);
    return (

        <>
        <Grid item xs={12} sm={6} md={4} >
            <Paper elevation={3} sx={{py:5}}>
                <Typography sx={{color:'info.main',fontWeight:600}} variant="h5" gutterBottom component="div">
                    {booking.name}
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    {booking.time}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    {booking.space} Apppointment Available
                </Typography>
                <Button onClick={handleBookingOpen} variant="contained"> Book Appointment</Button>
            </Paper>
        </Grid>
        <BookingModal
        date={date}
        booking={booking}
        openBooking={openBooking}
        handleBookingClose={handleBookingClose}
        setBookingSuccess={setBookingSuccess}
        >

        </BookingModal>
        </>


    );
};

export default Booking;