import { Link } from "react-router-dom";
const Navbar = () => {
    return (


        <div className="navbars">

            <div className="logos">
            <Link to='/homepage'> <h1><i class='bx bx-home'></i></h1></Link>
            </div>

           
            <div className="Bookflight">
            <div className="Book">
                <button>Bus</button>
            </div>

            <div className="flight">
            <button>Flight</button>
            </div>
            </div>

            <div className="active">
                <button>Active</button>
            </div>
            

            <div className="profiles">
            <Link to='/profile'><h1>Profile <i class='bx bx-menu'></i></h1></Link>
            </div>

            
            </div>
        

    );
}

export default Navbar
