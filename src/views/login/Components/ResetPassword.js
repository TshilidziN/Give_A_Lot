import React, {Component} from 'react';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import backgroundImg from "../../../assets/homeBackground.jpg";
import Logo from "./Logo"
import axios from "axios"
import "../Styles/Login.css"
import {Alert} from "@material-ui/lab";

const styles = {
    main: {
        backgroundImage: `url(${backgroundImg})`
    }
}

const initialState = {
    userEmail: "",
    emailError: "",
    password: "",
    passwordError: "",
};

class ResetPassword extends Component {

    state = initialState;

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    validate = () => {
        let emailError = "";
        let passwordError = "";

        if (!this.state.userEmail.includes("@")) {
            emailError = "invalid email";
        }
        if(!this.state.password.length ) {
            passwordError="Password is required";
        }


        if ( emailError || passwordError ) {
            this.setState({ emailError ,  passwordError });
            return false;
        }

        return true;
    };


    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);

            const data = {
                password : this.state.password,
                userEmail: this.state.userEmail.toLowerCase(),


            };
            document.getElementById("waitInfo").style.display = "flex";
            document.getElementById("badLogin").style.display = "none";
            axios.post("http://localhost:8080/v1/login/user/update_password", data)
                .then(res => {
                    console.log(res)
                    if (res.data.success === true) {

                        this.props.history.push("/ResetSuccess");
                        document.getElementById("waitInfo").style.display = "none";

                    } else {
                        document.getElementById("badLogin").style.display = "flex";
                        document.getElementById("waitInfo").style.display = "none";
                    }
                })
                .catch(err => {
                    console.log(err)
                    document.getElementById("badLogin").style.display = "flex";
                    document.getElementById("waitInfo").style.display = "none";
                });
        }
    };

    render()
    {
        return (
            <div>
                <div className="Login" style={styles.main}>
                    <div  id={"banner_filter"}>
                        <Logo/>
                        <Link to={"/Login"}>
                            <ArrowBackIcon style={{color: "white", marginLeft: "30px", fontSize: "xx-large"}}/>
                        </Link>
                        <div className="LoginCard">
                            <Alert severity="error" id={"badLogin"}>password reset failed!</Alert>
                            <Alert severity="info" id={"waitInfo"}>Updating password...</Alert>
                            <div className="wrapper">
                                <form className="LoginForm" onSubmit={this.handleSubmit}>
                       <span className="LoginHeader">
                           Enter new password
                       </span>
                                    <span className="Instruction">
                           Enter your email and a new password
                       </span>
                                    <div className="LoginInput" data-validate="Username is required">
                                <span className="LoginInputLabel">
                                    Email
                                </span>
                                        <div>
                                            <input
                                                className="innerInput validate"
                                                type="email"
                                                name="userEmail"
                                                placeholder="Enter your email"
                                                onChange={this.handleChange}
                                            />

                                        </div>
                                        <span className="loginError">{this.state.emailError}</span>
                                    </div>
                                    <div className="LoginInput" data-validate="Username is required">
                                <span className="LoginInputLabel">
                                    New Password
                                </span>
                                        <div>
                                            <input
                                                className="innerInput validate"
                                                type="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                onChange={this.handleChange}
                                            />

                                        </div>
                                        <span className="loginError">{this.state.passwordError}</span>
                                    </div>

                                    <div className="wrapper-btn">

                                        <button className="Login-btn" id={"loginBTN_less_rounded"} type="submit" onClick={this.reset}>
                                            Submit password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPassword;
