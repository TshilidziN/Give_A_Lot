import './App.css';
import Home from './views/home/Home';
import Browse from './views/browse/Browse';
import Dashboard from './views/dashboard/Dashboard';
import Login from './views/login/Login';
import SignUp from './views/registration/SignUp'
import RegisterUser from './views/registration/registerUser/RegisterUser'
import VerifyCertificate from './views/verifyCertificate/VerifyCertificate'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ViewOrganisation from "./views/browse/Components/Organisation/ViewOrganisation";
import UserSuccess from "./views/registration/registerUser/UserSuccess";
import EmailSent from "./views/login/Components/EmailSent";
import Password from "./views/login/Components/Password";
import ResetPassword from "./views/login/Components/ResetPassword";
import RegisterOrganisation from './views/registration/registerOrganisation/OrganisationRegistration';
import {ApiUrlProvider} from "./apiContext/ApiContext";
import {FrontendUrlProvider} from "./apiContext/FrontEndContext";
import ResetSuccess from "./views/login/Components/ResetSuccess";
import TermsAndConditions from "./views/registration/TermsAndConditions";
import Default404 from "./views/default/Default404";
import Featured from "./views/dashboard/sidebar/Components/Featured/Featured";
import OrganisationsDash from "./views/dashboard/sidebar/Components/OrganisationsDash/OrganisationsDash";
import Org from "./views/dashboard/sidebar/Components/OrganisationsDash/Org";
import Users from "./views/dashboard/sidebar/Components/Users/Users";
import Reports from "./views/dashboard/sidebar/Components/Report/Reports";
import Calendar from "./views/dashboard/sidebar/Components/Calendar/Calendar";
import Validate from "./views/dashboard/sidebar/Components/Validate/Validate";
import AddOrg from "./views/dashboard/sidebar/Components/OrganisationsDash/AddOrg";
import OrgValidate from "./views/dashboard/sidebar/Components/Validate/OrgValidate";
import OrganisationTimeline from "./views/dashboard/sidebar/Components/Timeline/Timeline";
import Profile from "./views/dashboard/sidebar/Components/Profile/Profile";
import Certificate from "./views/dashboard/sidebar/Components/Certificate/Certificate";
import Upgrade1 from "./views/dashboard/sidebar/Components/Certificate/Upgrade1";
import Upgrade2 from "./views/dashboard/sidebar/Components/Certificate/Upgrade2";
import Upgrade3 from "./views/dashboard/sidebar/Components/Certificate/Upgrade3";
import Upgrade4 from "./views/dashboard/sidebar/Components/Certificate/Upgrade4";
import Upgrade5 from "./views/dashboard/sidebar/Components/Certificate/Upgrade5";
import Upgrade0 from "./views/dashboard/sidebar/Components/Certificate/Upgrade0";
import BlurImages from "./views/dashboard/sidebar/Components/BlurImages/BlurImages";
import AdminSidebar from "./views/dashboard/sidebar/Components/DemoSidebar/AdminSidebar";
import OrgCalendar from "./views/dashboard/sidebar/Components/OrgCalender/OrgCalendar";
import AdminReports from "./views/dashboard/sidebar/Components/AdminReports/AdminReports"

function App()
{
    return (
        <FrontendUrlProvider>
            <ApiUrlProvider>
                <Router>
                    <Switch>
                        <Route path="/dashboard323" exact component={Featured}/>
                        <Route path="/" exact component={Home}/>
                        <Route path="/adminSidebar" exact component={AdminSidebar}/>
                        <Route path="/browse" exact component={Browse}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/signUp" exact component={SignUp}/>
                        <Route path="/UserSuccess" exact component={UserSuccess}/>
                        <Route path="/ResetSuccess" exact component={ResetSuccess}/>
                        <Route path="/TermsAndConditions" exact component={TermsAndConditions}/>
                        <Route path="/ResetPassword" exact component={ResetPassword}/>
                        <Route path="/Password" exact component={Password}/>
                        <Route path="/EmailSent" exact component={EmailSent}/>
                        <Route path="/register/organisation" exact component={RegisterOrganisation}/>
                        <Route path="/registerUser" exact component={RegisterUser}/>
                        <Route exact path="/dashboard/" component={Dashboard}/>
                        <Route path="/organisation/:id" exact component={ViewOrganisation}/>
                        <Route path="/verifyCertificate" exact component={VerifyCertificate}/>
                        <Route path="/adminReports" exact component={AdminReports}/>
                        <Route exact path="/featured">
                            <Featured />
                        </Route>
                        <Route exact path="/organisations">
                            <OrganisationsDash/>
                        </Route>
                        <Route path="/org/:id">
                            <Org/>
                        </Route>
                        <Route exact path="/users">
                            <Users/>
                        </Route>
                        <Route exact path="/report">
                            <Reports/>
                        </Route>
                        <Route exact path="/calendar">
                            <Calendar/>
                        </Route>
                        <Route exact path="/validate">
                            <Validate/>
                        </Route>
                        <Route exact path="/addOrg">
                            <AddOrg/>
                        </Route>
                        <Route exact path="/orgValidate/:id">
                            <OrgValidate/>
                        </Route>
                        <Route exact path="/timeline">
                            <OrganisationTimeline/>
                        </Route>


                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/report">
                            <Reports />
                        </Route>
                        <Route exact path="/orgcalendar">
                            <OrgCalendar />
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
                        <Route path="/*" exact component={Default404}/>
                    </Switch>
                </Router>
            </ApiUrlProvider>
        </FrontendUrlProvider>
    )
}

export default App;
