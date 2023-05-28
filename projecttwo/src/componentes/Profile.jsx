import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import Navbar from "../ticketbooker/Navbar";
import PacmanLoader from 'react-spinners/PacmanLoader'
import trip from '../ticketbooker/image/trip.jpg'
import Modal from 'react-modal';

const customStyle = {
    content: {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    },
}


const Profile = () => {
    let [user, setUser] = useState(null);
    let navs = useNavigate();

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


    const [modalIsOpen1, setIsOpen1] = useState(false);

    function openModal1() {
        setIsOpen1(true);
    }

    function afterOpenModal1() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal1() {
        setIsOpen1(false);
    }
    //==========================================================



    useEffect(() => {
        setTimeout(() => {
            setUser(JSON.parse(localStorage.getItem("user")));

        }, 3000)
    }, [])

    function logout() {
        localStorage.removeItem("user");
        navs("/login")

    }

    function DeleteAccount() {
        let del = prompt("If you want delete account provide password");
        if (del == user.password) {
            fetch(`http://localhost:3000/users/${user.id}`,
                {
                    method: "Delete"

                }).then(() => {
                    localStorage.removeItem("user");
                    navs("/")
                    alert("Account deleted sucessfully");


                })

        } else {
            alert("password missmatch");
        }

    }


    return (
        <div>
            <Navbar></Navbar>
            {
                user ?

                    <div className="userprofile">
                        <h1>User Profile</h1>
                        

                        <div className="coverpic"><img src={trip} /></div>
                        <div className="prfimg"><img src={user.pic} alt="" srcset="" height="200px" width="200px" /></div>
                        <button onClick={logout} id="logbt">Logout</button>
                        <button onClick={DeleteAccount}>Delete</button>
                        <br /><br />


                        <h3>UserName :{user.username}</h3>
                        <h3>Useremail :{user.email}</h3>
                        <h3>UserPhone :{user.phone}</h3>
                        <h3>UserDob :{user.dob}</h3>
                        <hr />
                        <br /><br />
                        <label>Total Booking :</label><button>{user.active_bookings.length + user.previous_bookings.length}</button>
                        <label>Active Ticket :</label><button onClick={openModal}>View</button>

                        <label>Previous Ticket :</label><button onClick={openModal1}>View</button><br /><br />

                        <Modal className="active_popcomponent"
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyle}
                            contentLabel="Example Modal"
                        >
                            <div >
                                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Active Tickets</h2>
                                <hr /><hr />
                                <button onClick={closeModal} className="clsbt"><i class='bx bx-window-close'></i></button>
                                <div className="active_page">
                                    {
                                        user.active_bookings.map((tick) => {
                                            return (
                                                <div className="active_book">
                                                    <label>busname : </label><span>{tick.busname}</span><br />
                                                    <label>busnumber : </label><span>{tick.busnumber}</span><br />
                                                    <label>seats : </label><span>{tick.seats}</span><br />
                                                    <label>from : </label><span>{tick.from}</span><br />
                                                    <label>to : </label><span>{tick.to}</span><br />
                                                    <label>boarding_time : </label><span>{tick.boarding_time}</span><br />
                                                    <label>departure_time : </label><span>{tick.departure_time}</span><br />
                                                    <label>journey_time : </label><span>{tick.journey_time}</span><br />
                                                    <label>price : </label><span>{tick.price}</span><br />
                                                    <label>date : </label><span>{tick.date}</span><br />
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>

                        </Modal>

                        <Modal className="active_popcomponent"
                            isOpen={modalIsOpen1}
                            onAfterOpen={afterOpenModal1}
                            onRequestClose={closeModal1}
                            style={customStyle}
                            contentLabel="Example Modal"
                        >
                            <div >
                                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Previous Booking</h2>
                                <hr /><hr />
                                <button onClick={closeModal1} className="clsbt"><i class='bx bx-window-close'></i></button>
                                <div className="active_page">
                                    {
                                        user.previous_bookings.map((tick) => {
                                            return (
                                                <div className="active_book">
                                                    <label>busname : </label><span>{tick.busname}</span><br />
                                                    <label>busnumber : </label><span>{tick.busnumber}</span><br />
                                                    <label>seats : </label><span>{tick.seats}</span><br />
                                                    <label>from : </label><span>{tick.from}</span><br />
                                                    <label>to : </label><span>{tick.to}</span><br />
                                                    <label>boarding_time : </label><span>{tick.boarding_time}</span><br />
                                                    <label>departure_time : </label><span>{tick.departure_time}</span><br />
                                                    <label>journey_time : </label><span>{tick.journey_time}</span><br />
                                                    <label>price : </label><span>{tick.price}</span><br />
                                                    <label>date : </label><span>{tick.date}</span><br />
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>

                        </Modal>



                    </div> : <PacmanLoader color="crimson" id="pm" />
            }



        </div>
    );
}

export default Profile;