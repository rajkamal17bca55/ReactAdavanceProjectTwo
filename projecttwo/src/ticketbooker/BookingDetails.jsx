import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../componentes/NavBar";
import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
import { Navigate } from "react-router-dom";
import ToasterUi from 'toaster-ui';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const BookingDetails = () => {

    let { id1 } = useParams();
    let [id, dates] = id1.split(" ");

    let [booking, setBooking] = useState(null);
    let [ticketcount, setTicketcount] = useState(1);
    let [users, setUsers] = useState(" ");
    let navs = useNavigate();
    const toaster = new ToasterUi();

    //===========================================================

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    //==========================================================

    

    useEffect(() => {
        fetch("http://localhost:3002/bus/" + id)
            .then((res) => { return res.json() })
            .then((data) => { setBooking(data) })

        setUsers(JSON.parse(localStorage.getItem("user")))


    }, [])

    function handlebook() {
        let ticket = {
            busname: booking.busname,
            busnumber: booking.busnumber,
            seats: ticketcount,
            from: booking.from,
            to: booking.to,
            boarding_time: booking.start,
            departure_time: booking.end,
            journey_time: booking.journey_time,
            price: ticketcount * booking.price,
            date: dates
        }

        let updateuser = { ...users, active_bookings: [...users.active_bookings, ticket] }

        fetch("http://localhost:3000/users/" + users.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateuser)
        })

        let updatebus = { ...booking, booked_seats: Number(booking.booked_seats) + Number(ticketcount) }


        fetch("http://localhost:3002/bus/" + booking.id, {

            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatebus)


        }).then(() => {
            localStorage.setItem("user", JSON.stringify(updateuser))
            closeModal();
            toaster.addToast("ticket added");
            navs("/profile");

        })


    }


    return (
        <div>
            <Navbar></Navbar>
            <div className="bookpage">
                {

                    booking && <div id='lab'>

                        <h1>Journy from {booking.from} to {booking.to}</h1>
                        <hr /><hr />
                        <div>
                            <label className="booklb">BusNumber : </label>
                            <span className="booklabel"> : {booking.busnumber}</span>
                        </div>

                        <br />
                        <div>
                            <label className="booklb">BusType : </label>
                            <span className="booklabel"> : {booking.type}</span>
                        </div>
                        <br />




                        <div> <span className="booklb">Boarding :</span><label className="booklabel">{booking.from}-{booking.start}</label></div><br />
                        <div><span className="booklb">Destination :</span><label className="booklabel">{booking.to}-{booking.end}</label></div><br />
                        <div><span className="booklb">TotalSeats:</span><label className="booklabel">{booking.seats}</label></div><br />
                        <div><span className="booklb">AvailableSeats:</span><label className="booklabel">{booking.seats - booking.booked_seats}</label></div>
                        <br />
                        <div> <span className="booklb">TicketPrice :</span><label className="booklabel">{ticketcount * booking.price}Rs</label></div>
                        <br />
                        <input type="number" placeholder="number of ticket" min="1" max={booking.seats - booking.booked_seats} value={ticketcount} onChange={(e) => { setTicketcount(e.target.value) }} />
                        <br /><br />



                        <button onClick={openModal} id='cnnbook' disabled={booking.seats == booking.booked_seats}>BookTicket</button>

                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <div id="popcomponent">
                                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Booking Details</h2>
                                <hr /><hr />
                                <button onClick={closeModal} id="closee"><i class='bx bx-window-close'></i></button>
                                <div>
                                    <h3>Passenger :{users.username}</h3>
                                    <h3>Phone :{users.phone}</h3>
                                    <h3>Bus_name :{booking.busname}</h3>
                                    <h3>Date Of Journy :{dates}</h3>
                                    <h3>{booking.from}-{booking.start} to {booking.end}-{booking.to}</h3>
                                    <h3>No.Passenger :{ticketcount} - Price :{ticketcount * booking.price}Rs</h3>
                                    <input type="number" placeholder="Enter Amount" /><br /><br />
                                    <button onClick={handlebook} id='cnbook'>Confirm Booking</button>
                                </div>
                            </div>

                        </Modal>


                    </div>






                }
            </div>

        </div>
    );
}

export default BookingDetails;