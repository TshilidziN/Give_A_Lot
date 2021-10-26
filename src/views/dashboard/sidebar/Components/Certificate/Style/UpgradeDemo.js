
import React, {Component} from 'react';
import "./Style/Certificate.css";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from '@material-ui/core/styles'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from "axios";


const useStyles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
});

export class Upgrade extends Component {

    constructor (props) {
        super(props)
        this.state = {
            startDate: "",
            startDate2: new Date(),
            orgId: "36",
            type: "instagram",
            url:"",
            website: "",
            address:"",
            reference:"",
            committee:"",
            date:"",
            ngoNumber:"",
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);


    }

    handleChange(date) {
        this.setState({startDate: date, date:document.getElementsByClassName("input3")[0].value} )

    }

    /*handleNGOChange(date) {
        this.setState({startDate2: date, date:document.getElementsByClassName("input4")[0].value} )
        console.log(document.getElementsByClassName("input4")[0].value)
    }*/

    onFormSubmit(e) {
        e.preventDefault();
        const data = {
            orgId: this.state.orgId,
            date: this.state.date,

        };
        console.log(data)
        Axios
            .post("http://localhost:8080/v1/organisation/add/estdate", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    onToast = () => {
        toast.success('upload success',{
            position: toast.POSITION.TOP_RIGHT

        });
    }


    handleInputChange = e => {
        this.setState({website: e.target.value});

    };
    handleAddressInputChange = e => {
        this.setState({address: e.target.value});

    };


    handleInstaInputChange = e => {
        this.setState({url: e.target.value});

    };
    handleTaxInputChange = e => {
        this.setState({reference: e.target.value});

    };
    handleCommitteeInputChange = e => {
        this.setState({committee: e.target.value});

    };

    handleNGOInputChange = e => {
        this.setState({ngoNumber: e.target.value});

    };

    handleDateInputChange = e => {
        this.setState({date: e.target.value});

    };

    handleFormChange = e => {
        e.preventDefault();

        const data = {
            orgId: this.state.orgId,
            website: this.state.website
        };
        console.log(data)
        Axios
            .post("http://localhost:8080/v1/organisation/add/website", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    handleAddressFormChange = e => {
        e.preventDefault();
        const data = {
            orgId: this.state.orgId,
            address: this.state.address,
        };
        Axios
            .post("http://localhost:8080/v1/organisation/add/address", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    handleInstaFormChange = e => {
        e.preventDefault();
        const data = {
            orgId: this.state.orgId,
            type: this.state.type,
            url: this.state.url,
        };
        console.log(data)
        Axios
            .post("http://localhost:8080/v1/organisation/add/socials", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    handleTaxFormChange = e => {
        e.preventDefault();
        const data = {
            orgId: this.state.orgId,
            reference: this.state.reference,

        };
        Axios
            .post("http://localhost:8080/v1/organisation/add/taxref", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    handleCommitteeFormChange = e => {
        e.preventDefault();
        const data = {
            orgId: this.state.orgId,
            committee: this.state.committee,

        };
        Axios
            .post("http://localhost:8080/v1/organisation/add/committee", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    handleNGOFormChange = e => {
        e.preventDefault();
        const data = {
            orgId: this.state.orgId,
            ngoNumber: this.state.ngoNumber,
            date: this.state.date,

        };
        console.log(data)
        Axios
            .post("http://localhost:8080/v1/organisation/add/ngo", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };



    render(){
        const { classes } = this.props;

        /*  let message
          if(this.state.status1){
              message = <div className="contain_Icon"><CheckCircleIcon className="tick_Icon"/></div>
          }*/


        return (
            <div className="upgrade">
                <div className="upgrade_heading">
                    <p className="upgrade_level"> Fill in the outstanding details</p>
                    {/*<p className="upgrade_status"> Intermediate</p>*/}

                </div>
                <div className="upgrade_container">
                    <div className="contain">





                        <div className="upgrade_form">
                            <label className="upgrade_sublabel">Enter Establishment date</label>
                        </div>

                        <div >
                            <form onSubmit={ this.onFormSubmit } className="upgrade_form">
                                <div >
                                    <DatePicker
                                        selected={ this.state.startDate }
                                        onChange={ this.handleChange }
                                        name="startDate"
                                        dateFormat="dd/MM/yyyy"
                                        className="input1 input3"
                                    />

                                </div>


                                <input type="submit" value="Submit" className="submit1" onClick={this.onToast}/>
                                {}
                                <div className="form-group">
                                    <ToastContainer/>
                                </div>
                            </form>
                        </div>


                        <div className="upgrade_form" >
                            <label className="upgrade_label">Social media section</label>
                        </div>

                        <form className="upgrade_form" onSubmit={this.handleInstaFormChange} >
                            <input
                                name="socialMedia1"
                                type="text"
                                placeholder="Enter your social media url"
                                className="input1"
                                onChange={this.handleInstaInputChange}
                            />
                            <input type="submit" value="Submit" className="submit1" onClick={this.onToast}/>
                            {}
                            <div className="form-group">
                                <ToastContainer/>
                            </div>
                        </form>
                        <form className="upgrade_form">
                            <input
                                name="socialMedia2"
                                type="text"
                                placeholder="Enter your social media url"
                                className="input1"
                            />
                            <input type="submit" value="Submit" className="submit1" onClick={this.onToast}/>
                            {}
                            <div className="form-group">
                                <ToastContainer/>
                            </div>
                        </form>


                        <div className="upgrade_form">
                            <label className="upgrade_label">Organisation images section</label>
                        </div>
                        <div className="upgrade_form">
                            <label className="upgrade_sublabel">Upload up to 10 images, each image has 1 point</label>
                        </div>

                        <div className="upgrade_form1">
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button  size="small" variant="contained"  component="span">
                                    <AddAPhotoIcon  /> Choose a file
                                </Button>
                            </label>
                            <input type="submit" value="Upload" className="img_submit" onClick={this.onToast}/>
                            {}
                            <div className="form-group">
                                <ToastContainer/>
                            </div>
                        </div>

                    </div>





                    <div className="contain2">

                        <form className="upgrade_form" onSubmit={this.handleTaxFormChange}>
                            <input
                                name="tax"
                                type="text"
                                placeholder="Enter your Tax reference number"
                                className="input1"
                                onChange={this.handleTaxInputChange}
                            />
                            <input type="submit" value="Submit" className="submit1" onClick={this.onToast}/>

                            {}
                            <div className="form-group">
                                <ToastContainer/>
                            </div>
                        </form>

                        <form className="upgrade_form" onSubmit={this.handleCommitteeFormChange}>
                            <input
                                name="committee"
                                type="text"
                                placeholder="Enter Committee details"
                                className="input1"
                                onChange={this.handleCommitteeInputChange}
                            />
                            <input type="submit" value="Submit" className="submit1" onClick={this.onToast}/>
                            {}
                            <div className="form-group">
                                <ToastContainer/>
                            </div>
                        </form>


                        <div className="upgrade_form">
                            <label className="upgrade_label">NGO Registration section</label>
                        </div>

                        <form  onSubmit={this.handleNGOFormChange}>
                            <input
                                name="registered_no"
                                type="text"
                                placeholder="Enter your registered NGO number"
                                className="input1"
                                onChange={this.handleNGOInputChange}

                            />


                            <div className="upgrade_form">
                                <label className="upgrade_sublabel">Date the NGO was registered</label>
                            </div>


                            <input
                                selected={ this.state.startDate2 }
                                type="text"
                                onChange={ this.handleDateInputChange }
                                placeholder="Enter Date NGO was registered"
                                name="startDate2"
                                className="input1 input4"
                            />


                            <input type="submit" value="Submit" className="submit1" onClick={this.onToast}/>
                            {}
                            <div className="form-group">
                                <ToastContainer/>
                            </div>

                        </form>


                        <div className="upgrade_form">
                            <label className="upgrade_label">Organisation Auditing section</label>
                        </div>

                        <div className="upgrade_form">
                            <label className="upgrade_sublabel">Upload your Audit document</label>
                        </div>

                        <form className="upgrade_form">

                            <input type="file" name="file"  className="form_file"/>
                            <input type="submit" value="Upload" className="file_submit" onClick={this.onToast}/>
                            {}
                            <div className="form-group">
                                <ToastContainer/>
                            </div>
                        </form>



                        <div className="upgrade_form">
                            <label className="upgrade_sublabel">Upload the Auditors certificate</label>
                        </div>

                        <form className="upgrade_form">

                            <input type="file" name="file"  className="form_file"/>
                            <input type="submit" value="Upload" className="file_submit" onClick={this.onToast}/>
                            {}
                            <div className="form-group">
                                <ToastContainer/>
                            </div>
                        </form>


                        <div className="upgrade_form">
                            <label className="upgrade_label">Organisation Donation section</label>
                        </div>

                        <div className="upgrade_form">
                            <label className="upgrade_sublabel">Upload your donation certificate</label>
                        </div>

                        <form className="upgrade_form">

                            <input type="file" name="file"  className="form_file"/>
                            <input type="submit" value="Upload" className="file_submit" onClick={this.onToast}/>
                            { }
                            <div className="form-group">
                                <ToastContainer/>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(useStyles)(Upgrade)