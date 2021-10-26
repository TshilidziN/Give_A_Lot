import React, {Component} from 'react';
import "./Style/Certificate.css";
import 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from '@material-ui/core/styles'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import {ApiContext} from "../../../../../apiContext/ApiContext";
import OrgSidebar from "../DemoSidebar/OrgSidebar";

const styles = theme => ({

    root: {
        display: "flex",
        flexWrap: "wrap",
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#957b9e',
                borderWidth: 2
            },
        },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "30ch",


    },

});

const initialState = {
    orgId:localStorage.getItem("id"),
    website: "",
    websiteError: "",
    address:"",
    addressError:"",
    popUp1:false,
    popUp2:false,
    serverDomain: 'https://givealotcharities.herokuapp.com',
    frontEndDomain: 'https://givealot.netlify.app/'
};
export class Upgrade1 extends Component {

    state = initialState;
    static contextType = ApiContext;
    constructor (props) {
        super(props)

    }

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    validate = () => {
        let  websiteError = "";
        let  addressError = "";


        if (!this.state.website) {
            websiteError = "Website is require";
        }



        if(!this.state.address) {
            addressError="address is required";
        }

        if ( websiteError || addressError) {
            this.setState({ websiteError, addressError });
            return false;
        }

        return true;
    };


    handleFormSubmit = e => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const web = {
                orgId: this.state.orgId,
                website: this.state.website,

            };
            const add = {
                orgId: this.state.orgId,
                address: this.state.address,

            };
            Axios
                .post( this.state.serverDomain + "/v1/organisation/add/website", web)
                .then(res => {
                    console.log(res)
                    this.setState({popUp1: res.data.message});
                    this.onToastOneWebsite();
                })
                .catch(err => {
                    console.log(err)
                    this.setState({popUp1: false});
                    this.onToastOneWebsite();
                });

            Axios
                .post(this.state.serverDomain + "/v1/organisation/add/address", add)
                .then(res =>{
                    console.log(res)
                    this.setState({popUp2: res.data.message});
                    this.onToastOneAddress ();
                })
                .catch(err => {
                    console.log(err)
                    this.setState({popUp1: false});
                    this.onToastOneAddress ();
                });

            const notification_update_body = {
                org_id: this.state.orgId,
            };

            Axios
                .post(this.state.serverDomain + "/v1/notifications/update/notifications", notification_update_body)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            // clear form
            this.setState(initialState);
        }
    };

    onToastOneWebsite = () => {
        if(this.state.popUp1){

            toast.success('Website Submitted ', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send Website', {
                position: toast.POSITION.TOP_RIGHT

            });

        }
    }

    onToastOneAddress = () => {
        if(this.state.popUp2){

            toast.success('Address Submitted', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send Address', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    render(){

        if(localStorage.getItem("id") === null ||
            localStorage.getItem("id") === undefined ||
            localStorage.getItem("id") === 'default')
        {

            window.location.href = this.state.frontEndDomain + "/login";
        }
        const { classes } = this.props;

        return (
            <div className="trythis">
                <div>
                    <OrgSidebar />
                </div>
            <div className="upgrade">
                <div className="wrap_upgrade">
                    <div>
                <div className="upgradeTitle">
                    <p className="upgradeTitle1">Current level:</p>
                    <p className="upgradeTitle2">One</p>
                </div>

                <div className="progress">
                    <div className="progress_complete"/>
                    <div className="progress_empty"/>
                    <div className="progress_empty"/>
                    <div className="progress_empty"/>
                    <div className="progress_empty"/>
                    <div className="progress6"> <StarOutlineIcon fontSize="large"/></div>
                </div>

                <Card className="upgrade_card" variant="outlined">
                    <CardContent>
                        <div className={classes.root}>
                            <form onSubmit={this.handleFormSubmit}>
                                <span className="upgrade_header">
                                    Additional credentials needed to Upgrade to level 2
                                 </span>
                            <div>

                                <TextField
                                    id="outlined-full-width"
                                    label="Website"
                                    name="website"
                                    style={{ margin: 8 }}
                                    placeholder="Enter your website url.."

                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                />
                                <span className="loginError_certificate">{this.state.websiteError}</span>
                                <TextField
                                    id="outlined-full-width"
                                    label="Address"
                                    name="address"
                                    style={{ margin: 8 }}
                                    placeholder="Enter your address.."

                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                />
                                <span className="loginError_certificate">{this.state.addressError}</span>
                            </div>
                                <div className="empty_space">
                                    empty space
                                </div>
                                <div className="upgrade_Button">
                                    <button className="upgrade-btn" type="submit" >
                                        Submit
                                    </button>
                                </div>
                                <div className="form-group">
                                    <ToastContainer/>
                                </div>

                            </form>
                        </div>

                    </CardContent>

                </Card>
                </div>
            </div>

            </div>
            </div>
        );
    }
}
export default withStyles(styles)(Upgrade1);
