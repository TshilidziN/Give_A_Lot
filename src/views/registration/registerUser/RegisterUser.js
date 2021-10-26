import React, { Component } from "react";
import {Link, useHistory} from "react-router-dom";
import "./Styles/RegisterUser.css";
import backgroundImg from "../../../assets/homeBackground.jpg";
import Logo from "../../login/Components/Logo";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import {Alert} from "@material-ui/lab";

import {ApiContext} from "../../../apiContext/ApiContext";
import {TextField} from "@material-ui/core";

const styles = {
    main: {
        backgroundImage: `url(${backgroundImg})`
    }
}

class RegisterUser extends Component {

    static contextType = ApiContext;

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        fnameError: "",
        lnameError: "",
        emailError: "",
        passwordError: "",
        serverDomain : this.context
    };

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    validate = () => {
        let fnameError = "";
        let lnameError = "";
        let emailError = "";
        let passwordError = "";

        if (!this.state.firstName) {
            fnameError = "first name is required";
        }
        if (!this.state.lastName) {
            lnameError = "Last name is required";
        }

        if (!this.state.email.includes("@")) {
            emailError = "invalid email";
        }

        if(this.state.password.length <8) {
            passwordError="passwords must be 8 characters long and above";
        }

        if (emailError || fnameError|| lnameError || passwordError) {
            this.setState({ emailError, fnameError,lnameError, passwordError });
            return false;
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();


        const isValid = this.validate();

        if (isValid)
        {
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            };

            document.getElementById("emailError").style.display = "none";
            document.getElementById("registrationInfoPrompt").style.display = "none";
            document.getElementById("registrationInfoPromptWait").style.display = "flex";
            axios.post(this.state.serverDomain + '/v1/user/register/user', data)
                .then(response =>
                {
                    if(response)
                    {
                        if(response.data.message.includes("success"))
                        {
                            document.getElementById("registrationInfoPromptWait").style.display = "none";
                            document.getElementById("registrationInfoPrompt").style.display = "flex";
                            setTimeout(function(){
                                window.location.assign("/login");
                            }, 3000);
                        }
                        else
                        {
                            alert(response.data.message);
                        }
                    }
                })
                .catch(error =>{
                    if(error.response)
                    {
                        console.log(error.response)
                        if(error.response.data.message.includes("the_email_already_been_taken"))
                        {
                            document.getElementById("registrationInfoPromptWait").style.display = "none";
                            document.getElementById("registrationInfoPrompt").style.display = "none";
                            document.getElementById("emailError").style.display = "flex";
                        }
                        else
                        {

                        }
                    }
                    else
                    {
                        console.error(error)
                    }
                })
        }
    };

    render() {
        return (
            <div>
                <div className="registerUser" style={styles.main}>
                    <div  id={"banner_filter"}>
                        <Logo/>
                        <Link to={"/signUp"}>
                            <ArrowBackIcon style={{color: "white", marginLeft: "30px", fontSize: "xx-large"}}/>
                        </Link>
                        <div className="registerUserCard">
                            <Alert severity="error" id={"emailError"}>the provided email is already taken...</Alert>
                            <Alert severity="success" id={"registrationInfoPrompt"}>registration complete - please wait for redirection</Alert>
                            <Alert severity="info" id={"registrationInfoPromptWait"}>please wait...</Alert>
                            <div className="wrapp">
                                <form className="registerUserForm" onSubmit={this.handleSubmit}>
                               <span className="registerUserHeader">
                                   Sign Up
                               </span>
                                    <div className="names">
                                        <div className="registerUserInput1" data-validate="Username is required">
                                        <span className="registerUserInputLabel">
                                            First Name
                                        </span>
                                            <div>
                                                <TextField
                                                    className="nameFields validate"
                                                    type="text"
                                                    name="firstName"
                                                    variant={"outlined"}
                                                    placeholder="Enter your first name"
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <span className="error">{this.state.fnameError}</span>
                                        </div>

                                        <div className="registerUserInput1" data-validate="Username is required">
                                    <span className="registerUserInputLabel">
                                        Last Name
                                    </span>
                                            <div>
                                                <TextField
                                                    className="nameFields validate"
                                                    type="text"
                                                    name="lastName"
                                                    variant={"outlined"}
                                                    placeholder="Enter your last name"
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <span className="error">{this.state.lnameError}</span>
                                        </div>

                                    </div>

                                    <div className="registerUserInput" data-validate="surname is required">
                                    <span className="registerUserInputLabel">
                                        Email
                                    </span>
                                        <div>
                                            <TextField
                                                className="registerUserInnerInput validate"
                                                type="email"
                                                name="email"
                                                variant={"outlined"}
                                                placeholder="Enter your Email"
                                                // value={this.state.email}
                                                onChange={this.handleChange}/>

                                        </div>
                                        <span className="error">{this.state.emailError}</span>
                                    </div>


                                    <div className="registerUserInput" data-validate="Username is required">
                                    <span className="registerUserInputLabel">
                                        Password
                                    </span>

                                        <TextField
                                            className="registerUserInnerInput validate"
                                            type="password"
                                            name="password"
                                            minLength="8"
                                            variant={"outlined"}
                                            placeholder="Enter your password"
                                            onChange={this.handleChange}
                                        />

                                        <span className="error">{this.state.passwordError}</span>
                                    </div>

                                    <div className="wrapp-btn">
                                        <button className="registerUser-btn" type="submit" onClick={this.handleSubmit}>
                                            Sign Up
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
export default RegisterUser;
