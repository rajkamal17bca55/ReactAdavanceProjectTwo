import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    let email = useRef();
    let password = useRef();
    let Navs = useNavigate();
    function Valid(e) {
        e.preventDefault();

        fetch("http://localhost:3000/users")
            .then((res) => { return res.json() })
            .then((data) => {

                let user = data.find((v) => { return v.email === email.current.value });

                if (user == undefined) {
                    alert("email not valid")
                } else if (user.password !== password.current.value) {
                    alert("password not valid");
                } else {
                   
                    alert("login sucessfull");
                    Navs('/homepage');

                     localStorage.setItem("user", JSON.stringify(user));
                   
                  
                }

            })




    }
    return (
        <div className="loginpage">
            <h1>Login Page</h1>

            <form onSubmit={(e)=>{Valid(e)}}>
            <input type="email" placeholder="Enter Email" ref={email} required />
            <input type="password" placeholder="Enter Password" ref={password} required />
           
            <input type="submit" value="Login" />
            <br /><span>Dont have an account?</span>
            </form>
            

        </div>
    );
}

export default Login