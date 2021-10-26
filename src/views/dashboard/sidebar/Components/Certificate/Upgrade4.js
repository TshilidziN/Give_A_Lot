import React, {Component} from 'react';
import "./Style/Certificate.css";
import 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { withStyles ,makeStyles } from '@material-ui/core/styles'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {ApiContext} from "../../../../../apiContext/ApiContext";
import OrgSidebar from "../DemoSidebar/OrgSidebar";
import {TextField} from "@material-ui/core";
import Axios from "axios";

const styles =theme => ({

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


export class Upgrade4 extends Component {
    static contextType = ApiContext;
    constructor (props) {
        super(props)
        this.state={
            orgId:localStorage.getItem("id"),
            file: "",
            fileError: "",
            images:"",
            imagesError:"",
            popUp1:false,
            popUp2:false,
            serverDomain: 'https://givealotcharities.herokuapp.com',
            frontEndDomain: 'https://givealot.netlify.app/',

        };
    }

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    handleFileChange = event => {
        const formData = new FormData();

        formData.append('file', event.target.files[0]);
        formData.append('orgId', this.state.orgId);
        let imageStates = 0;

        fetch(
            this.state.serverDomain + '/v1/organisation/add/audit',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                imageStates = 1;
                if(result.message==='success'){
                    this.setState({popUp1: true})
                    this.onToastFile();

                }



            })
            .catch((error) => {
                console.error('Error:', error);
                imageStates = 2;
                this.setState({popUp1: false});
                this.onToastFile();
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

    handleImageChange = event => {

        if( event.target.files.length < 5)
        {
            alert("minimum photos not met");
            return;
        }

        for(let idx = 0; idx <  event.target.files.length; idx++)
        {
            const formData_gallery_images = new FormData();
            formData_gallery_images.append('orgId', this.state.orgId);
            formData_gallery_images.append('image', event.target.files[idx]);

            console.log(event.target.files[idx])
            fetch(
                this.state.serverDomain +'/v1/organisation/add/image',
                {
                    method: 'POST',
                    body: formData_gallery_images,
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success-----:', result);
                    if(result.message==='success'){
                        this.setState({popUp2: true})
                        this.onToastImage();
                    }else {
                        this.setState({popUp2: false})
                        this.onToastFile();
                    }
                })
                .catch((error) => {
                    console.error('Error-----:', error);
                    this.setState({popUp2: false});
                    this.onToastImage();

                });

            const isCheckbox = event.target.type === "checkbox";
            this.setState({
                [event.target.name]: isCheckbox
                    ? event.target.checked
                    : event.target.value
            });
        }
    };

    validate = () => {
        let fileError = "";
        let imagesError = "";

        if (!this.state.file) {
            fileError = "required";
        }

        if(!this.state.images) {
            imagesError="required";
        }

        if( fileError || imagesError) {
            this.setState({ fileError,imagesError });
            return false;
        }

        return true;
    };

    handleFormSubmit = e => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {

            const notification_update_body = {
                org_id: this.state.orgId,
            };

            Axios
                .post(this.state.serverDomain + "/v1/notifications/update/notifications", notification_update_body)
                .then(res => console.log(res))
                .catch(err => console.log(err))

        }
    };


    onToastFile = () => {
        if(this.state.popUp1){

            toast.success('File Submitted ', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send File', {
                position: toast.POSITION.TOP_RIGHT

            });

        }
    }

    onToastImage= () => {
        if(this.state.popUp2){

            toast.success('Images Submitted', {
                position: toast.POSITION.TOP_RIGHT

            });
        }else{

            toast.error('failed to send Images', {
                position: toast.POSITION.TOP_RIGHT

            });
        }
    }


    render()
    {
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
                    <p className="upgradeTitle2">Four</p>
                </div>

                <div className="progress">
                    <div className="progress_complete"/>
                    <div className="progress_complete"/>
                    <div className="progress_complete"/>
                    <div className="progress_complete"/>
                    <div className="progress_empty"/>
                    <div className="progress6"> <StarOutlineIcon fontSize="large"/></div>
                </div>

                <Card className="upgrade_card" variant="outlined">
                    <CardContent>
                        <div className={classes.root}>
                            <form onSubmit={this.handleFormSubmit}>
                                <span className="upgrade_header">
                                   Additional credentials needed to Upgrade to level 5
                                 </span>
                                <span className="images_header">
                                   Please upload Atleast 5 pictures
                                 </span>
                                <div>
                                    <div>

                                       <span className="upgrade_label">
                                            Upload images
                                         </span>
                                        <input
                                            className="upgrade_images"
                                            accept="image/*"
                                            name="images"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={this.handleImageChange}

                                        />

                                    </div>
                                    <span className="loginError_certificate">{this.state.imagesError}</span>
                                    <div className="empty_space">
                                        empty space
                                    </div>
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
                                            type="file"
                                            name="file"
                                            label="Audit financial document"
                                            onChange={this.handleFileChange}
                                        />

                                    </div>
                                    <span className="loginError_certificate">{this.state.fileError}</span>
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

export default withStyles(styles)(Upgrade4);
