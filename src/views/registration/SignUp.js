import React from 'react';
import { Link } from "react-router-dom";
import "./Styles/SignUp.css"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Logo from "../login/Components/Logo"
import backgroundImg from "../../assets/homeBackground.jpg";
import Button from "@material-ui/core/Button";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';

const styles = {
    main: {
        backgroundImage: `url(${backgroundImg})`
    }
}

function SignUp()
{
    return (
        <div>
            <div className="signup" style={styles.main}>
                <div  id={"banner_filter"}>
                    <Logo/>
                    <Link to={"/login"}>
                        <ArrowBackIcon style={{color: "white", marginLeft: "30px", fontSize: "xx-large"}}/>
                    </Link>
                    <div className="signupCard">
                        <div className="signupWrapper">
                            <form className="signupForm">
                           <span className="signupHeader">
                               Sign Up
                           </span>

                                <div className="container">
                                    <div className="signup-wrapper-btn">

                                        <Link to={"/registerUser"} className="signup-linker">
                                            <Button
                                                className="signup-btn"
                                                startIcon={<PersonIcon/>}
                                                name="org"
                                                variant={"contained"}
                                            >
                                                Sign Up as a User
                                            </Button>
                                        </Link>

                                    </div>

                                    <div className="signup-wrapper-btn">

                                        <Link to={"/register/organisation"} className="signup-linker">

                                            <Button
                                                className="signup-btn"
                                                startIcon={<PeopleAltIcon/>}
                                                name="org"
                                                variant={"contained"}
                                            >
                                                Sign Up as an Organisation
                                            </Button>
                                        </Link>

                                    </div>

                                    <div className="terms">
                                        <p>By signing up, you agree to Givealot's</p>
                                        <Link to={"/TermsAndConditions"}  className="BottomLink">
                                            <p>Terms of service and privacy</p>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;