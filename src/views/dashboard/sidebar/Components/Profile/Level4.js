import React, {Component} from 'react';
import "../Certificate/Style/Certificate.css";
import 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { withStyles ,makeStyles } from '@material-ui/core/styles'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {ApiContext} from "../../../../../apiContext/ApiContext";

const styles = theme => ({

    root: {
        display: "flex",
        flexWrap: "wrap"
    },

});

const initialState = {
    orgId:localStorage.getItem("id"),
    file: "",
    fileState: false,
    images:"",
    imagesState:false,
    serverDomain: 'https://givealotcharities.herokuapp.com',

};

export class Level4 extends Component {

    state = initialState;
    static contextType = ApiContext;
    constructor (props) {
        super(props)
        this.state={

        };
    }

    handleFileChange = event => {

        this.setState({fileState: true})
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

    handleImageChange = event => {

        this.setState({imagesState: true})
        const formData = new FormData();
        formData.append('image', event.target.files);
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
    };

    onToast4 = () => {
        if ( this.state.imagesState || this.state.fileState ) {
            toast.success('Submit successful', {
                position: toast.POSITION.TOP_RIGHT

            });
        }
    }

    render(){
        const { classes } = this.props;
        return (
            <div className="upgrade">

                <Card className="upgrade_cardd" variant="outlined">
                    <CardContent>
                        <div className={classes.root}>
                            <form onSubmit={this.handleFormSubmit}>
                                <span className="upgrade_header">
                                   Additional credentials needed to Upgrade
                                 </span>
                                <div>

                                    <div>
                                        <span className="upgrade_label">
                                            Upload images 2222
                                         </span>
                                        <input
                                            className="upgrade_datee"
                                            accept="image/*"
                                            name='images'
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={this.handleImageChange}

                                        />
                                        <div className="profile_files">
                                            <img src="https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg" height={70} width={70} />
                                            <img src="https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg" height={70} width={70} />
                                            <img src="https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg" height={70} width={70} />
                                            <img src="https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg" height={70} width={70} />
                                            <img src="https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg" height={70} width={70} />
                                            <img src="https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg" height={70} width={70} />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="upgrade_label_logo">
                                            Audit financial document
                                         </span>
                                        <input
                                            className="upgrade_logoo"
                                            type="file"
                                            name="file"
                                            onChange={this.handleFileChange}
                                        />
                                    </div>
                                </div>
                                <div className="upgrade_Button">
                                    <button className="upgrade-btnn" type="submit" onClick={this.onToast4}>
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
export default withStyles(styles)(Level4);
