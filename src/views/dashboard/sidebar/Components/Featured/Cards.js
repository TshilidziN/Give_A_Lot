import React, { Component } from 'react'
import "./Styles/Featured.css"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ReportIcon from '@material-ui/icons/Report';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import axios from "axios";
import {ApiContext} from "../../../../../apiContext/ApiContext";

export class Cards extends Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props)

        this.state = {
            Users: '',
            Organisations: '',
            notifications: '',
            adminUserEmail:localStorage.getItem('curr_user_email'),
            orgId: null,
            reports: [],
            adminId: localStorage.getItem('id'),
            serverDomain: "https://givealotcharities.herokuapp.com",
        }
    }

    componentDidMount(){
        this.getUsers();
        this.getOrganisations();
        this.getNotifications();
        this. getReports();
    }

    getReports(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        const adminReportRequestBody = {
            "orgId" : this.state.adminId
        }

        axios.post(this.state.serverDomain + '/report/get/appealed', adminReportRequestBody ,config)
            .then(response =>{
                console.log(response.data.object)
                this.setState({reports: response.data.object})
            })
            .catch(error =>{
                console.log(error)
            })
    }

    getUsers(){
        if(localStorage.getItem('role') === 'admin') {
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                }
            }
            const adminUsersRequestBody = {
                "adminUserEmail": this.state.adminUserEmail
            }

            axios.post(this.state.serverDomain + '/v1/user/get/num_user', adminUsersRequestBody, config)
                .then(response => {
                    this.setState({Users: response.data.response})

                })
                .catch(error => {
                    this.setState({error: 'Error Retrieving data'})
                })
        }
    }

    getOrganisations(){
        if(localStorage.getItem('role') === 'admin'){
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                }
            }
            const adminUsersRequestBodyOrg = {
                "adminId" : this.state.adminId
            }
            axios.post(this.state.serverDomain + '/v1/organisation/get/organisations',adminUsersRequestBodyOrg , config)
                .then(response =>{
                    this.setState({ Organisations: response.data.response })

                })
                .catch(error =>{
                    alert(error)
                    this.setState({error : 'Error Retrieving data'})
                })
        }

    }

    getNotifications(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const adminUsersRequestBodyNotification = {
            "adminUserEmail" : this.state.adminUserEmail
        }
        axios.post(this.state.serverDomain + '/v1/notifications/get/num_notifications',adminUsersRequestBodyNotification , config)
            .then(response =>{
                this.setState({ notifications: response.data.response })
            })
            .catch(error =>{
                this.setState({error : 'Error Retrieving data'})
            })
    }

    render() {
        const { Users , Organisations, notifications, reports} = this.state
        return (
            <div style={{display: "flex"}} className= "featuredCards">
                <Card variant="outlined" className="cardElement">
                    <CardContent style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                        <div>
                            <div color="textPrimary">
                                Users
                            </div>
                            <div color="textSecondary">
                                {Users}
                            </div>
                        </div>
                        <div color="textSecondary" className="cardIconUser" >
                            <PersonOutlineIcon />
                        </div>
                    </CardContent>
                </Card>

                <Card variant="outlined" className="cardElement">
                    <CardContent style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                        <div>
                            <div color="textPrimary">
                                Organisations
                            </div>
                            <div color="textSecondary">
                                {Organisations.length}
                            </div>
                        </div>
                        <div color="textSecondary" className="cardIconOrg" >
                            <PeopleOutlineIcon />
                        </div>
                    </CardContent>
                </Card>

                <Card variant="outlined" className="cardElement">
                    <CardContent style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                        <div>
                            <div color="textPrimary">
                                Reports
                            </div>
                            <div color="textSecondary">
                                {reports.length}
                            </div>
                        </div>
                        <div color="textSecondary" className="cardIconReports" >
                            <ReportIcon />
                        </div>
                    </CardContent>
                </Card>

                <Card variant="outlined" className="cardElement">
                    <CardContent style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                        <div>
                            <div color="textPrimary">
                                Notifications
                            </div>
                            <div color="textSecondary">
                                {notifications}
                            </div>
                        </div>
                        <div color="textSecondary" className="cardIconNotifications" >
                            <NotificationsOutlinedIcon />
                        </div>
                    </CardContent>
                </Card>

            </div>

        )
    }
}

export default Cards
