import React from 'react'
import "./styles/Sidebar.css"
import {  Link} from "react-router-dom";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import { useLocation } from "react-router-dom";
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import Logo from "../../login/Components/DashLogo"
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import CardGiftcardOutlinedIcon from '@material-ui/icons/CardGiftcardOutlined';
import { useHistory } from "react-router-dom";
import TimelineIcon from '@material-ui/icons/Timeline';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';

/////general organisation admin
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
        if(roles === 'organisation'){
            return(
                <div>
                    <div className={splitLocation[1] === "dashboard" ? "active" : ""}>
                        <Link to='/dashboard' className="link">
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
                                <div className="sideIcon" > Report </div>
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

                    <div className={splitLocation[1] === "calendar" ? "active" : ""}>
                        <Link to='/calendar' className="link">
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
        else if(roles === 'admin'){
            return(
                <div>
                    <div className={splitLocation[1] === "dashboard" ? "active" : ""}>
                        <Link to='/dashboard' className="link">
                            <li className="sidebarListItem ">
                                <DashboardOutlinedIcon />
                                <div className="sideIcon" > Dashboard </div>
                            </li>
                        </Link>
                    </div>

                    <div className={splitLocation[1] === "organisations" || splitLocation[1] === 'org' ? "active" : ""}>
                        <Link to='/organisations' className="link">
                            <li className="sidebarListItem ">
                                <PeopleOutlineIcon />
                                <div className="sideIcon" > Organisations </div>
                            </li>
                        </Link>
                    </div>

                    <div className={splitLocation[1] === "users" ? "active" : ""}>
                        <Link to='/users' className="link">
                            <li className="sidebarListItem ">
                                <PersonOutlineIcon />
                                <div className="sideIcon" > Users </div>
                            </li>
                        </Link>
                    </div>

                    <div className={splitLocation[1] === "validate" || splitLocation[1] === "orgValidate" ? "active" : ""}>
                        <Link to='/validate' className="link">
                            <li className="sidebarListItem ">
                                <VerifiedUserOutlinedIcon />
                                <div className="sideIcon" > Validate </div>
                            </li>
                        </Link>
                    </div>

                    <div className={splitLocation[1] === "calendar" ? "active" : ""}>
                        <Link to='/calendar' className="link">
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
        else if (roles === 'general'){
            return(
                <div>
                    this should be an error page
                </div>
            )
        }
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
