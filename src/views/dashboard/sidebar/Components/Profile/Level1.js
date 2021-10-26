import React, {Component} from 'react';
import "../Certificate/Style/Certificate.css";
import 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from '@material-ui/core/styles'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
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
        width: "30ch",


    },

});


export class Level1 extends Component {

    static contextType = ApiContext;
    constructor (props) {
        super(props)
        this.state={
            level1:{},
            orgId:localStorage.getItem("id"),
            //orgId:60,
            website: "",
            websiteState: false,
            address:"",
            addressState:false,
            serverDomain: 'https://givealotcharities.herokuapp.com',
        };
    }



    handleWebsite=event=>{
        this.setState({websiteState: true})
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    }

    handleAddress =event=>{
        this.setState({addressState: true})
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    }

    handleFormSubmit = e => {
        e.preventDefault();

        if(this.state.websiteState) {
            const web = {
                orgId: this.state.orgId,
                website: this.state.website,

            };

            Axios
                .post(this.state.serverDomain + "/v1/organisation/add/website", web)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }

        if(this.state.addressState) {
            const add = {
                orgId: this.state.orgId,
                address: this.state.address,

            };

            Axios
                .post(this.state.serverDomain + "/v1/organisation/add/address", add)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    };

    onToast1 = () => {
        if ( this.state.websiteState || this.state.addressState) {
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
                this.setState({level1: response.data.response})
            })
            .catch(error =>{
                console.log(error)
                this.setState({error : 'Error Retrieving data'})
            })

    }



    render(){
        const { classes } = this.props;
        const { level1 } = this.state;



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

                                <TextField
                                    id="outlined-full-width"
                                    label="Website"
                                    name="website"
                                    style={{ margin: 8 }}
                                    placeholder={level1.orgEmail}

                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={this.handleWebsite}
                                />
                                <TextField
                                    id="outlined-full-width"
                                    label="Address"
                                    name="address"
                                    style={{ margin: 8 }}
                                    placeholder={level1.orgEmail}

                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={this.handleAddress}
                                />
                            </div>
                                <div className="upgrade_Button">
                                    <button className="upgrade-btnn" type="submit" onClick={this.onToast1}>
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
export default withStyles(styles)(Level1);
