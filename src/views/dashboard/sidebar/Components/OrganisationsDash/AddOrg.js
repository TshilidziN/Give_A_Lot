import React, { Component } from 'react'
import "../../styles/Organisations.css"
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import axios from "axios";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

const initialState = {
    orgName : "",
    orgNameError: '',
    slogan : "",
    sloganError: '',
    orgDescription : "",
    orgDescriptionError: "",
    orgSector : "",
    orgSectorError: '',
    orgEmail : "",
    orgEmailError : "",
    contactPerson : "",
    contactPersonError : "",
    contactNumber : "",
    contactNumberError: '',
    password : "",
    passwordError: '',
    image: '',
    imageError: '',
    sectorS: [],
    openAdd: false,
    serverDomain: "https://givealotcharities.herokuapp.com"
};

export class AddOrg extends Component {
    state = initialState;

    validated = () => {
        let isErrors = false;

            let orgNameError = '';
            let orgEmailError = "";
            let passwordError = '';
            let sloganError = '';
            let orgSectorError = '';
            let orgDescriptionError = '';
            let contactPersonError = "";
            let contactNumberError = '';
            let imageError = '';

        if(this.state.orgEmail.indexOf('@') === -1){
            orgEmailError = 'Please enter a valid email address';
        }
        if(this.state.password.length < 4){
            passwordError = 'Password must be at least 4 characters long';
        }
        if(this.state.orgName.length < 1){
            orgNameError = 'orgName cannot be blank';
        }
        if(this.state.slogan.length < 1){
            sloganError = 'slogan cannot be blank';
        }

        if(this.state.orgSector.length < 1){
            orgSectorError = 'Sector cannot be blank';
        }

        if(this.state.orgDescription.length < 1){
            orgDescriptionError = 'Description cannot be blank';
        }
        if (!this.state.contactNumber.match(/^[0-9]{10}$/)) {
            contactNumberError = "Please enter valid mobile number";
        }
        if(this.state.contactPerson.length < 1){
            contactPersonError = 'Contact person cannot be blank';
        }
        if (!this.state.orgEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            orgEmailError = "Please enter email address";
        }

        if (orgEmailError || contactPersonError || contactNumberError || orgDescriptionError || orgSectorError || sloganError || orgNameError || passwordError) {
            this.setState({ orgEmailError, contactPersonError,contactNumberError, orgDescriptionError, orgSectorError, sloganError, orgNameError, passwordError});
            return false;
        }

        return true;
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }
    handleCloseAdd = () => {
        this.setState({ openAdd: false });

    }

    componentDidMount(){
        this.getSectorS();
    }

