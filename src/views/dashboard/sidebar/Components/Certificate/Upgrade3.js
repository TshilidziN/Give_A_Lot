import React, {Component} from 'react';
import "./Style/Certificate.css";
import 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { withStyles  } from '@material-ui/core/styles'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
        width: "25ch"
    },formControl: {
        margin: theme.spacing(1),
        minWidth: 198,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

});

const initialState = {
    orgId:localStorage.getItem("id"),
    url:"",
    urlError:"",
    type:"",
    typeError:"",
    url1:"",
    url2: "",
    type2:"",
    url2Error: "",
    type2Error:"",
    url1Error:"",
    type1:"",
    type1Error:"",
    ChairpersonName:"",
    ChairpersonNameError:"",
    ChairpersonContacts:"",
    ChairpersonContactsError:"",
    managerName:"",
    managerNameError:"",
    managerContacts:"",
    managerContactsError:"",
    treasurerName:"",
    treasurerNameError:"",
    treasurerContacts:"",
    treasurerContactsError:"",
    secretaryName:"",
    secretaryNameError:"",
    secretaryContacts:"",
    secretaryContactsError:"",
    committee:"",
    popUp1:false,
    popUp2:false,
    popUp3:false,
    popUp4:false,
    serverDomain: 'https://givealotcharities.herokuapp.com'

};

export class Upgrade3 extends Component {

    state = initialState;
    static contextType = ApiContext;
    constructor (props) {
        super(props)

    }

    handleSocialChange = e => {
        this.setState({type: e.target.value});

    };

    handleSocial1Change = e => {
        this.setState({type1: e.target.value});

    };

    handleSocial2Change = e => {
        this.setState({type2: e.target.value});

    };

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    handleCommitteeChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    validate = () => {

        let ChairpersonNameError = "";
        let managerNameError = "";
        let treasurerNameError = "";
        let secretaryNameError = "";
        let ChairpersonContactsError = "";
        let managerContactsError = "";
        let treasurerContactsError = "";
        let secretaryContactsError = "";
        let urlError = "";
        let url1Error = "";
        let typeError = "";
        let type1Error = "";
        let url2Error = "";
        let type2Error = "";



        if (!this.state.ChairpersonName) {
            ChairpersonNameError = "required";
        }

        if (!this.state.managerName) {
            managerNameError = "required";
        }
        if (!this.state.treasurerName) {
            treasurerNameError = "required";
        }
        if (!this.state.secretaryName) {
            secretaryNameError = "required";
        }
        if (!this.state.ChairpersonContacts) {
            ChairpersonContactsError = "required";
        }
        if (!this.state.managerContacts) {
            managerContactsError = "required";
        }
        if (!this.state.treasurerContacts) {
            treasurerContactsError = "required";
        }
        if (!this.state.secretaryContacts) {
            secretaryContactsError = "required";
        }
        if (!this.state.url) {
            urlError = "required";
        }

        if (!this.state.url1) {
            url1Error = "required";
        }
        if (!this.state.url2) {
            url2Error = "required";
        }

        if (!this.state.type) {
            typeError = "required";
        }
        if (!this.state.type1) {
            type1Error = "required";
        }
        if (!this.state.type2) {
            type2Error = "required";
        }


        if ( urlError || url1Error || url2Error || typeError || type1Error || type2Error || treasurerContactsError || secretaryContactsError || managerContactsError || ChairpersonContactsError || treasurerNameError || secretaryNameError || managerNameError || ChairpersonNameError) {
            this.setState({urlError, url1Error,url2Error, typeError, type1Error ,type2Error, treasurerContactsError, secretaryContactsError,managerContactsError ,ChairpersonContactsError ,treasurerNameError, secretaryNameError, managerNameError ,ChairpersonNameError });
            return false;
        }

        return true;
    };


    handleFormSubmit = e => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const com = {
                orgId: this.state.orgId,
                committee: this.state.ChairpersonName + "," + this.state.ChairpersonContacts + "," + this.state.managerName + "," + this.state.managerContacts + "," + this.state.treasurerName + "," + this.state.treasurerContacts + "," + this.state.treasurerName + "," + this.state.treasurerContacts,
            };


            const social = {
                orgId: this.state.orgId,
                socialType: this.state.type,
                url: this.state.url,
            };

            const social1 = {
                orgId: this.state.orgId,
                socialType: this.state.type1,
                url: this.state.url1,
            };

