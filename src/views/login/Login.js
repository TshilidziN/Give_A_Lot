import React, {useState,useContext} from 'react';
import {Link, useHistory,Redirect} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import backgroundImg from "../../assets/homeBackground.jpg";
import Logo from "./Components/Logo";
import axios from "axios"
import "./Styles/Login.css";
import {Alert} from "@material-ui/lab";

import {ApiContext} from "../../apiContext/ApiContext";
import {FrontEndContext} from "../../apiContext/FrontEndContext";
import {TextField} from "@material-ui/core";

const styles = {
    main: {
        backgroundImage: `url(${backgroundImg})`

    }
}

function Login ()
{
    let history = useHistory();
    const [email_error_message,set_email_error_message] = useState("");
    const [password_error_message,set_password_error_message] = useState("");
    const [serverDomain, setServerDomain] = useState(useContext(ApiContext));
    const [frontEndDomain, setFrontEndDomain] = useState(useContext(FrontEndContext));


    const validate_email_address = event =>
    {
        event.preventDefault();
    }

    const determine_current_user_login = event =>
    {
        event.preventDefault();
        localStorage.clear();
        let login_user_email = document.getElementById("login_user_email").value.toString();
        let login_user_password = document.getElementById("login_user_password").value.toString();

        if(!login_user_email.includes("@") || login_user_email.length === 0)
        {
            set_email_error_message("email is required")
        }

        if(login_user_password.length === 0)
        {
            set_password_error_message("password is required")
        }
        else
        {
            const data = {
                "username" : login_user_email,
                "password" : login_user_password,
                "role" : ""
            }

            document.getElementById("waitInfo").style.display = "flex";
            document.getElementById("badLogin").style.display = "none";
            document.getElementById("serverError").style.display = "none";

            axios.post(serverDomain + '/v1/login/user/determine', data)
            .then(response =>
            {
                localStorage.setItem( "id" ,response.data.id);
                localStorage.setItem( "role" ,response.data.jwttoken)
                localStorage.setItem( "curr_user_email" ,response.data.curr_user_email)

                if(response.data.jwttoken === "general")
                {

                    document.getElementById("waitInfo").style.display = "none";
                    window.location.href = frontEndDomain + "/";
                }
                else if(response.data.jwttoken === "admin")
                {
                    document.getElementById("waitInfo").style.display = "none";
                    window.location.href = frontEndDomain + "/featured/";
                }
                else if(response.data.jwttoken === "organisation")
                {
                    document.getElementById("waitInfo").style.display = "none";
                    window.location.href = frontEndDomain + "/profile/";
                }
            })
            .catch(error =>{
                if(error.response)
                {
                    console.log(error.response)
                    if(error.response.data.message.includes("organisation not found") || error.response.data.message.includes("user password is incorrect"))
                    {
                        document.getElementById("badLogin").style.display = "flex";
                        document.getElementById("waitInfo").style.display = "none";
                    }
                    else
                    {
                        document.getElementById("serverError").style.display = "flex";
                        document.getElementById("waitInfo").style.display = "none";

                    }
                }
                else
                {
                    document.getElementById("serverError").style.display = "flex";
                    document.getElementById("waitInfo").style.display = "none";

                }
            })
        }
    };


    return (
        <div>
            <div className="Login" style={styles.main}>
                <div  id={"banner_filter"}>
                    <Logo/>
                    <Link to={"/"}>
                        <ArrowBackIcon style={{color: "white", marginLeft: "30px", fontSize: "xx-large"}}/>
                    </Link>
                    <div className="LoginCard">
                        <Alert severity="error" id={"badLogin"}>incorrect username or password!</Alert>
                        <Alert severity="error" id={"serverError"}>server error...</Alert>
                        <Alert severity="info" id={"waitInfo"}>signing in...</Alert>
                        <div className="wrapper">
                            <form className="LoginForm" onSubmit={determine_current_user_login}>
                               <span className="LoginHeader">
                                   Sign in
                               </span>

                                <div className="LoginInput" data-validate="Username is required">
                                    <span className="LoginInputLabel">
                                        Email
                                    </span>

                                    <TextField
                                        id="login_user_email"
                                        className="innerInput validate"
                                        type="email"
                                        name="email"
                                        variant={"outlined"}
                                        placeholder="Enter your email"
                                        onChange={validate_email_address}
                                    />

                                    <span className="loginError">{email_error_message}</span>
                                </div>
                                <div className="LoginInput" data-validate="Username is required">
                                    <span className="LoginInputLabel">
                                        Password
                                    </span>

                                    <TextField
                                        id={"login_user_password"}
                                        className="innerInput validate"
                                        type="password"
                                        name="password"
                                        variant={"outlined"}
                                        placeholder="Enter your password"
                                    />

                                    <span className="loginError">{password_error_message}</span>
                                </div>

                                <div className="wrapper-btn">
                                    <button className="Login-btn" id={"loginBTN_less_rounded"} type="submit">
                                        Login
                                    </button>
                                </div>

                                <div className="BottomForm">
                                    <Link to={"/signUp"} className="BottomLinker">
                                        <span> Need an account?</span>
                                    </Link>

                                    <Link to={"/Password"} className="BottomLinker">
                                        <span> Forgot password?</span>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
