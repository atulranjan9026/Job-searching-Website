import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingStatus.css'; // Assuming you have this CSS file for styling

const BookingStatus = () => {
    let { UserEmail } = useParams();
    const [bookings, setBookings] = useState([]);
    const [seekerDetails, setSeekerDetails] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/accept/${UserEmail}`);
                setBookings(response.data);
            } catch (error) {
                setError("Error retrieving booking details");
                console.error("Error fetching booking details:", error);
            }
        };
        fetchBookings();
    }, [UserEmail]);

    useEffect(() => {
        if (bookings.length > 0) {
            const fetchSeekerDetails = async () => {
                try {
                    const seekerEmails = bookings.map(booking => booking.email);
                    const responses = await Promise.all(seekerEmails.map(email => axios.get(`http://localhost:5000/seeker/${email}`)));
                    const details = responses.map(response => response.data);
                    setSeekerDetails(details);
                } catch (error) {
                    setError("Error retrieving seeker details");
                    console.error("Error fetching seeker details:", error);
                }
            };
            fetchSeekerDetails();
        }
    }, [bookings]);

    const handlePayment = (seeker, booking) => {
        navigate(`/payment/${booking.salary}/${booking.name}/${seeker.name}/${seeker.id}`);
        console.log(`Processing payment for ${seeker.email}`);
    };

    const handleDelete = async (salary) => {
        try {
            await axios.delete(`http://localhost:5000/accept/${salary}`);
            setBookings(bookings.filter(booking => booking.salary !== salary));
            setSeekerDetails(seekerDetails.filter(seeker => {
                const booking = bookings.find(b => b.salary === salary);
                return seeker.email !== booking?.email;
            }));
        } catch (error) {
            setError("Error deleting booking");
            console.error("Error deleting booking:", error);
        }
    };

    return (
        <div className='BookingStatus'>
            <h1>Booking Status</h1>
            {bookings.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Email</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => {
                            const seeker = seekerDetails.find(seeker => seeker.email === booking.email);
                            return (
                                <tr key={index}>
                                    {seeker ? (
                                        <>
                                            <td>{seeker.name}</td>
                                            <td>{booking.salary}</td>
                                            <td>{booking.email}</td>
                                            <td>
                                                <button className="green-button" onClick={() => handlePayment(seeker, booking)}>Pay</button>
                                            </td>
                                            <td>
                                                <button className="red-button" onClick={() => handleDelete(booking.salary)}>Delete</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>Loading...</td>
                                            <td>{booking.salary}</td>
                                            <td>{booking.email}</td>
                                            <td>
                                                <button disabled>Loading...</button>
                                            </td>
                                            <td>
                                                <button disabled>Loading...</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default BookingStatus;
