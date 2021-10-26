import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";

import backgroundImg from '../../assets/homeBackground.jpg';
import logo from "../../assets/logo/logo3_1.png";

import home_desktop from './Styles/home_desktop.css'
import {Box} from "@material-ui/core";
import Chatbot from "../chatbot/Chatbot";


const styles = {
    main: {
        backgroundImage: `url(${backgroundImg})`
    }
}

/* 
    Note to self: Remember to use Context to update login status
*/
function Home() 
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [btnDisplayText, setBtnDisplayText] = useState("Login");
    const [currentUserId, setCurrentUserId] = useState("");

    useEffect(() => {

            if(localStorage.getItem("id") !== undefined && localStorage.getItem("role") !== undefined)
            {
                if(localStorage.getItem("role") === "organisation" )
                {
                    setBtnDisplayText("portal");
                }
                else if( localStorage.getItem("role") === "admin")
                {
                    setBtnDisplayText("dashboard");
                }
                else if(localStorage.getItem("role") === "general")
                {
                    setBtnDisplayText("logout");
                }
                else
                {
                    setBtnDisplayText("login");
                }
            }
        }
        ,[])

    return (
        <Box id="banner" style={styles.main}>
            <Box id="banner_filter">
                    <Chatbot />
                <Box id="homeNav">
                    <img id="logo" src={logo} alt={"logo"}/>
                    {
                        btnDisplayText === "portal" ?
                            <Link to="/profile">
                                <Button className="loginDashBtn" variant={"contained"}
                                        startIcon={<DashboardIcon />}>
                                    {btnDisplayText}

                                </Button>
                            </Link>
                            :
                        btnDisplayText === "dashboard" ?
                        <Link to="/featured">
                            <Button className="loginDashBtn" variant={"contained"}
                                    startIcon={<DashboardIcon />}>
                                {btnDisplayText}

                            </Button>
                        </Link>
                            :
                        btnDisplayText === "logout" ?
                        <Link to="/login">
                            <Button className="loginDashBtn" variant={"contained"}
                            startIcon={<ExitToAppIcon />} onClick={() =>{
                                localStorage.clear();
                                localStorage.setItem("id","default")
                            }
                            }>
                                {btnDisplayText}
                            </Button>
                        </Link>
                            :
                        <Link to="/login">
                        <Button className="loginDashBtn" variant={"contained"}
                                startIcon={<AccountCircleIcon/>}>
                            {btnDisplayText}
                        </Button>
                        </Link>
                    }
                </Box>

                <Box id="main_content_container">
                    <div>
                        <p id="main_head">Safe and verified donations</p>
                        <p id="supporting_head">Your hub for verified charities</p>
                    </div>

                    <Box id="main_content_btns">
                       <Link to={"/verifyCertificate"}>
                           <Button className="main_content_btns_inputTag" variant="contained" name={currentUserId} >
                               verify certificate
                           </Button>
                        </Link>
                        <Link to={"/browse"}>
                            <Button className="main_content_btns_inputTag" variant="contained" name={currentUserId}>
                                browse organisations
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Home;
