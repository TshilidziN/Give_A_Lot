import React, {Component} from 'react'
import "./Style/Reports.css"
import Accordions from "./Accordions"
import axios from "axios";
import {ApiContext} from "../../../../../apiContext/ApiContext";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import OrgSidebar from "../DemoSidebar/OrgSidebar";

export class Reports extends Component {

    static contextType = ApiContext;
    constructor(props) {
        super(props)
        this.state = {
            count: "",
            reports: [],
            orgId:localStorage.getItem("id"),
            error: "",
            serverDomain: 'https://givealotcharities.herokuapp.com',
            frontEndDomain: 'https://givealot.netlify.app'
        }
    }
    componentDidMount(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const dataa = {
            "orgId" : this.state.orgId
        }

        axios.post(this.state.serverDomain + '/report/get/all', dataa  ,config)
            .then(response =>{
                this.setState({reports: response.data.object})
                console.log(response)
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
        const { reports } = this.state
     if(reports.length === 0){
            return(
                <div className="trythis">
                    <div>
                        <OrgSidebar />
                    </div>
                <div className="report">
                    <div className="reportHeader">
                        Reports list
                    </div>
                    <Card style={{margin: "1em", width: "100%"}}>
                        <CardContent>
                            <Typography className="valid">
                                <Typography>
                                    No Reports
                                </Typography>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                </div>
            )
        }

        else{
            return (
                <div className="trythis">
                    <div>
                        <OrgSidebar />
                    </div>
                <div className="report">
                    <div className="reportHeader">
                        Reports list
                    </div>
                    <div className="accordion">

                        {reports.map((item) =>{
                            return(
                                <Accordions
                                    org={item.orgId}
                                    id={item.reportId}
                                    title={item.reportType}
                                    description={item.description}
                                    appeal={item.appealed}
                                />
                                )
                        })}

                    </div>

                </div>
                </div>

            )
        }
    }

}

export default Reports
