import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Navbar from "../ticketbooker/Navbar";
import { Link } from "react-router-dom";
const Home = () => {
   
    return (
        <div className="home">
            <Navbar></Navbar>
            <div className="busflight">
            <div className="bus">
            <Link to="/busbook"><button >Bus Booking</button></Link>
            </div>
            <div className="flighs">
            <button>Flight Booking</button>
            </div>
            </div>
        </div>
    );
}

export default Home;