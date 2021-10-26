import React from 'react'
import "../../styles/Sidebar.css"
import {  Link} from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useLocation } from "react-router-dom";
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import Logo from "../../../../login/Components/DashLogo"
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import CardGiftcardOutlinedIcon from '@material-ui/icons/CardGiftcardOutlined';
import { useHistory } from "react-router-dom";
import TimelineIcon from '@material-ui/icons/Timeline';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';

const roles = localStorage.getItem('role')

function Sidebar(){

    function handleLogOut() {
        localStorage.clear();
        window.location.href = '/';
    }

    let history = useHistory();

    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    function Org(){

            return(
                <div>
                    <div className={splitLocation[1] === "profile" ? "active" : ""}>
                        <Link to='/profile' className="link">
                            <li className="sidebarListItem ">
                                <AccountCircleOutlinedIcon />
                                <div className="sideIcon" > Profile</div>
                            </li>
                        </Link>
                    </div>

                    <div className={splitLocation[1] === "certificate" || splitLocation[1] === "upgrade5" || splitLocation[1] === "upgrade0"|| splitLocation[1] === "upgrade1"|| splitLocation[1] === "upgrade2"|| splitLocation[1] === "upgrade3"|| splitLocation[1] === "upgrade4" ? "active" : ""}>
                        <Link to='/certificate' className="link">
                            <li className="sidebarListItem ">
                                <CardGiftcardOutlinedIcon />
                                <div className="sideIcon" > Certificate</div>
                            </li>
                        </Link>
                    </div>

                    <div className={splitLocation[1] === "report" ? "active" : ""} >
                        <Link to='/report' className="link">
                            <li className="sidebarListItem ">
                                <ReportOutlinedIcon/>
                                <div className="sideIcon" > Reports </div>
                            </li>
                        </Link>
                    </div>

                    <div className={splitLocation[1] === "timeline" ? "active" : ""} >
                        <Link to='/timeline' className="link">
                            <li className="sidebarListItem ">
                                <TimelineIcon/>
                                <div className="sideIcon" > Timeline </div>
                            </li>
                        </Link>
                    </div>

                    <div className={splitLocation[1] === "blurImages" ? "active" : ""}>
                        <Link to='/blurImages' className="link">
                            <li className="sidebarListItem ">
                                <CalendarTodayOutlinedIcon />
                                <div className="sideIcon" > Blur Images </div>
                            </li>
                        </Link>
                    </div>

                    <div className={splitLocation[1] === "orgcalendar" ? "active" : ""}>
                        <Link to='/orgcalendar' className="link">
                            <li className="sidebarListItem ">
                                <CalendarTodayOutlinedIcon />
                                <div className="sideIcon" > Calendar </div>
                            </li>
                        </Link>
                    </div>

                    <div className={splitLocation[1] === "logout" ? "active" : ""}  onClick={handleLogOut}>
                        <Link to='/browse' className="link">
                            <li className="sidebarListItem ">
                                <ExitToAppOutlinedIcon/>
                                <div className="sideIcon" > Logout </div>
                            </li>
                        </Link>
                    </div>
                </div>

            )
        }


    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <div className="sidebarList">
                        <Logo/>
                        <div className="MuListPadding MuListRoot">
                            {Org()}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
