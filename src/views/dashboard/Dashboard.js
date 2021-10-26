/*import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Sidebar from "./sidebar/Sidebar"
import "./sidebar/styles/Dashboard.css"
import OrganisationsDash from "./sidebar/Components/OrganisationsDash/OrganisationsDash"
import Users from "./sidebar/Components/Users/Users"
import Featured from "./sidebar/Components/Featured/Featured";
import Reports from "./sidebar/Components/Report/Reports"
import Org from "./sidebar/Components/OrganisationsDash/Org"
import Profile from "./sidebar/Components/Profile/Profile"
import Certificate from "./sidebar/Components/Certificate/Certificate"
import Upgrade2 from "./sidebar/Components/Certificate/Upgrade2"
import Upgrade3 from "./sidebar/Components/Certificate/Upgrade3"
import Upgrade5 from "./sidebar/Components/Certificate/Upgrade5"
import Upgrade4 from "./sidebar/Components/Certificate/Upgrade4"
import Upgrade0 from "./sidebar/Components/Certificate/Upgrade0"
import Upgrade1 from "./sidebar/Components/Certificate/Upgrade1"
import Calendar from "./sidebar/Components/Calendar/Calendar"
import Validate from "./sidebar/Components/Validate/Validate"
import AddOrg from "./sidebar/Components/OrganisationsDash/AddOrg"
import OrgValidate from "./sidebar/Components/Validate/OrgValidate"
import OrganisationTimeline from "./sidebar/Components/Timeline/Timeline";
import BlurImages from "./sidebar/Components/BlurImages/BlurImages"
import {ApiUrlProvider} from "../../apiContext/ApiContext";
import {useState} from "react";


const roles = localStorage.getItem('role')


function Dashboard() {

    const [frontEndDomain, setFrontEndDomain] = useState("http://localhost:3000");

    if(localStorage.getItem("id") === null ||
        localStorage.getItem("id") === undefined ||
        localStorage.getItem("id") === 'default')
    {

        window.location.href = frontEndDomain + "/login";
    }
    function features(){
        if(roles === 'admin')
        {
            return(

                <ApiUrlProvider>
                    <Router>
                        <Switch>
                            <Route exact path="/dashboard">
                                <Featured />
                            </Route>
                            <Route exact path="/organisations">
                                <OrganisationsDash />
                            </Route>
                            <Route path="/org/:id">
                                <Org />
                            </Route>
                            <Route exact path="/users">
                                <Users />
                            </Route>
                            <Route exact path="/report">
                                <Reports />
                            </Route>
                            <Route exact path="/calendar">
                                <Calendar />
                            </Route>
                            <Route exact path="/validate">
                                <Validate />
                            </Route>
                            <Route exact path="/addOrg">
                                <AddOrg />
                            </Route>
                            <Route exact path="/orgValidate/:id">
                                <OrgValidate />
                            </Route>
                            <Route exact path="/timeline">
                                <OrganisationTimeline />
                            </Route>
                        </Switch>
                    </Router>
                </ApiUrlProvider>
            )
        }
        else if(roles === 'organisation'){
            return(
            <ApiUrlProvider>
                <Router>
                    <Switch>
                        <Route exact path="/dashboard">
                            <Profile />
                        </Route>
                        <Route exact path="/report">
                            <Reports />
                        </Route>
                        <Route exact path="/calendar">
                            <Calendar />
                        </Route>
                        <Route exact path="/certificate">
                            <Certificate />
                        </Route>
                        <Route exact path="/upgrade1">
                            <Upgrade1 />
                        </Route>
                        <Route exact path="/upgrade2">
                            <Upgrade2 />
                        </Route>
                        <Route exact path="/upgrade3">
                            <Upgrade3 />
                        </Route>
                        <Route exact path="/upgrade4">
                            <Upgrade4 />
                        </Route>
                        <Route exact path="/upgrade5">
                            <Upgrade5 />
                        </Route>
                        <Route exact path="/upgrade0">
                            <Upgrade0 />
                        </Route>
                        <Route exact path="/timeline">
                            <OrganisationTimeline />
                        </Route>
                        <Route exact path="/blurImages">
                            <BlurImages />
                        </Route>
                    </Switch>
                </Router>
            </ApiUrlProvider>
            )
        }
    }

    return (
        <ApiUrlProvider>
            <Router>
                <div className="Dashboard">
                    <div className="DashboardContainer">
                        <Sidebar />
                        {features()}
                    </div>
                </div>
            </Router>
        </ApiUrlProvider>
    );
}

export default Dashboard;*/
