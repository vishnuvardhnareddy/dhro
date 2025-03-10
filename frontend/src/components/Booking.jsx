import React from 'react';

const OnlineCourseBooking = () => {
    const styles = {
        container: {
            width: '1300px',
            margin: '25px auto', // Centers the component horizontally
            textAlign: 'center',
            marginBottom: '25px'
        },
        heading: {
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: 'white'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Booking-Section</h1>
            <p>Online Course Booking</p>
        </div>
    );
}

export default OnlineCourseBooking;
