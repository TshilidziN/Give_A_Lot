import React, {Component} from 'react';
import "./Style/Certificate.css";
import 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from '@material-ui/core/styles'
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Complete from "./Style/complete.png";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Axios from "axios";
import OrgSidebar from "../DemoSidebar/OrgSidebar";

const styles = theme => ({

    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "25ch"
    },
    formControl: {
        margin: theme.spacing.unit * 3
    },

});


export class Upgrade5 extends Component {

    constructor (props) {
        super(props)
        this.state={
            orgId:"",
            website: "",
            address:"",
            serverDomain: 'https://givealotcharities.herokuapp.com',
            frontEndDomain: 'https://givealot.netlify.app/',

        };
    }

    handleChange = TextField => e => {

        this.setState({ [TextField]: e.target.value });

    };

    handleFormSubmit = e => {
        e.preventDefault();
        const data = {
            orgId: this.state.orgId,
            website: this.state.website,
            address: this.state.address,
        };
        Axios
            .post("", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    onToast = () => {
        toast.success('Submit successful',{
            position: toast.POSITION.TOP_RIGHT

        });
    }


    render(){
        if(localStorage.getItem("id") === null ||
            localStorage.getItem("id") === undefined ||
            localStorage.getItem("id") === 'default')
        {

            window.location.href = this.state.frontEndDomain + "/login";
        }

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
                    <p className="upgradeTitle2">Five</p>
                </div>

                <div className="progress">
                    <div className="progress_complete"/>
                    <div className="progress_complete"/>
                    <div className="progress_complete"/>
                    <div className="progress_complete"/>
                    <div className="progress_complete"/>
                    <div className="progress6"> <StarOutlineIcon fontSize="large"/></div>
                </div>

                <Card className="upgrade_card4" variant="outlined">
                    <CardContent>
                        <div>
                            <span id="complete_label1">
                                Done!
                            </span>

                        </div>

                        <div>
                            <img id="level5" src={Complete}  alt={"level5"}/>
                        </div>
                        <div id="complete_label2">
                            < CheckCircleIcon className="checkIcon" />
                                SUCCESS! Certificate upgrade completed

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
export default withStyles(styles)(Upgrade5);
