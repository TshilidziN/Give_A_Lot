import React , { Component } from 'react'
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import "../../styles/Organisations.css"
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import EditIcon from '@material-ui/icons/Edit';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import AddOrg from "./AddOrg";
import Divider from '@material-ui/core/Divider';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AdminSidebar from "../DemoSidebar/AdminSidebar";

export class OrganisationsDash extends Component {

    constructor(props) {
        super(props)
        this.state = {
            org:[],
            error: "",
            sector: "",
            open: false,
            openAdd: false,
            getSector: [],
            adminId: localStorage.getItem('id'),
            openSector: false,
            serverDomain: 'https://givealotcharities.herokuapp.com',
            frontEndDomain: 'https://givealot.netlify.app'
        }
    }

    openDialog() {
        this.setState({ open: true });
    }
    openDialogAdd() {
        this.setState({ openAdd: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCloseAdd = () => {
        this.setState({ openAdd: false });
    };
    handleCloseSector = () => {
        this.setState({ openSector: false });

    }

    componentDidMount(){
        this.getSectors();
        this.getOrganisations();
    }
    getOrganisations(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const adminUsersRequestBodyOrgs = {
            "adminId" : this.state.adminId
        }
        axios.post(this.state.serverDomain + '/v1/organisation/get/organisations',adminUsersRequestBodyOrgs , config)
            .then(response =>{
                console.log(response)
                this.setState({org: response.data.response})
            })
            .catch(error =>{
                this.setState({error : 'Error Retrieving data'})
            })
    }
    getSectors(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(this.state.serverDomain + '/v1/organisation/get/sectors',  config)
            .then(response =>{
                this.setState({getSector: response.data.sectors})
            })
            .catch(error =>{
                this.setState({error : 'Error Retrieving data'})
            })
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }

    submitSector = (e) =>{
        e.preventDefault();
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const AddSector = {
            "sector" : this.state.sector,
            "adminId" : this.state.adminId
        }
        axios.post(this.state.serverDomain + '/v1/organisation/add/sector', AddSector ,config)
            .then(response =>{
                this.setState({ openSector: true });
            })
            .catch(error =>{
                console.log(error)
            })
    }

    render () {
        if(localStorage.getItem("id") === null ||
            localStorage.getItem("id") === undefined ||
            localStorage.getItem("id") === 'default')
        {
            window.location.href = this.state.frontEndDomain + "/login";
        }

        const { org, getSector, sector } = this.state
        return(
            <div className="trythis">

                <div>
                    <AdminSidebar />
                </div>
                <div className="OrganisationsDash">
                    <div className="userTitle">
                        All Organisations on Givealot
                    </div>
                    <div className="OrgAdd">
                        <div className="orgAddBtn" style={{display: "flex", alignItems: "center", alignContent: "space-between"}}>
                            <Button variant="contained" className="buttonAdd" onClick={this.openDialogAdd.bind(this)}>
                                Add Organisation
                                <AddCircleOutlinedIcon/>
                            </Button>
                            <Dialog onClose={this.handleCloseAdd.bind(this)} open={this.state.openAdd}>
                                <DialogTitle>Add Organisation</DialogTitle>
                                <DialogContent>
                                    <AddOrg />
                                </DialogContent>
                            </Dialog>
                            <Button variant="contained" className="buttonAddSector" onClick={this.openDialog.bind(this)}>
                                Create Sector
                                <AddCircleOutlinedIcon/>
                            </Button>
                            <Dialog onClose={this.handleClose.bind(this)} open={this.state.open} style={{width: "100%"}}>
                                <DialogTitle style={{color: "#957b9e"}}>Create a Sector</DialogTitle>
                                <DialogContent style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <div>
                                        <form onSubmit={this.submitSector}>
                                            <TextField
                                                id="outlined-full-width"
                                                label="Sector"
                                                placeholder="Sector"
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                name="sector"
                                                onChange={this.changeHandler}
                                                value={sector}
                                            />
                                            <Button variant="contained" className="buttonAdd" type="submit"
                                                    onSubmit={this.submitSector}
                                            >
                                                Submit
                                            </Button>
                                            <Dialog onClose={this.handleCloseSector.bind(this)} open={this.state.openSector}>
                                                <DialogTitle>Sector Added</DialogTitle>
                                                <DialogContent>
                                                    <Button variant="contained" color="primary"
                                                            onClick={this.handleCloseSector.bind(this)}
                                                            style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}
                                                    >
                                                        Close
                                                    </Button>
                                                </DialogContent>
                                            </Dialog>
                                        </form>
                                        <Divider style={{marginTop: "2em"}}/>
                                        <div>
                                            <div style={{marginBottom: "1em",marginTop: "1em", color: "#957b9e",fontSize: "x-large"}}>View Available Sectors</div>
                                            <div>
                                                {getSector.map((sector) =>{
                                                    return(
                                                        <li key={sector} value={sector}>
                                                            {sector}
                                                        </li>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        {/*<div className="header__input">*/}
                        {/*    <input placeholder="search organisation" type="text" />*/}
                        {/*    <SearchIcon/>*/}
                        {/*</div>*/}
                    </div>

                    <div className="table">
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <TableContainer component={Paper}>
                                    <Table >
                                        <TableHead style={{backgroundColor: "#957b9e"}}>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell style={{color: "white", fontWeight: "bold"}}>Name</TableCell>
                                                <TableCell style={{color: "white", fontWeight: "bold"}}>Email</TableCell>
                                                <TableCell style={{color: "white", fontWeight: "bold"}}>Contact Person</TableCell>
                                                <TableCell style={{color: "white", fontWeight: "bold"}}>Contact Number</TableCell>
                                                <TableCell style={{color: "white", fontWeight: "bold"}}>Sector</TableCell>
                                                <TableCell style={{color: "white", fontWeight: "bold"}}>Status</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {org.map((item) =>{
                                                return(
                                                    <TableRow key={item.orgId}>
                                                        <TableCell><Avatar aria-label="recipe" src={item.logo} /> </TableCell>
                                                        <TableCell>{item.orgName}</TableCell>
                                                        <TableCell>{item.orgEmail}</TableCell>
                                                        <TableCell>{item.contactPerson}</TableCell>
                                                        <TableCell>{item.contactNumber}</TableCell>
                                                        <TableCell>{item.orgSector}</TableCell>
                                                        <TableCell>{item.status}</TableCell>
                                                        <TableCell>
                                                            <Link to={"/org/" + item.orgId} className="link">
                                                                <EditIcon />
                                                            </Link>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </div>
                </div>

    </div>

            );
    }


}

export default OrganisationsDash
