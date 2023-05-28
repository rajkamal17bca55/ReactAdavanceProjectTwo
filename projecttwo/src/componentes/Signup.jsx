import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {

    let [verify, setVerify] = useState(false);
    let navigate = useNavigate();
    let [pwd, setPwd] = useState(false);
    let [dobb, setdobb] = useState(false);

    let username = useRef();
    let email = useRef();
    let password = useRef();
    let confirmpassword = useRef();
    let phone = useRef();
    let dob = useRef();
    let pic=useRef();

    useEffect(()=>{
        if(localStorage.getItem("user")!=null)
        {
            navigate("/homepage");
        }
    },[])


    function Verify() {
        
        setTimeout(() => {
            setVerify(true);
        }, 3000)


    }

    function AddUser(e) {
        e.preventDefault();

        let option=document.getElementsByName("gender");
        let gender;
        
        for(let i=0;i<option.length;i++)
        {
           if(option[i].checked==true)
           {
            gender=option[i].value;
           }
        }
        

        if (password.current.value != confirmpassword.current.value) {
            setPwd(true)
            return
        }

        if (new Date() <= new Date(dob.current.value)) {
            setdobb(true);
            return

        }
        let newuser = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
            phone: phone.current.value,
            dob: dob.current.value,
            gender:gender,
            pic:pic.current.value,
            active_bookings:[],
            previous_bookings:[]

        }

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newuser)
        }).then(() => {
            alert("Account Created SucessFully");
            navigate("/login")

        })



    }


    return (
        <div className="signup-cont" align="center">
            <h1>signup page</h1>
            <form onSubmit={(e) => { AddUser(e) }}>
                <input type="text" placeholder="Eneter User Name " ref={username} required />
                <input type="email" placeholder="Eneter User Email " ref={email} required />
                {pwd && <span>password mismatch</span>}
                <input type="password" placeholder="Eneter User Password " ref={password} required />
                <input type="text" placeholder="Eneter Confirm Password " ref={confirmpassword} required />
                <input type="tel" placeholder="Eneter User Phone Number " min="10" max="10" ref={phone} required />
                {dobb && <span>Date of birth  not valid</span>}
                <input type="date" ref={dob} />
                <input type="url" placeholder="enter profile pic" ref={pic} required/>
                <fieldset id="gender">
                    <legend>Gender</legend>
                    <label>Male </label>
                    <input type="radio" value="male" name="gender" />
                    <label>Female </label>
                    <input type="radio" value="female" name="gender" />
                    <label>Others </label>
                    <input type="radio" value="others" name="gender" />
                </fieldset>
               
                <input type="submit" value="Signup" disabled={verify ? false : true} style={verify ? { backgroundColor: "green" } : { backgroundColor: "white" }} />

            </form>
            <Link to="/login" id='signbyyton'><button> Sign in</button></Link>
            <button onClick={Verify}>Verify</button><br />
            <span>Before click  submit verify </span>
        </div>
    );
}

export default Signup;