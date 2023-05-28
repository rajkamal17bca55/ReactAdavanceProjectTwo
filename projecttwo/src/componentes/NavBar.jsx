import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <div className="navbar">

            <div className="logo">
                <Link to='/homepage'><h1><i class='bx bx-home'></i></h1></Link>
            </div>

            <div className="profile">
                <Link to='/profile'><h1>Profile <i class='bx bx-menu'></i></h1></Link>
            </div>


        </div>
      );
}
 
export default NavBar;