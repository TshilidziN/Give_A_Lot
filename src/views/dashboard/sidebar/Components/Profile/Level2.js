import React, {Component} from 'react';
import "../Certificate/Style/Certificate.css";
import 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from '@material-ui/core/styles'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {ApiContext} from "../../../../../apiContext/ApiContext";

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


export class Level2 extends Component {

    static contextType = ApiContext;
    constructor (props) {
        super(props)
        this.state={
            level2:{},
            orgId:localStorage.getItem("id"),
            //orgId:60,
            date:"",
            dateState:false,
            startDate: new Date(),
            orgInfo:"",
            orgInfoState:false,
            qrCode:"",
            qrCodeState:false,
            serverDomain: 'https://givealotcharities.herokuapp.com',
            frontEndDomain: 'https://givealot.netlify.app/'
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({startDate: date, date:document.getElementsByClassName("input3")[0].value, dateState: true}  )

    }
    handleInfo =event=>{
        this.setState({orgInfoState: true})
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    }

    handleChange = event => {
        this.setState({qrCodeState: true})
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        formData.append('orgId', this.state.orgId);
        let imageStates = 0;


        alert("take away submit button functionality");

        fetch(
            this.state.serverDomain + '/v1/organisation/add/logo',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                imageStates = 1;

            })
            .catch((error) => {
                console.error('Error:', error);
                imageStates = 2;
            });

        if(imageStates===1)
            alert("bring back button functionality");
        else if(imageStates === 2)
            alert("bring back button functionality also tell the user that the image didnt submit");

        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    handleFormSubmit = e => {
        e.preventDefault();

        if (this.state.dateState) {
            const data = {
                orgId: this.state.orgId,
                date: this.state.date,
            };
            Axios
                .post(this.state.serverDomain + "/v1/organisation/add/estdate", data)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
        if (this.state.orgInfoState) {

            const paypal = {
                orgId: this.state.orgId,
                orgInfo: this.state.orgInfo,
            };
            Axios
                .post(this.state.serverDomain + "/v1/organisation/add/donation/info", paypal)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    };

    onToast2 = () => {
        if ( this.state.qrCodeState || this.state.orgInfoState || this.state.dateState ) {
            toast.success('Submit successful', {
                position: toast.POSITION.TOP_RIGHT

            });
        }
    }

    componentDidMount(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        console.log(this.props)
        axios.get(this.state.serverDomain + '/v1/organisation/sel/organisation/'+this.state.orgId+'/default', config) //Change the API
            .then(response =>{
                console.log(response)
                this.setState({level2: response.data.response})
            })
            .catch(error =>{
                console.log(error)
                this.setState({error : 'Error Retrieving data'})
            })

    }


    render(){

        if(localStorage.getItem("id") === null ||
            localStorage.getItem("id") === undefined ||
            localStorage.getItem("id") === 'default')
        {

            window.location.href = this.state.frontEndDomain + "/login";
        }
        const { classes } = this.props;
        const { level2 } = this.state;



        return (
            <div className="upgrade">

                <Card className="upgrade_card111" variant="outlined">
                    <CardContent>
                        <div className={classes.root}>
                            <form onSubmit={this.handleFormSubmit}>
                                <span className="upgrade_header1">
                                    Additional credentials needed to Upgrade
                                 </span>
                                <div>

                                    <div >
                                        <span className="upgrade_label">
                                            Establishment date
                                         </span>
                                        <DatePicker

                                            className="upgrade_datee input3"
                                            selected={ this.state.startDate }
                                            onChange={ this.handleDateChange }
                                            name="startDate"
                                            dateFormat="MM/dd/yyyy"
                                            fullWidth


                                        />
                                    </div>
                                    <TextField
                                        id="outlined-full-width"
                                        label="Paypal link"
                                        name="orgInfo"
                                        style={{ margin: 8 }}
                                        placeholder={level2.orgEmail}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        onChange={this.handleInfo}
                                    />
                                    <div>
                                        <span className="upgrade_label_logo">
                                            QR code
                                         </span>
                                        <input
                                            className="upgrade_logoo"
                                            type="file"
                                            name="qrCode"
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                </div>
                                <div className="upgrade_Button">
                                    <button className="upgrade-btnn" type="submit" onClick={this.onToast2}>
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
        );
    }
}
export default withStyles(styles)(Level2);