            const social2 = {
                orgId: this.state.orgId,
                socialType: this.state.type2,
                url: this.state.url2,
            };
            console.log(com)
            Axios
                .post(this.state.serverDomain + "/v1/organisation/add/committee", com)
                .then(res => {
                    console.log(res)
                    this.setState({popUp1: res.data.message});
                    this. onToastCom ();
                })
                .catch(err => {
                    console.log(err)
                    this.setState({popUp1: false});
                    this. onToastCom();
                });

            console.log(social)
            Axios
                .post(this.state.serverDomain + "/v1/organisation/add/socials", social)
                .then(res => {
                    console.log(res)
                    this.setState({popUp2: res.data.message});
                    this. onToastSocial();
                })
                .catch(err => {
                    console.log(err)
                    this.setState({popUp2: false});
                    this. onToastSocial();
                });

            console.log(social1)
            Axios
                .post(this.state.serverDomain + "/v1/organisation/add/socials", social1)
                .then(res => {
                    console.log(res)
                    this.setState({popUp3: res.data.message});
                    this. onToastSocial1();
                })
                .catch(err => {
                    console.log(err)
                    this.setState({popUp3: false});
                    this. onToastSocial1();
                });

            Axios
                .post( this.state.serverDomain + "/v1/organisation/add/socials", social2)
                .then(res => {
                    console.log(res)
                    this.setState({popUp4: res.data.message});
                    this. onToastSocial2();
                })
                .catch(err => {
                    console.log(err)
                    this.setState({popUp4: false});
                    this. onToastSocial2();
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

    onToastCom= () => {
        if(this.state.popUp1){

            toast.success('Committee Submitted ', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send Committee', {
                position: toast.POSITION.TOP_RIGHT

            });

        }
    }

    onToastSocial = () => {
        if(this.state.popUp2){

            toast.success('Social media1 Submitted', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send Social media1 ', {
                position: toast.POSITION.TOP_RIGHT

            });

        }
    }

