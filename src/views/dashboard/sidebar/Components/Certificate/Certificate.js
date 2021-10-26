import React, {Component} from 'react'
import "./Style/Certificate.css";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";
import {BeatLoader} from "react-spinners";
import OrgSidebar from "../DemoSidebar/OrgSidebar";


const styles = theme => ({
    button: {
        margin: theme.spacing(4),

    },
});

export class Certificate extends Component {

    constructor (props) {
        super(props)
        this.state={
            level: 0,
            popUp1:false,
            popUp2:false,
            orgId:localStorage.getItem("id"),
            serverDomain : 'https://givealotcharities.herokuapp.com',
            frontEndDomain: 'https://givealot.netlify.app/',


        };
    }

    componentDidMount(){

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const dataa = {
            "orgid" : this.state.orgId
        }

        axios.post(this.state.serverDomain + '/v1/organisation/get/org_level', dataa  ,config)
            .then(response =>{
                this.setState({level: response.data.level})
                // this.setState({level: 4})
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })

    }

    render(){
        if(localStorage.getItem("id") === null ||
            localStorage.getItem("id") === undefined ||
            localStorage.getItem("id") === 'default')
        {

            window.location.href = this.state.frontEndDomain + "/login";
        }

    const { classes } = this.props;

        let upgrade
        if (this.state.level===0){
            upgrade= <Link to="/upgrade0" className="certLink"  >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{backgroundColor: " #957b9e"}}
                    size="large"
                    className={classes.button}
                    startIcon={<ArrowUpwardIcon style={{backgroundColor: " #957b9e"}}/>}
                >
                    Upgrade
                </Button>
            </Link>
        }else if (this.state.level===1) {
            upgrade = <Link to="/upgrade1" className="certLink">
                <Button
                    variant="contained"
                    color="secondary"
                    style={{backgroundColor: " #957b9e"}}
                    size="large"
                    className={classes.button}
                    startIcon={<ArrowUpwardIcon style={{backgroundColor: " #957b9e"}}/>}
                >
                    Upgrade
                </Button>
            </Link>
        }else if (this.state.level===2) {
            upgrade = <Link to="/upgrade2" className="certLink">
                <Button
                    variant="contained"
                    color="secondary"
                    style={{backgroundColor: " #957b9e"}}
                    size="large"
                    className={classes.button}
                    startIcon={<ArrowUpwardIcon style={{backgroundColor: " #957b9e"}}/>}
                >
                    Upgrade
                </Button>
            </Link>
        }else if (this.state.level===3) {
            upgrade = <Link to="/upgrade3" className="certLink">
                <Button
                    variant="contained"
                    color="secondary"
                    style={{backgroundColor: " #957b9e"}}
                    size="large"
                    className={classes.button}
                    startIcon={<ArrowUpwardIcon style={{backgroundColor: " #957b9e"}}/>}
                >
                    Upgrade
                </Button>
            </Link>
        }else if (this.state.level===4) {
            upgrade = <Link to="/upgrade4" className="certLink">
                <Button
                    variant="contained"
                    color="secondary"
                    style={{backgroundColor: " #957b9e"}}
                    size="large"
                    className={classes.button}
                    startIcon={<ArrowUpwardIcon style={{backgroundColor: " #957b9e"}}/>}
                >
                    Upgrade
                </Button>
            </Link>
        } else if (this.state.level===5) {
            upgrade = <Link to="/upgrade5" className="certLink">
                <Button
                    variant="contained"
                    color="secondary"
                    style={{backgroundColor: " #957b9e"}}
                    size="large"
                    className={classes.button}
                    startIcon={<ArrowUpwardIcon style={{backgroundColor: " #957b9e"}}/>}
                >
                    Upgrade
                </Button>
            </Link>
        }
        let spinner
        if(this.loading===true){
            spinner=   <div className="spinners">
                <BeatLoader
                    size={50}
                    color={"#4b4250"}
                    loading={this.state.loading}

                />
            </div>
        }

    return (
        <div className="trythis">
            <div>
                <OrgSidebar />
            </div>
        <div className="certificate">
            {spinner}

            <div className="view">
                {upgrade}

                     <Button
                        variant="outlined"
                        size="large"
                        style={{border: '3px solid', borderColor: "#957b9e", color: " #957b9e"}}

                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(this.state.serverDomain +'/certificate/download/' + this.state.orgId);
                        }}
                    >
                        Download

                    </Button>


            </div>

            <div className="display">
                <img src={this.state.serverDomain + "/media/version/cert_png/" + this.state.orgId} alt={"certificate"} height={546} width={713}/>
            </div>
        </div>
        </div>
    );
    }
}
export default withStyles(styles)(Certificate);
