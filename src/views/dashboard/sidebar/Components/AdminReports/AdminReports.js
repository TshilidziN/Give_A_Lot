import React, { Component } from 'react';
import "./AdminReports.css"
import AdminSidebar from "../DemoSidebar/AdminSidebar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import Button from "@material-ui/core/Button";

export class AdminReports extends Component {

    constructor(props) {
        super(props);

        this.state={
            adminId:localStorage.getItem('id'),
            serverDomain: "https://givealotcharities.herokuapp.com",
            frontEndDomain: 'https://givealot.netlify.app/',
            AdminReports: []
        };
    }

    componentDidMount(){
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
                this.setState({AdminReports: response.data.object})
            })
            .catch(error =>{
                console.log(error)
            })
    }

    render() {

        if(localStorage.getItem("id") === null ||
            localStorage.getItem("id") === undefined ||
            localStorage.getItem("id") === 'default')
        {

            window.location.href = this.state.frontEndDomain + "/login";
        }

        const { AdminReports } = this.state
        return (
            <div className="trythis">
                <div>
                    <AdminSidebar />
                </div>

                <div className="adminReports">
                    <div className="reportHeader">
                        Reports list
                    </div>
                    {AdminReports.map((item) => {
                        return (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{item.reportType}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {item.description}
                                    </Typography>
                                    <Typography className="buttonsAdminReports">
                                        <div className="acceptReport">
                                            <Button variant="contained" className="buttonReportAccept">
                                                Accept
                                            </Button>
                                        </div>

                                        <div className="denyReport">
                                            <Button variant="contained" className="buttonReportDeny">
                                                Deny
                                            </Button>
                                        </div>
                                    </Typography>

                                </AccordionDetails>
                            </Accordion>
                        )
                    })}

                </div>
            </div>
        )
    }
}

export default AdminReports
