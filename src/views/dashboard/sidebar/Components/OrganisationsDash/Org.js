import React, { Component } from 'react'
import "../../styles/Organisations.css"
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, DescriptionOutlined} from "@material-ui/icons";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import AdminSidebar from "../DemoSidebar/AdminSidebar";

export class Org extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orgS:{},
            orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
            investigate: '',
            open: false,
            openInvestigate: false,
            openSuspend: false,
            serverDomain: 'https://givealotcharities.herokuapp.com'
        }
    }


    handleClose = () => {
        this.setState({ open: false });
    }
    handleCloseInvest = () => {
        this.setState({ openInvestigate: false });
    }
    handleCloseSuspend = () => {
        this.setState({ openSuspend: false });
    }

    componentDidMount(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(this.state.serverDomain  + '/v1/organisation/admin/sel/organisation/'+this.state.orgId, config)
            .then(response =>{
                this.setState({orgS: response.data.object})
            })
            .catch(error =>{
                console.log(error)
                this.setState({error : 'Error Retrieving data'})
            })
    }

    handleActivate() {
        this.setState({ open: true });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const activate = {
            orgID : window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
        }
        axios.put(this.state.serverDomain  + '/v1/organisation/activate/orgId',activate ,config)
            .then(response =>{
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })

    }

    handleInvestigate () {
        console.log(this.state.openInvestigate)
        this.setState({ openInvestigate: true });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const investigate = {
            orgID : window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
        }
        axios.put(this.state.serverDomain  + '/v1/organisation/investigate/orgId',investigate ,config)
            .then(response =>{
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })
    }

    handleSuspend() {
        this.setState({ openSuspend: true });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const suspend = {
            orgID : window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
        }
        axios.put(this.state.serverDomain  + '/v1/organisation/suspend/orgId',suspend ,config)
            .then(response =>{
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })

    }

    render() {
        const { orgS } = this.state
        return (
            <div className="trythis">
                <div>
                    <AdminSidebar />
                </div>
            <div className="org">
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" style={{width: "100%", height: "30%"}}/>
                <div className="orgCard">
                    <Card className="card1">
                        <CardContent>
                            <Typography color="textPrimary" gutterBottom>
                                <div className="userTitleContainerOrg">
                                    <div className="userTitleOrg">View Information</div>
                                </div>
                                <div >
                                    <div className="userShowTop">
                                        <div className="userShowTopTitle">
                                            <span className="userShowUsername">{orgS.orgName}</span>
                                            <span className="userShowUserTitle">{orgS.slogan}</span>
                                        </div>
                                    </div>
                                    <div className="userShowBottom">
                                        <span className="userShowTitle">Account Details</span>
                                        <div className="userShowInfo">
                                            <PermIdentity className="userShowIcon" />
                                            <span className="userShowInfoTitle">{orgS.orgName}</span>
                                        </div>
                                        <div className="userShowInfo">
                                            <CalendarToday className="userShowIcon" />
                                            <span className="userShowInfoTitle">{orgS.dateAdded}</span>
                                        </div>
                                        <span className="userShowTitle">Contact Details</span>

                                        <div className="userShowInfo">
                                            <PhoneAndroid className="userShowIcon" />
                                            <span className="userShowInfoTitle">{orgS.contactPerson}</span>
                                        </div>
                                        <div className="userShowInfo">
                                            <PhoneAndroid className="userShowIcon" />
                                            <span className="userShowInfoTitle">{orgS.contactNumber}</span>
                                        </div>
                                        <div className="userShowInfo">
                                            <MailOutline className="userShowIcon" />
                                            <span className="userShowInfoTitle">{orgS.orgEmail}</span>
                                        </div>
                                    </div>
                                </div>
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card className="card2">
                        <CardContent>
                            <Typography color="textPrimary" gutterBottom>
                                <div className="userShowBottom">
                                    <span className="userShowTitle">Status & Sector</span>
                                    <div className="userShowInfo">
                                        <LocationSearching className="userShowIcon" />
                                        <span className="userShowInfoTitle">{orgS.orgSector}</span>
                                    </div>
                                    <div className="userShowInfo">
                                        <LocationSearching className="userShowIcon" />
                                        <span className="userShowInfoTitle">{orgS.status}</span>
                                    </div>
                                    <span className="userShowTitle">Description</span>
                                    <div className="userShowInfoO">
                                        <p className="userShowInfoTitle">
                                            {orgS.orgDescription}
                                        </p>
                                    </div>

                                </div>
                            </Typography>
                        </CardContent>
                        <Typography className="_orgButtons">
                            <div>
                                <Button  type="submit" variant="contained" color="primary"
                                         onClick={this.handleActivate.bind(this)}
                                >
                                    Activate
                                </Button>
                                <Dialog onClose={this.handleClose.bind(this)} open={this.state.open}>
                                    <DialogTitle>Organisation Successfully Activated</DialogTitle>
                                    <DialogContent>
                                        <Button variant="contained" color="primary"
                                                onClick={this.handleClose.bind(this)}
                                                style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}
                                        >
                                            Close
                                        </Button>
                                    </DialogContent>
                                </Dialog>

                            </div>

                            <div>
                                <Button type="submit" variant="contained" style={{color: "white", backgroundColor: "orange"}}
                                        onClick={this.handleInvestigate.bind(this)}
                                >
                                    Investigate
                                </Button>
                                <Dialog onClose={this.handleCloseInvest.bind(this)} open={this.state.openInvestigate}>
                                    <DialogTitle>Organisation Investigate</DialogTitle>
                                    <DialogContent>
                                        <Button variant="contained" color="primary"
                                                onClick={this.handleCloseInvest.bind(this)}
                                                style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}
                                        >
                                            Close
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div>
                                <Button type="submit" variant="contained" color="secondary"
                                        onClick={this.handleSuspend.bind(this)}
                                >
                                    Suspend
                                </Button>
                                <Dialog onClose={this.handleCloseSuspend.bind(this)} open={this.state.openSuspend}>
                                    <DialogTitle>Organisation Suspended</DialogTitle>
                                    <DialogContent>
                                        <Button variant="contained" color="primary"
                                                onClick={this.handleCloseSuspend.bind(this)}
                                                style={{paddingTop: "0.5em", paddingBottom: "0.5em"}}
                                        >
                                            Close
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            </div>

                        </Typography>

                    </Card>
                </div>
            </div>
            </div>
        )
    }
}

export default Org
