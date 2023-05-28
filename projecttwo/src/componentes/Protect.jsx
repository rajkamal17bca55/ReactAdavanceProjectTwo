import { Navigate } from "react-router-dom";

const Protect = ({Child}) => {

    function Verify() {
        if (localStorage.getItem("user") == null) {

            return false;
        } else {

            return true;
        }
    }

    return (
        <div>
            {
                Verify() ? <Child/>:<Navigate to='/login'/>

            }
        </div>
    );
}

export default Protect;