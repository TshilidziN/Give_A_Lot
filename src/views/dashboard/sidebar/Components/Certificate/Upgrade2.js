import React, {Component} from 'react';
import "./Style/Certificate.css";
import 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { withStyles} from '@material-ui/core/styles'
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
    date:"",
    startDate: new Date(),
    orgInfo:"",
    Qrcode:"",
    QrcodeFile:null,
    dateError:"",
    paypalError:"",
    qrError:"",
    popUp1:false,
    popUp2:false,
    popUp3:false,
    serverDomain: 'https://givealotcharities.herokuapp.com',
};


export class Upgrade2 extends Component {

    state = initialState;
    static contextType = ApiContext;
    constructor (props) {
        super(props)
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({startDate: date, date:document.getElementsByClassName("input3")[0].value} )

    }

    handleInputChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    handleChange = event => {
        this.setState({ QrcodeFile: event.target.files[0]})

    };


    validate = () => {
        let dateError = "";
        let paypalError = "";
        let qrError="";


        if (!this.state.date) {
            dateError = "required";
        }


        if(!this.state.orgInfo) {
            paypalError="required";
        }

        if (!this.state.QrcodeFile) {
            qrError = "required";
        }

        if ( dateError || paypalError || qrError) {
            this.setState({ dateError, paypalError,qrError });
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
                date: this.state.date,
            };
            Axios
                .post(this.state.serverDomain + "/v1/organisation/add/estdate", data)
                .then(res => {
                    console.log(res)
                    this.setState({popUp1: res.data.message});
                    this. onToastDate ();
                })
                .catch(err => {
                    console.log(err)
                    this.setState({popUp1: false});
                    this. onToastDate ();
                });

            const paypal = {
                orgId: this.state.orgId,
                orgInfo: this.state.orgInfo,
            };
            Axios
                .post(this.state.serverDomain + "/v1/organisation/add/donation/info", paypal)
                .then(res => {
                    console.log(res)
                    this.setState({popUp2: res.data.message});
                    this. onToastPaypal ();
                })
                .catch(err => {
                    console.log(err)
                    this.setState({popUp2: false});
                    this. onToastPaypal ();
                });

            console.log(this.state.QrcodeFile)
            const formData = new FormData();
            formData.append('image', this.state.QrcodeFile);
            formData.append('orgId', this.state.orgId);
            fetch(
                this.state.serverDomain + '/v1/organisation/add/qrcode',
                {
                    method: 'POST',
                    body: formData,
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                    this.setState({popUp3: true});
                    this. onToastCode ();

                })
                .catch((error) => {
                    console.error('Error:', error.response);
                    this.setState({popUp3: false});
                    this. onToastCode ();

                });



            const notification_update_body = {
                org_id: this.state.orgId,
            };

            Axios
                .post(this.state.serverDomain + "/v1/notifications/update/notifications", notification_update_body)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    };

    onToastDate = () => {
        if(this.state.popUp1){

            toast.success('Date Submitted ', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send Date', {
                position: toast.POSITION.TOP_RIGHT

            });

        }
    }

    onToastCode = () => {

        if(this.state.popUp3){

            toast.success('QrCode Submitted ', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send QrCode', {
                position: toast.POSITION.TOP_RIGHT

            });
        }
    }

    onToastPaypal = () => {
        if(this.state.popUp2){

            toast.success('paypal Submitted ', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send paypal', {
                position: toast.POSITION.TOP_RIGHT

            });

        }
    }


    render(){
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
                            <p className="upgradeTitle2">Two</p>
                        </div>

                        <div className="progress">
                            <div className="progress_complete"/>
                            <div className="progress_complete"/>
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
                                            Additional credentials needed to Upgrade to level 3
                                         </span>
                                        <div>

                                            <div >
                                                <span className="upgrade_label">
                                                    NGO Establishment date
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
                                            <span className="loginError_certificate">{this.state.dateError}</span>
                                            <div>
                                            <TextField
                                                id="outlined-full-width"
                                                label="Paypal link"
                                                name="orgInfo"
                                                style={{ margin: 8 }}
                                                placeholder="Enter  paypal link..."
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.handleInputChange}
                                            />
                                                </div>
                                            <span className="loginError_certificate">{this.state.paypalError}</span>
                                            <div>

                                                <TextField
                                                    id="outlined-full-width"
                                                    style={{ margin: 8 }}
                                                    fullWidth
                                                    margin="normal"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    label="QR code"
                                                    type="file"
                                                    name="Qrcode"
                                                    onChange={this.handleChange}
                                                />

                                            </div>
                                            <span className="loginError_certificate">{this.state.qrError}</span>

                                        </div>
                                        <div className="empty_space">
                                            empty space
                                        </div>
                                        <div className="upgrade_Button">
                                            <button className="upgrade-btn" type="submit">
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
export default withStyles(styles)(Upgrade2);

