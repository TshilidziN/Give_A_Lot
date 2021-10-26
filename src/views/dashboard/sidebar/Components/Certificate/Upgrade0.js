import  React, {Component} from 'react';
import "./Style/Certificate.css";
import 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from '@material-ui/core/styles'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
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
        width: "30ch"
    },

});


const initialState = {
    orgId:localStorage.getItem("id"),
    startDate: new Date(),
    ngoNumber:"",
    ngoDate:"",
    ngoNumberError:"",
    ngoDateError:"",
    popUp1:false,
    popUp2:false,
    serverDomain: 'https://givealotcharities.herokuapp.com',
    frontEndDomain: 'https://givealot.netlify.app/'
};



export class Upgrade0 extends Component {
    state = initialState;
    static contextType = ApiContext;
    constructor (props) {
        super(props)

        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({startDate: date, ngoDate:document.getElementsByClassName("input3")[0].value} )

    }


    handleInputChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };



    validate = () => {
        let  ngoNumberError = "";
        let  ngoDateError = "";



        if (!this.state.ngoDate) {
            ngoDateError = "Date is require";
        }



        if(!this.state.ngoNumber) {
            ngoNumberError="Ngo number is required";
        }

        if ( ngoDateError || ngoNumberError ) {
            this.setState({ ngoDateError, ngoNumberError});
            return false;
        }

        return true;
    };

    handleFormSubmit = e => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const data = {
                orgId: this.state.orgId,
                ngoDate: this.state.ngoDate,
                ngoNumber: this.state.ngoNumber,
            };
            console.log(data)
            Axios
                .post(this.state.serverDomain + "/v1/organisation/add/ngopdate", data)
                .then(res => {

                         this.setState({popUp1: res.data.message});
                         this.onToastZero();

                        Axios
                            .post(this.state.serverDomain + "/v1/notifications/update/notifications", notification_update_body)
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
                    }
                )
                .catch(err => {
                    console.log(err)
                    this.setState({popUp1: false});
                    this.onToastZero();
                });
                const notification_update_body = {
                org_id: this.state.orgId,
            };

        }


    };

    onToastZero = () => {

        if(this.state.popUp1){

            toast.success('Submit successful', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send', {
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
                    <p className="upgradeTitle2">Zero</p>
                </div>

                <div className="progress">
                    <div className="progress_empty"/>
                    <div className="progress_empty"/>
                    <div className="progress_empty"/>
                    <div className="progress_empty"/>
                    <div className="progress_empty"/>
                    <div className="progress6"> <StarOutlineIcon fontSize="large"/></div>
                </div>

                <Card className="upgrade_card1" variant="outlined">
                    <CardContent>
                        <div className={classes.root}>
                            <form onSubmit={this.handleFormSubmit}>
                                <span className="upgrade_header1">
                                    Additional credentials needed to Upgrade to level 1
                                 </span>
                                <div>

                                    <div >
                                        <span className="upgrade_label">
                                            NGO Registration date
                                         </span>
                                        <DatePicker

                                            className="upgrade_date input3"
                                            selected={ this.state.startDate }
                                            onChange={ this.handleDateChange }
                                            name="startDate"
                                            dateFormat="yyyy/MM/dd"
                                            fullWidth

                                        />
                                    </div>
                                    <span className="loginError_certificate">{this.state.ngoDateError}</span>
                                    <div>
                                        <TextField
                                            id="outlined-full-width"
                                            label="NGO Registration number"
                                            style={{ margin: 8 }}
                                            name="ngoNumber"
                                            placeholder="Enter NGO registration number.."
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span className="loginError_certificate">{this.state.ngoNumberError}</span>
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
export default withStyles(styles)(Upgrade0);
