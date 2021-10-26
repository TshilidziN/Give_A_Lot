import React, { Component } from 'react'
import "./Styles/Featured.css"
import Chart from "./Chart"
import Cards from "./Cards"
import axios from "axios";
import {ApiContext, ApiUrlProvider} from "../../../../../apiContext/ApiContext";
import AdminSidebar from "../DemoSidebar/AdminSidebar";
export class Featured extends Component {

    static contextType = ApiContext;
    constructor(props) {
        super(props)

        this.state = {
            UsersPerMonth: '',
            OrganisationsPerMonth: '',
            userData: [],
            adminUserEmail: localStorage.getItem('curr_user_email'),
            OrgData: [],
            serverDomain: "https://givealotcharities.herokuapp.com",
            frontEndDomain: 'https://givealot.netlify.app/'
        }
    }

    componentDidMount(){
        this.OrganisationsPerMonth();
        this.UsersPerMonth();
    }

    UsersPerMonth(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const UserPerMonth = {
            "adminUserEmail":this.state.adminUserEmail
        }

        axios.post(this.state.serverDomain + '/v1/user/get/num_users/per_month', UserPerMonth, config)
            .then(response =>{
                // console.log(response)
                this.setState({ userData:[
                        {
                            name: "jan",
                            "Registered Users": response.data.object.jan,
                        },
                        {
                            name: "feb",
                            "Registered Users": response.data.object.feb,
                        },
                        {
                            name: "mar",
                            "Registered Users": response.data.object.mar,
                        },
                        {
                            name: "apr",
                            "Registered Users": response.data.object.apr,
                        },
                        {
                            name: "may",
                            "Registered Users": response.data.object.may,
                        },
                        {
                            name: "jun",
                            "Registered Users": response.data.object.jun,
                        },
                        {
                            name: "jul",
                            "Registered Users": response.data.object.jul,
                        },
                        {
                            name: "aug",
                            "Registered Users": response.data.object.aug,
                        },
                        {
                            name: "sept",
                            "Registered Users": response.data.object.sept,
                        },
                        {
                            name: "oct",
                            "Registered Users": response.data.object.oct,
                        },
                        {
                            name: "nov",
                            "Registered Users": response.data.object.nov,
                        },
                        {
                            name: "dec",
                            "Registered Users": response.data.object.dec,
                        }
                    ]

                })

            })
            .catch(error =>{
                this.setState({error : 'Error Retrieving data'})
            })
    }

    OrganisationsPerMonth(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const OrgPerMonth = {
            "adminUserEmail":this.state.adminUserEmail
        }
        axios.post(this.state.serverDomain + '/v1/organisation/get/num_organisations/per_month', OrgPerMonth, config)
            .then(response =>{
                // console.log(response)
                this.setState({ OrgData:[
                        {
                            name: "jan",
                            "Registered Organisations": response.data.object.jan,
                        },
                        {
                            name: "feb",
                            "Registered Organisations": response.data.object.feb,
                        },
                        {
                            name: "mar",
                            "Registered Organisations": response.data.object.mar,
                        },
                        {
                            name: "apr",
                            "Registered Organisations": response.data.object.apr,
                        },
                        {
                            name: "may",
                            "Registered Organisations": response.data.object.may,
                        },
                        {
                            name: "jun",
                            "Registered Organisations": response.data.object.jun,
                        },
                        {
                            name: "jul",
                            "Registered Organisations": response.data.object.jul,
                        },
                        {
                            name: "aug",
                            "Registered Organisations": response.data.object.aug,
                        },
                        {
                            name: "sept",
                            "Registered Organisations": response.data.object.sept,
                        },
                        {
                            name: "oct",
                            "Registered Organisations": response.data.object.oct,
                        },
                        {
                            name: "nov",
                            "Registered Organisations": response.data.object.nov,
                        },
                        {
                            name: "dec",
                            "Registered Organisations": response.data.object.dec,
                        }
                    ]

            })

            })
            .catch(error =>{
                this.setState({error : 'Error Retrieving data'})
            })
    }

    render() {
        if(localStorage.getItem("id") === null ||
            localStorage.getItem("id") === undefined ||
            localStorage.getItem("id") === 'default')
        {

            window.location.href = this.state.frontEndDomain + "/login";
        }
        const { userData, OrgData } = this.state
        return (

            <div className="trythis">
                <div>
                    <AdminSidebar />
                </div>

                <div className="featured">

                    <div className="featuredBody">
                        <div className="featuredTop">
                            <Cards />
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div className="dashGraph">
                                    <Chart data={userData} title="Users who registered on the system" grid dataKey="Registered Users" />
                                </div>
                                <div className="dashGraph">
                                    <Chart data={OrgData} title="Organisations who registered on the system" grid dataKey="Registered Organisations" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Featured
