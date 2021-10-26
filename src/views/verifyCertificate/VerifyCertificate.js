import React, {Component, useState} from 'react'
import backgroundImg from "../../assets/homeBackground.jpg";
import Logo from "../login/Components/Logo";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./styles/VerifyCert.css"
import {Alert} from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import {ApiContext} from "../../apiContext/ApiContext";

const styles = {
    main: {
        backgroundImage: `url(${backgroundImg})`
    }
}

export class VerifyCertificate extends Component {
    static contextType = ApiContext;

    constructor()
    {
        super();
        this.state = {
            selectedFile: '',
            certificateOrganisationId : '',
            serverDomain : this.context,
        };
    }

    onChange = (e) =>
    {
        switch (e.target.name)
        {
            case 'selectedFile':
                this.setState({ selectedFile: e.target.files[0] });
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { selectedFile } = this.state;
        let formData = new FormData();
        formData.append('selectedFile', selectedFile);

        let AlertPrompt = document.getElementById("AlertPrompt");
        let AlertPromptWait = document.getElementById("AlertPromptWait");
        let AlertServerError = document.getElementById("AlertServerError");

        let AlertBadCertificate = document.getElementById("AlertBadCertificate");
        let AlertGoodCertificate = document.getElementById("AlertGoodCertificate");

        AlertPrompt.style.display = "none";
        AlertBadCertificate.style.display = "none";
        AlertServerError.style.display = "none";
        AlertGoodCertificate.style.display = "none";
        AlertPromptWait.style.display = "flex";

        fetch(
            "https://givealotcharities.herokuapp.com"+ '/certificate/compare',
            {
                method: 'POST',
                body: formData,
            }
        )
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
                if(parseInt(result) === -1)
                {
                    AlertBadCertificate.style.display = "flex";
                    AlertPromptWait.style.display = "none";
                }
                else if (parseInt(result) > -1)
                {
                    this.setState(
                        {
                            certificateOrganisationId : result
                        }
                    )
                    AlertGoodCertificate.style.display = "flex";
                    AlertBadCertificate.style.display = "none";
                    AlertPromptWait.style.display = "none";
                }
                else
                {
                    AlertBadCertificate.style.display = "none";
                    AlertPromptWait.style.display = "none";
                    AlertGoodCertificate.style.display = "none";
                    AlertServerError.style.display = "flex";
                }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render() {
        const { selectedFile } = this.state;
        return (
            <div className="verifyCert" style={styles.main}>
                <div  id={"banner_filter"}>
                    <Logo/>
                    <Link to={"/"}>
                        <ArrowBackIcon style={{color: "white", marginLeft: "30px", fontSize: "xx-large"}}/>
                    </Link>
                    <div className="fileUpload" >
                        <div>
                            <h3 className="verify">Verify Certificate</h3>
                        </div>
                        <div className="upload">
                            <div className="Upload">
                                <span className="Title">Upload Certificate</span>
                                <div className="Content">
                                    <div>
                                        <form onSubmit={this.onSubmit}>
                                            <input
                                                type="file"
                                                name="selectedFile"
                                                onChange={this.onChange}
                                            />
                                            <button type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Alert severity="error" id={"AlertBadCertificate"}>this certificate is invalid...</Alert>
                        <Alert severity="error" id={"AlertServerError"}>Internal server error</Alert>
                        <Alert severity="info" id={"AlertPrompt"}>Please upload a Give a lot certificate (.PDF)</Alert>
                        <Alert severity="info" id={"AlertPromptWait"}>Please wait...</Alert>
                        <Alert severity="success"  id={"AlertGoodCertificate"}>Organisation verified

                            <Link to={"/organisation/" + this.state.certificateOrganisationId}>
                                <Button
                                    id={"goodAlertBtn"}
                                    variant={"contained"}
                                >
                                    visit
                                </Button>
                            </Link>
                        </Alert>
                    </div>
                </div>
            </div>
        )
    }
}

export default VerifyCertificate
