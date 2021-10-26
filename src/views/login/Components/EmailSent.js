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
    token: "",
    tokenError: "",
};

class EmailSent extends Component {

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
        let tokenError = "";

        if (!this.state.token) {
            tokenError = "token required";
        }


        if ( tokenError ) {
            this.setState({ tokenError });
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
                token: this.state.token,

            };
            localStorage.clear();
            document.getElementById("waitInfo").style.display = "flex";
            document.getElementById("badLogin").style.display = "none";
            axios.post("http://localhost:8080/v1/login/user/check_token", data)
                .then(res => {
                    console.log(res)
                    if (res.data.success === true)
                    {
                        document.getElementById("waitInfo").style.display = "none";
                        this.props.history.push("/ResetPassword");

                    }else {
                        document.getElementById("badLogin").style.display = "flex";
                        document.getElementById("waitInfo").style.display = "none";
                    }

                })
                .catch(err =>{
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
                        <Link to={"/Password"}>
                            <ArrowBackIcon style={{color: "white", marginLeft: "30px", fontSize: "xx-large"}}/>
                        </Link>
                        <div className="LoginCard">
                            <Alert severity="error" id={"badLogin"}>Token incorrect!</Alert>
                            <Alert severity="info" id={"waitInfo"}>Verifying token...</Alert>
                            <div className="wrapper">
                                <form className="LoginForm" onSubmit={this.handleSubmit}>
                                    <span className="headerTag1">
                                        Email has been sent
                                    </span>
                                    <span className="Instruction">
                                       Please enter the pin code that was sent to your email, to verify that it is your email
                                   </span>
                                    <div className="LoginInput" data-validate="Username is required">
                                            <span className="LoginInputLabel">
                                                Pin Code
                                            </span>
                                                    <div>
                                                        <input
                                                            className="innerInput validate"
                                                            type="text"
                                                            name="token"
                                                            placeholder="Enter pin code"
                                                            onChange={this.handleChange}
                                                        />

                                                    </div>
                                                    <span className="loginError">{this.state.emailError}</span>
                                                </div>

                                                <div className="wrapper-btn">

                                                    <button className="Login-btn" id={"loginBTN_less_rounded"} type="submit" >
                                                        Reset password
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

export default EmailSent;