    getSectorS(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(this.state.serverDomain + '/v1/organisation/get/sectors',  config)
            .then(response =>{
                this.setState({sectorS: response.data.sectors})
            })
            .catch(error =>{
                this.setState({error : 'Error Retrieving data'})
            })
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const isValid = this.validated();
        if (isValid) {
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                }
            }
            console.log(this.state)
            axios.post(this.state.serverDomain + '/v1/organisation/add/org', this.state, config)
                .then(response =>{
                    console.log(response)
                    this.setState({ openAdd: true });
                })
                .catch(error =>{
                    console.log(error)
                })
            this.setState(initialState);
        }
    }

    render() {

        const {orgName, slogan, orgEmail, password, orgSector, contactPerson, contactNumber, orgDescription, sectorS} = this.state

        return (
            <div className="add">
                <div  style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1em", flexGrow: 2, width: "50%"}}>
                    <Card>
                        <CardContent>
                            <form onSubmit={this.submitHandler}>
                                <div>
                                    <Grid>
                                        <TextField
                                            id="outlined-full-width"
                                            label="Organisation Name"
                                            style={{ margin: 8 }}
                                            placeholder="Organisation Name"
                                            fullWidth
                                            margin="normal"
                                            minLength="8"
                                            maxLength="20"
                                            variant="outlined"
                                            name="orgName"
                                            onChange={this.changeHandler}
                                            value={orgName}
                                        />
                                    </Grid>
                                    <span className="error">{this.state.orgNameError}</span>
                                </div>

                                <div>
                                    <Grid>
                                        <TextField
                                            id="outlined-full-width"
                                            label="Slogan"
                                            style={{ margin: 8 }}
                                            placeholder="Slogan"
                                            fullWidth
                                            margin="normal"
                                            minLength="15"
                                            maxLength="50"
                                            variant="outlined"
                                            name="slogan"
                                            onChange={this.changeHandler}
                                            value={slogan}
                                        />

                                    </Grid>
                                    <span className="error">{this.state.sloganError}</span>
                                </div>

                                <div>
                                    <Grid>
                                        <TextField
                                            id="outlined-full-width"
                                            label="Email"
                                            type="email"
                                            style={{ margin: 8 }}
                                            placeholder="Email"
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            name="orgEmail"
                                            onChange={this.changeHandler}
                                            value={orgEmail}
                                        />

                                    </Grid>
                                    <span className="error">{this.state.orgEmailError}</span>
                                </div>

                                <div>
                                    <Grid>
                                        <TextField
                                            id="outlined-full-width"
                                            label="Password"
                                            type="password"
                                            style={{ margin: 8 }}
                                            placeholder="Password"
                                            fullWidth
                                            margin="normal"
                                            minLength="8"
                                            maxLength="15"
                                            variant="outlined"
                                            name="password"
                                            onChange={this.changeHandler}
                                            value={password}

                                        />

                                    </Grid>
                                    <span className="error">{this.state.passwordError}</span>
                                </div>

                                <div>
                                    <Grid>
                                        <Select
                                            variant="outlined"
                                            native
                                            style={{ margin: 8 }}
                                            label="Sector"
                                            fullWidth
                                            placeholder="Placeholder"
                                            name="orgSector"
                                            onChange={this.changeHandler}
                                            value={orgSector}
                                        >
                                            <option key="kidsNextDoors">Enter Sector</option>
                                            {sectorS.map((item) =>
                                                <option key={item} value={item}>{item}</option>
                                            )}
                                        </Select>

                                    </Grid>
                                    <span className="error">{this.state.orgSectorError}</span>
                                </div>

                                <div>
                                    <Grid>
                                        <TextField
                                            id="outlined-full-width"
                                            label="Contact Person"
                                            type="text"
                                            style={{ margin: 8 }}
                                            placeholder="Contact Person"
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            name="contactPerson"
                                            onChange={this.changeHandler}
                                            value={contactPerson}
                                        />

                                    </Grid>
                                    <span className="error">{this.state.contactPersonError}</span>
                                </div>

                                <div>
                                    <Grid>
                                        <TextField
                                            id="outlined-full-width"
                                            label="Contact Number"
                                            type="text"
                                            style={{ margin: 8 }}
                                            placeholder="Contact Number"
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            name="contactNumber"
                                            // minLength="8"
                                            maxLength="10"
                                            onChange={this.changeHandler}
                                            value={contactNumber}
                                        />

                                    </Grid>
                                    <span className="error">{this.state.contactNumberError}</span>
                                </div>

                                <div>
                                    <Grid>
                                        <TextField
                                            style={{ margin: 8 }}
                                            placeholder="Description"
                                            fullWidth
                                            multiline
                                            maxRows={4}
                                            margin="normal"
                                            minLength="50"
                                            maxLength="100"
                                            variant="outlined"
                                            id="outlined-textarea"
                                            label="Description"
                                            name="orgDescription"
                                            onChange={this.changeHandler}
                                            value={orgDescription}
                                        />
                                    </Grid>
                                    <span className="error">{this.state.orgDescriptionError}</span>
                                </div>

                                <Grid>
                                    <Button variant="contained" type="submit" className="addBtn"
                                            onClick={this.submitHandler.bind(this)}
                                    >
                                        Submit
                                    </Button>
                                    <Dialog onClose={this.handleCloseAdd.bind(this)} open={this.state.openAdd}>
                                        <DialogTitle>NGO Number Accepted</DialogTitle>
                                        <DialogContent>
                                            <Button variant="contained" color="primary"
                                                    onClick={this.handleCloseAdd.bind(this)}
                                                    style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}
                                            >
                                                Close
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </div>

            </div>
        )
    }
}

export default AddOrg
