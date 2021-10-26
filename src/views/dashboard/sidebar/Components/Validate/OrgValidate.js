import React, { Component } from 'react'
import "./Validate.css"
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import AdminSidebar from "../DemoSidebar/AdminSidebar";
import {Alert} from "@material-ui/lab";
import {toast, ToastContainer} from "react-toastify";

export class OrgValidate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            validation:{},
            error: "",
            openValid: false,
            openValidDate: false,
            openNgoNumber: false,
            openNgoNumberDeny: false,
            orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
            adminId: localStorage.getItem("id"),
            isConfirmed: false,
            isConfirmedNumber: false,
            isConfirmedWebsite: false,
            isConfirmedStreet: false,
            isConfirmedEd: false,
            isConfirmedDonate: false,
            isConfirmedQr: false,
            isConfirmedCommittee: false,
            isConfirmedTwitter: false,
            isConfirmedFacebook: false,
            isConfirmedInstagram: false,
            serverDomain: "https://givealotcharities.herokuapp.com",
            popUp1:false,
        }
    }
    handleClose = () => {
        this.setState({ openValid: false });

    }
    handleCloseDate = () => {
        this.setState({ openValidDate: false });
    }

    handleCloseNgoNumber = () => {
        this.setState({ openNgoNumber: false });
    }
    handleCloseNgoNumberDeny = () => {
        this.setState({ openNgoNumberDeny: false });
    }

    acceptNgoDate() {
        this.setState({ openValid: true });
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+this.state.adminId+ '/ngo_date/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmed: true})
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }
    denyNgoDate(){
        this.setState({ openValidDate: true });
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/ngo_date/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmed: true})
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    acceptNgoNumber(){
        this.setState({ openNgoNumber: true });
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/ngo_number/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedNumber: true})
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }


    denyNgoNumber(){
        this.setState({ openNgoNumberDeny: true });
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/ngo_number/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedNumber: true})
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }


    acceptNgoWebsite(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/website/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedWebsite: true})
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    denyNgoWebsite(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/website/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedWebsite: true})
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    acceptNgoAddress(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/address/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedStreet: true})
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    denyNgoAddress(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/address/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedStreet: true})
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    acceptNgoEstablish(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/establishment_date/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedEd: true})
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    denyNgoEstablish(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/establishment_date/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedEd: true})
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    acceptNgoDonateUrl(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }


        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/donation_link/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedDonate: true})
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    denyNgoDonateUrl(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/donation_link/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedDonate: true})
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    acceptNgoQrUrl(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/qr_code/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedQr: true})
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    denyNgoQrUrl(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/qr_code/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedQr: true})
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }


    acceptCommitteeDetails(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/committee/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedCommittee: true})
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    denyCommitteeDetails(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/committee/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedCommittee: true})
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    acceptSocialMedia1(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/facebook/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedFacebook: true})
                this.onToastSubmit();
            })
            .catch(error =>{
                console.log(error)
            })
    }

    denySocialMedia1(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/facebook/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedFacebook: true})
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    acceptSocialMedia2(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/instagram/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedInstagram: true})
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    denySocialMedia2(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/instagram/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedInstagram: true})
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    acceptSocialMedia3(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/twitter/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedTwitter: true})
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    denySocialMedia3(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/twitter/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.setState({isConfirmedTwitter: true})
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    acceptAuditDocument(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/audit/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    denyAuditDocument(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/audit/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }


    acceptImages(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/images/true', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.onToastSubmit()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    denyImages(){
        this.setState({ orgId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] });
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        document.getElementById("loaderValidateContainer").style.display="block";
        axios.put(this.state.serverDomain + '/v1/organisation/delete/validity/confirm/'+this.state.orgId+ '/'+ this.state.adminId+ '/images/false', config)
            .then(response =>{
                document.getElementById("loaderValidateContainer").style.display="none";
                this.onToastSubmitFail()
            })
            .catch(error =>{
                console.log(error)
            })
    }

    onToastSubmit = () => {
        // if(this.state.isConfirmedInstagram){

            toast.success('Submitted ', {
                position: toast.POSITION.TOP_RIGHT

            });
        // }else{
        //
        //     toast.error('failed to submit', {
        //         position: toast.POSITION.TOP_RIGHT
        //
        //     });
        //
        // }
    }

    onToastSubmitFail = () => {
        // if(this.state.isConfirmedInstagram){
        //
        //     toast.success('Submitted ', {
        //         position: toast.POSITION.TOP_RIGHT
        //
        //     });
        //     // }else{

                toast.error('failed to submit', {
                    position: toast.POSITION.TOP_RIGHT

                });
    }

    componentDidMount(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        const adminUsersRequestBody = {
            "orgId":this.state.orgId
        }

        axios.post(this.state.serverDomain + '/v1/notifications/get/level_information', adminUsersRequestBody ,config)
            .then(response =>{
                console.log(response)
                this.setState({validation: response.data.object})
            })
            .catch(error =>{
                console.log(error)
            })
    }

    render() {
        const { validation } = this.state

        const orgValidating = () => {
            if (validation.level === 1) {
                return (
                    <div className="table">
                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography style={{display: "flex"}}>
                                        <div>
                                            Ngo Date:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {validation.ngoDate}
                                        </div>
                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptNgoDate.bind(this)} disabled={this.state.isConfirmed}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                    onClick={this.denyNgoDate.bind(this)} disabled={this.state.isConfirmed}
                                                >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography style={{display: "flex"}}>
                                        <div>
                                            Ngo Number:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {validation.ngoNumber}
                                        </div>
                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptNgoNumber.bind(this)} disabled={this.state.isConfirmedNumber}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                    onClick={this.denyNgoNumber.bind(this)} disabled={this.state.isConfirmedNumber}
                                            >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                );
            } else if(validation.level === 2){
                return (
                    <div className="table">
                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography>
                                        <div>
                                            Website:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {validation.website}
                                        </div>
                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptNgoWebsite.bind(this)} disabled={this.state.isConfirmedWebsite}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                    onClick={this.denyNgoWebsite.bind(this)} disabled={this.state.isConfirmedWebsite}
                                            >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography>
                                        <div>
                                            Address:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {validation.address}
                                        </div>
                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptNgoAddress.bind(this)} disabled={this.state.isConfirmedStreet}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                onClick={this.denyNgoAddress.bind(this)} disabled={this.state.isConfirmedStreet}
                                            >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                );
            }else if(validation.level === 3){
                return (
                    <div className="table">
                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography>
                                        <div>
                                            Establishment Date:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {validation.establishmentDate}
                                        </div>
                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptNgoEstablish.bind(this)} disabled={this.state.isConfirmedEd}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                    onClick={this.denyNgoEstablish.bind(this)} disabled={this.state.isConfirmedEd}
                                            >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography>
                                        <div>
                                            Donation Url:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {validation.donation_url}
                                        </div>
                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptNgoDonateUrl.bind(this)} disabled={this.state.isConfirmedDonate}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                onClick={this.denyNgoDonateUrl.bind(this)} disabled={this.state.isConfirmedDonate}
                                            >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography>
                                        <div>
                                            QR code Url:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {/*<img src={validation.qrCode_url}/>*/}
                                            <img src={this.state.serverDomain + "/media/version/qr_code/admin/" + this.state.orgId}  height={120} width={120} />
                                        </div>
                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptNgoQrUrl.bind(this)} disabled={this.state.isConfirmedQr}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                onClick={this.denyNgoQrUrl.bind(this)} disabled={this.state.isConfirmedQr}
                                            >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                );
            }else if(validation.level === 4){
                return (
                    <div className="table">
                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography>
                                        <div>
                                            Commitee Details:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {validation.commiteeMembers}
                                        </div>

                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptCommitteeDetails.bind(this)}
                                                    disabled={this.state.isConfirmedCommittee}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                    onClick={this.denyCommitteeDetails.bind(this)}
                                                    disabled={this.state.isConfirmedCommittee}
                                                >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography>
                                        <div>
                                            Twitter:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {validation.socialMedia3}
                                        </div>

                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptSocialMedia3.bind(this)}
                                                    disabled={this.state.isConfirmedTwitter}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                    onClick={this.denySocialMedia3.bind(this)}
                                                    disabled={this.state.isConfirmedTwitter}
                                            >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography>
                                        <div>
                                            Facebook:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {validation.socialMedia1}
                                        </div>

                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptSocialMedia1.bind(this)}
                                                    disabled={this.state.isConfirmedFacebook}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                    onClick={this.denySocialMedia1.bind(this)}
                                                    disabled={this.state.isConfirmedFacebook}
                                            >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography>
                                        <div>
                                            Instagram:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {validation.socialMedia2}
                                        </div>

                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptSocialMedia2.bind(this)}
                                                    disabled={this.state.isConfirmedInstagram}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                    onClick={this.denySocialMedia2.bind(this)}
                                                    disabled={this.state.isConfirmedInstagram}
                                            >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                );
            }
            else if(validation.level === 5){
                return (
                    <div className="table">
                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography>
                                        <div>
                                            Audit Document:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            {validation.audit_document}
                                        </div>
                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptAuditDocument.bind(this)}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                    onClick={this.denyAuditDocument.bind(this)}
                                                >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card style={{margin: "1em", width: "100%"}}>
                            <CardContent>
                                <Typography className="valid">
                                    <Typography>
                                        <div>
                                            Images:
                                        </div>
                                        <div style={{marginLeft: "1em"}}>
                                            <img src={validation.images}/>
                                        </div>
                                    </Typography>
                                    <Typography style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Grid>
                                            <Button variant="contained" className="buttonValidViewAccept"
                                                    onClick={this.acceptImages.bind(this)}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid style={{marginLeft: "1em"}}>
                                            <Button variant="contained" className="buttonValidViewDeny"
                                                    onClick={this.denyImages.bind(this)}
                                            >
                                                Deny
                                            </Button>
                                        </Grid>
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                );
            }
            else{
                return (<div className="table">
                    <Card style={{margin: "1em", width: "100%"}}>
                        <CardContent>
                            <Typography className="valid">
                                <Typography>
                                   No Information to update
                                </Typography>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>);
            }
        }

        return (

            <div className="trythis">
                <div>
                    <AdminSidebar />
                </div>

                <div id='loaderValidateContainer'>
                    {/*<CircularProgress id='loaderValidate'/>*/}
                    <Alert
                    severity={"info"}
                    id='loaderValidate'
                    >
                        please wait...
                    </Alert>
                </div>

            <div className="validate">
                <div className="validBody">
                    <div  className="name">
                        {validation.orgName}
                    </div>
                    {orgValidating()}
                </div>
            </div>
                <div className="form-group">
                    <ToastContainer/>
                </div>
            </div>
        )
    }
}
export default OrgValidate
