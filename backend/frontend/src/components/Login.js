import React, {useState, useContext} from 'react';
import loginpic from "../images/login.svg";
import { NavLink, useHistory } from "react-router-dom";

import {UserContext} from "../App";

const Login = () => {
    const { state, dispatch } = useContext(UserContext);
    
    const history = useHistory();
    const [email, setEmail] = useState('');         //initially empty
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();  // removes by default reloadation of form.

        const res = await fetch('/signin', {            //sending data to the backend in(signin route)
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },                                      //server doesnot understand json so convert it into string using stringify.
            body: JSON.stringify({  email,password })
        });

        const data = await res.json();    // getting data

        if (res.status === 400 ) {
            window.alert("Invalid Credentials");
        } else if (res.status === 422 || !data) {
            window.alert("Please fill the details");}
        else {
            dispatch({ type: 'USER', payload: true });
            window.alert("Login Successfull");
            history.push("/");
        }
    }

    return (
        <>
             <section className="sign-in">
                <div className="container mt-5">
                    <div className="signin-content">
                          
                            <div className="signin-image">
                                <figure>
                                    <img src={loginpic} alt="Login pic" />
                                </figure>
                                <NavLink to="/signup" className="signup-image-link">Create an Account</NavLink>
                            </div>
                       
                        <div className="signin-form">
                            <h2 className="form-title">Sign in</h2>
                            <form method="POST" className="register-form" id="register-form">
                             

                                 <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}   //set current email
                                        placeholder="Your Email"
                                    />
                                </div>


                                 <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Your Password"
                                    />
                                </div>

                              
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit"
                                        value="Log In"
                                        onClick={loginUser}  //sending data
                                    />
                                </div>

                            </form>
                        </div>
                      
                    </div>
                </div>
           </section>
       </>
    )
}

export default Login
