import React from 'react'
import "../../styles/Sidebar.css"
import {  Link} from "react-router-dom";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import { useLocation } from "react-router-dom";
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import Logo from "../../../../login/Components/DashLogo"
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';

function Sidebar(){

    function handleLogOut() {
        localStorage.clear();
        window.location.href = '/';
    }

    //let history = useHistory();

    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    function Org(){

        return(

            <div>
                <div className={splitLocation[1] === "featured" ? "active" : ""}>
                    <Link to='/featured' className="link">
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
                            <div className="sideIcon" > Validate Information</div>
                        </li>
                    </Link>
                </div>

                <div className={splitLocation[1] === "adminReports" ? "active" : ""}>
                    <Link to='/adminReports' className="link">
                        <li className="sidebarListItem ">
                            <ReportOutlinedIcon />
                            <div className="sideIcon" > Reports </div>
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
