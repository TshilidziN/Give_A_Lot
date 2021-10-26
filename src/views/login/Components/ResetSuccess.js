import React, {Component} from 'react';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import backgroundImg from "../../../assets/homeBackground.jpg";
import Logo from "./Logo"
import "../Styles/Login.css"
import {Alert} from "@material-ui/lab";
const styles = {
    main: {
        backgroundImage: `url(${backgroundImg})`
    }
}


class ResetSuccess extends Component {
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
                                       Password Reset was a success
                                    </span>
                                    <div className="wrapper-btn">

                                        <Link to={"/login"}>
                                            <button className="Login-btn" id={"loginBTN_less_rounded"} type="submit" >
                                                Return to Login
                                            </button>
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
}

export default ResetSuccess;