    onToastSocial1 = () => {
        if(this.state.popUp3){

            toast.success('Social media2  Submitted', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send Social media2 ', {
                position: toast.POSITION.TOP_RIGHT

            });


        }
    }

    onToastSocial2 = () => {
        if(this.state.popUp4){

            toast.success('Social media3  Submitted', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send Social media3 ', {
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
                            <p className="upgradeTitle2">Three</p>
                        </div>

                        <div className="progress">
                            <div className="progress_complete"/>
                            <div className="progress_complete"/>
                            <div className="progress_complete"/>
                            <div className="progress_empty"/>
                            <div className="progress_empty"/>
                            <div className="progress6"> <StarOutlineIcon fontSize="large"/></div>
                        </div>
                    </div>
                </div>
                <div className="wrap_upgrade">
                    <div>
                <Card className="upgrade_card_4" variant="outlined">
                    <CardContent>
                        <div className={classes.root}>
                            <form onSubmit={this.handleFormSubmit}>
                                <span className="upgrade_header">
                                    Additional credentials needed to Upgrade to level 4
                                 </span>
                                <div className="wrapIt">

                                    <div>
                                        <div className="social_media">
                                            <div>
                                            <TextField
                                                id="outlined-full-width"
                                                label="Chairperson"
                                                name="ChairpersonName"
                                                style={{ margin: 8 }}
                                                placeholder="Enter full name..."

                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.handleCommitteeChange}
                                            />
                                            <span className="loginError_certificate">{this.state.ChairpersonNameError}</span>
                                            </div>
                                            <div>
                                            <TextField
                                                id="outlined-full-width"
                                                label="Chairperson"
                                                name="ChairpersonContacts"
                                                style={{ margin: 8 }}
                                                placeholder="Enter contacts..."

                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.handleCommitteeChange}
                                            />
                                            <span className="loginError_certificate">{this.state.ChairpersonContactsError}</span>
                                            </div>

                                        </div>
                                        <div className="social_media">
                                            <div>
                                            <TextField
                                                id="outlined-full-width"
                                                label="Manager"
                                                name="managerName"
                                                style={{ margin: 8 }}
                                                placeholder="Enter full name..."

                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.handleCommitteeChange}
                                            />
                                            <span className="loginError_certificate">{this.state.managerNameError}</span>
                                            </div>
                                            <div>

                                            <TextField
                                                id="outlined-full-width"
                                                label="Manager"
                                                name="managerContacts"
                                                style={{ margin: 8 }}
                                                placeholder="Enter contacts..."

                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.handleCommitteeChange}
                                            />
                                            <span className="loginError_certificate">{this.state.managerContactsError}</span>
                                            </div>
                                        </div>
                                        <div className="social_media">
                                            <div>
                                            <TextField
                                                id="outlined-full-width"
                                                label="Treasurer"
                                                name="treasurerName"
                                                style={{ margin: 8 }}
                                                placeholder="Enter full name..."

                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.handleCommitteeChange}
                                            />
                                            <span className="loginError_certificate">{this.state.treasurerNameError}</span>
                                            </div>
                                            <div>
                                            <TextField
                                                id="outlined-full-width"
                                                label="Treasurer"
                                                name="treasurerContacts"
                                                style={{ margin: 8 }}
                                                placeholder="Enter contacts..."

                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.handleCommitteeChange}
                                            />
                                            <span className="loginError_certificate">{this.state.treasurerContactsError}</span>
                                            </div>
                                        </div>

                                        <div className="social_media">
                                            <div>
                                            <TextField
                                                id="outlined-full-width"
                                                label="Secretary"
                                                name="secretaryName"
                                                style={{ margin: 8 }}
                                                placeholder="Enter full name..."

                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.handleCommitteeChange}
                                            />
                                            <span className="loginError_certificate">{this.state.secretaryNameError}</span>
                                            </div>
                                            <div>
                                            <TextField
                                                id="outlined-full-width"
                                                label="Secretary"
                                                name="secretaryContacts"
                                                style={{ margin: 8 }}
                                                placeholder="Enter contacts..."

                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.handleCommitteeChange}
                                            />
                                            <span className="loginError_certificate">{this.state.secretaryContactsError}</span>
                                        </div>

                                        </div>
                                    </div>



                                    <div className="WrapItsSocial">
                                        <div className="social_media">
                                            <div>

                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel id="demo-controlled-open-select-label">Social media platform</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        name="type"
                                                        value={this.type}
                                                        onChange={this.handleSocialChange}
                                                        label="Social platform"


                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={"Facebook"}>Facebook</MenuItem>
                                                        <MenuItem value={"Instagram"}>Instagram</MenuItem>
                                                        <MenuItem value={"Twitter"}>Twitter</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <span className="loginError_certificate">{this.state.typeError}</span>
                                            </div>

                                            <div>
                                            <TextField
                                                id="outlined-full-width"
                                                label="Social media url"
                                                name="url"
                                                style={{ margin: 8 }}
                                                placeholder="Enter your url..."

                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.handleChange}
                                            />
                                                <span className="loginError_certificate">{this.state.urlError}</span>
                                        </div>

                                    </div>

                                        <div className="social_media">
                                            <div>

                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel id="demo-controlled-open-select-label">Social media platform</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={this.type1}
                                                        name="type1"
                                                        onChange={this.handleSocial1Change}
                                                        label="Social platform"


                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={"Facebook"}>Facebook</MenuItem>
                                                        <MenuItem value={"Instagram"}>Instagram</MenuItem>
                                                        <MenuItem value={"Twitter"}>Twitter</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <span className="loginError_certificate">{this.state.type1Error}</span>
                                            </div>
                                            <div>
                                            <TextField
                                                id="outlined-full-width"
                                                label="Social media url"
                                                style={{ margin: 8 }}
                                                name="url1"
                                                placeholder="Enter your url..."
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                onChange={this.handleChange}
                                            />
                                            <span className="loginError_certificate">{this.state.url1Error}</span>
                                            </div>
                                        </div>



                                        <div className="social_media">
                                            <div>

                                                <FormControl variant="outlined" className={classes.formControl}>
                                                    <InputLabel id="demo-controlled-open-select-label">Social media platform</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={this.type2}
                                                        name="type2"
                                                        onChange={this.handleSocial2Change}
                                                        label="Social platform"


                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={"Facebook"}>Facebook</MenuItem>
                                                        <MenuItem value={"Instagram"}>Instagram</MenuItem>
                                                        <MenuItem value={"Twitter"}>Twitter</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <span className="loginError_certificate">{this.state.type2Error}</span>
                                            </div>
                                            <div>
                                                <TextField
                                                    id="outlined-full-width"
                                                    label="Social media url"
                                                    style={{ margin: 8 }}
                                                    name="url2"
                                                    placeholder="Enter your url..."
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="outlined"
                                                    onChange={this.handleChange}
                                                />
                                                <span className="loginError_certificate">{this.state.url2Error}</span>
                                            </div>
                                        </div>

                                        <div className="upgrade_Button">
                                            <button className="upgrade-btn" type="submit">
                                                Submit
                                            </button>
                                        </div>

                                    </div>



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
export default withStyles(styles)(Upgrade3);
