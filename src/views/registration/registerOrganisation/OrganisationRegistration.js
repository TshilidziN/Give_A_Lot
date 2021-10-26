import OrganisationRegistration_css from './Styles/OrganisationRegistration.css'
import {Box} from "@material-ui/core";
import backgroundImg from "../../../assets/homeBackground.jpg";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Alert} from "@material-ui/lab";
import {ApiContext} from "../../../apiContext/ApiContext";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {Link} from "react-router-dom";
import logo from "../../../assets/logo/logo3_1.png";
import Logo from "../../login/Components/Logo";
const styles = {
    main: {
        backgroundImage: `url(${backgroundImg})`
    }
}
function OrganisationRegistration()
{
    let [registration_sector_options, set_registration_sector_options] = useState(["test 1","test 2", "test 3"]);
    const [serverDomain, setServerDomain] = useState(useContext(ApiContext))

    let registration_form_orgName = null;
    let registration_form_orgEmail = null;
    let registration_form_orgPassword = null;
    let registration_form_orgSlogan = null;
    let registration_form_orgDescription = null;
    let orgSector_dropdown = null;
    let registration_form_orgContact_person = null;
    let registration_form_orgContact_number = null;
    let image_tmp = null;

    const validate_organisation_credentials = event =>
    {
        event.preventDefault();
        registration_form_orgName = document.getElementById("registration_form_orgName").value;
        registration_form_orgEmail = document.getElementById("registration_form_orgEmail").value;
        registration_form_orgPassword = document.getElementById("registration_form_orgPassword").value;
        let isValidated = true;

        if(registration_form_orgName.length === 0)
        {
            isValidated = false;
            document.getElementsByClassName("registration_form_required")[0].style.display = 'block';
        }
        else
        {
            document.getElementsByClassName("registration_form_required")[0].style.display = 'none';
        }

        if(registration_form_orgEmail.length === 0)
        {
            isValidated = false;
            document.getElementsByClassName("registration_form_required")[1].style.display = 'block';
            document.getElementsByClassName("registration_form_required")[1].innerText = "this field is required*";
        }
        else if(!registration_form_orgEmail.includes('@'))
        {
            isValidated = false;
            document.getElementsByClassName("registration_form_required")[1].style.display = 'block';
            document.getElementsByClassName("registration_form_required")[1].innerText = "invalid email address";
        }
        else
        {
            document.getElementsByClassName("registration_form_required")[1].style.display = 'none';
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                }
            }

            const email_check_req_body = {
                email: registration_form_orgEmail
            }
            axios.post(serverDomain + '/v1/organisation/check/email',email_check_req_body, config)
            .then(response =>{
                if(response.data === true)
                {
                    document.getElementById("email_exists_toast").style.display = "flex";
                }
                else
                {
                    document.getElementById("email_exists_toast").style.display = "none";
                    if(registration_form_orgPassword.length < 8)
                    {
                        isValidated = false;
                        document.getElementsByClassName("registration_form_required")[2].style.display = 'block';
                        document.getElementsByClassName("registration_form_required")[2].innerText = "must be at least 8 characters long";
                    }
                    else
                    {
                        document.getElementsByClassName("registration_form_required")[2].style.display = 'none';
                    }

                    if(isValidated === true)
                    {
                        let current_view = document.getElementById("register_organisation_outter_container_credentials");
                        let next_view = document.getElementById("register_organisation_outter_container_info");
                        current_view.style.display = "none";
                        next_view.style.display = "block";
                    }
                }
            })
            .catch(error =>{
                console.log(error)
            })
        }
    }

    const go_back_from_info = event =>
    {
        event.preventDefault();
        let current_view = document.getElementById("register_organisation_outter_container_info");
        let prev_view = document.getElementById("register_organisation_outter_container_credentials");
        current_view.style.display = "none";
        prev_view.style.display = "block";
    }

    const validate_organisation_info = event =>
    {
        event.preventDefault();
        registration_form_orgSlogan = document.getElementById("registration_form_orgSlogan").value;
        registration_form_orgDescription = document.getElementById("registration_form_orgDescription").value;
        orgSector_dropdown = document.getElementById("orgSector_dropdown").value;
        let is_validated = true;

        if(registration_form_orgSlogan.length === 0)
        {
            is_validated = false;
            document.getElementsByClassName("registration_form_required")[3].style.display = 'flex';
        }
        else document.getElementsByClassName("registration_form_required")[3].style.display = 'none';

        if(orgSector_dropdown.length === 0 || orgSector_dropdown === "organisation sector")
        {
            is_validated = false;
            document.getElementsByClassName("registration_form_required")[4].style.display = 'flex';
        }
        else document.getElementsByClassName("registration_form_required")[4].style.display = 'none';

        if(registration_form_orgDescription.length === 0)
        {
            is_validated = false;
            document.getElementsByClassName("registration_form_required")[5].style.display = 'flex';
            document.getElementsByClassName("registration_form_required")[5].innerText = "this field is required* ";
        }
        else if(registration_form_orgDescription.length < 200)
        {
            is_validated = false;
            document.getElementsByClassName("registration_form_required")[5].style.display = 'flex';
            document.getElementsByClassName("registration_form_required")[5].innerText = "description has to be at least 200 characters";
        }
        else document.getElementsByClassName("registration_form_required")[5].style.display = 'none';

        if(is_validated)
        {
            let current_view = document.getElementById("register_organisation_outter_container_info");
            let next_view = document.getElementById("register_organisation_outter_container_contact");
            current_view.style.display = "none";
            next_view.style.display = "block";
        }
    }

    const go_back_from_contact_info = event =>
    {
        event.preventDefault();
        let current_view = document.getElementById("register_organisation_outter_container_contact");
        let prev_view = document.getElementById("register_organisation_outter_container_info");
        current_view.style.display = "none";
        prev_view.style.display = "block";
    }

    const  validate_organisation_contact_info = event =>
    {
        event.preventDefault();
        registration_form_orgContact_person = document.getElementById("registration_form_orgContact_person").value;
        registration_form_orgContact_number = document.getElementById("registration_form_orgContact_number").value;
        let is_validated = true;

        if(registration_form_orgContact_person.length === 0)
        {
            is_validated = false;
            document.getElementsByClassName("registration_form_required")[6].style.display = 'block';
            document.getElementsByClassName("registration_form_required")[6].innerText = "this field is required *";
        }
        else if(registration_form_orgContact_person.split(" ").length < 2 ||
            (registration_form_orgContact_person.split(" ").length > 1 &&
            registration_form_orgContact_person.split(" ")[1].length === 0))
        {
            is_validated = false;
            document.getElementsByClassName("registration_form_required")[6].style.display = 'block';
            document.getElementsByClassName("registration_form_required")[6].innerText = "both name and surname are required";
        }
        else document.getElementsByClassName("registration_form_required")[6].style.display = 'none';

        if(registration_form_orgContact_number.length === 0)
        {
            is_validated = false;
            document.getElementsByClassName("registration_form_required")[7].style.display = 'block';
            document.getElementsByClassName("registration_form_required")[7].innerText = "this field is required *";
        }
        else if(registration_form_orgContact_number.length !== 10)
        {
            is_validated = false;
            document.getElementsByClassName("registration_form_required")[7].style.display = 'block';
            document.getElementsByClassName("registration_form_required")[7].innerText = "invalid cellphone number";
        }
        else document.getElementsByClassName("registration_form_required")[7].style.display = 'none';

        if(is_validated)
        {
            let current_view = document.getElementById("register_organisation_outter_container_contact");
            let next_view = document.getElementById("register_organisation_outter_container_photo");
            current_view.style.display = "none";
            next_view.style.display = "block";
        }
    }

    const go_back_from_contact_photo = event =>
    {
        event.preventDefault();
        let current_view = document.getElementById("register_organisation_outter_container_photo");
        let prev_view = document.getElementById("register_organisation_outter_container_contact");

        current_view.style.display = "none";
        prev_view.style.display = "block";
    }

    const validate_registration = event =>
    {
        event.preventDefault();

        image_tmp = document.getElementById("registration_form_orgPhoto").files[0];
        let is_validated = true;

        if(image_tmp === null || image_tmp === undefined)
        {
            is_validated = false;
            document.getElementsByClassName('registration_form_required')[8].style.display = "block";
        }
        else document.getElementsByClassName('registration_form_required')[8].style.display = "none";


        if(is_validated)
        {
            const formData = new FormData();

            formData.append('orgName', registration_form_orgName);
            formData.append('slogan', registration_form_orgSlogan);
            formData.append('orgDescription', registration_form_orgDescription);
            formData.append('orgSector', orgSector_dropdown);
            formData.append('orgEmail', registration_form_orgEmail);
            formData.append('contactPerson', registration_form_orgContact_person);
            formData.append('contactNumber', registration_form_orgContact_number);
            formData.append('password', registration_form_orgPassword);
            formData.append('image', image_tmp);


            document.getElementById('final_registration_toasts_org_succ').style.display = "none";
            document.getElementById('final_registration_toasts_org_info').style.display = "flex";
            document.getElementById('final_registration_toasts_org_error').style.display = "none";
            document.getElementsByClassName('registration_form_container_final')[0].style.display = "none";
            document.getElementsByClassName("profile_photo_upload_registration_organisation")[0].innerText = "setting you up";
            fetch(
                serverDomain + '/v1/organisation/add/org',
                {
                    method: 'POST',
                    body: formData,
                }
            )
            .then((response) => response.json())
            .then((result) => {

                if(result.code.includes("add_org_200_ok"))
                {
                    document.getElementById('final_registration_toasts_org_succ').style.display = "flex";
                    document.getElementById('final_registration_toasts_org_info').style.display = "none";
                    document.getElementById('final_registration_toasts_org_error').style.display = "none";

                    setTimeout(function(){
                        window.location.assign("/login");
                    }, 3000);
                }

            })
            .catch((error) => {
                document.getElementById('final_registration_toasts_org_succ').style.display = "none";
                document.getElementById('final_registration_toasts_org_info').style.display = "none";
                document.getElementById('final_registration_toasts_org_error').style.display = "error";
            });
        }
    }

    useEffect(()=>{
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(serverDomain + '/v1/organisation/get/sectors', config)
            .then(response =>{

                set_registration_sector_options(response.data.sectors)
            })
            .catch(error =>{
                console.log(error)
            })

    },[]);

    return (
        <div id={"reg_org_main_page"} style={styles.main}>

            <Box id={"banner_filter"}>
                {/*credentials*/}
                <Logo/>
                <Link to={"/login"}>
                    <ArrowBackIcon style={{color: "white", marginLeft: "30px", fontSize: "xx-large"}}/>
                </Link>

                <Box id={"register_organisation_outter_container_credentials"} className={"register_organisation_outter_container"}>
                    <Alert id={"email_exists_toast"} severity={"error"}>
                        email already exists
                    </Alert>
                    <p className={"register_organisation_heading"}>
                        Credentials
                    </p>
                    <div className={"registration_form_container"}>
                        <div className={"registration_form_input_container"}>
                            <TextField
                                className={"registration_form_input"}
                                id="registration_form_orgName"
                                label="organisation name"
                                variant={"outlined"}
                                type="text"
                            />
                            <span className={"registration_form_required"}>this field is required *</span>
                        </div>

                        <div className={"registration_form_input_container"}>
                            <TextField
                                className={"registration_form_input"}
                                id="registration_form_orgEmail"
                                label="email"
                                variant={"outlined"}
                                type="email"
                                variant={"outlined"}
                            />
                            <span className={"registration_form_required"}>this field is required *</span>
                        </div>

                        <div className={"registration_form_input_container"}>
                            <TextField
                                className={"registration_form_input"}
                                id="registration_form_orgPassword"
                                label="password"
                                type="password"
                                variant={"outlined"}
                            />
                            <span className={"registration_form_required"}>this field is required *</span>
                        </div>

                        <Button
                        variant={"contained"}
                        className={"registration_form_btn"}
                        onClick={validate_organisation_credentials}
                        color={"primary"}
                        >
                            next
                        </Button>
                    </div>
                </Box>
                <Box id={"register_organisation_outter_container_info"} className={"register_organisation_outter_container "}>
                    <p className={"register_organisation_heading"}>
                        About your organisation
                    </p>
                    <div className={"registration_form_container"}>
                        <div className={"registration_form_input_container"}>
                            <TextField
                                className={"registration_form_input"}
                                id="registration_form_orgSlogan"
                                label="provide your slogan"
                                type="text"
                                variant={"outlined"}
                            />
                            <span className={"registration_form_required"}>this field is required *</span>
                        </div>

                        <div className={"registration_form_input_container"}>
                            <select className="registration_form_input" id={"orgSector_dropdown"}>
                                <option key="registration_form_input_dropdown" className={"registration_form_input_options"}>organisation sector</option>
                                {registration_sector_options.map((item) =>
                                    <option className={"registration_form_input_options"} key={item} value={item}>{item}</option>
                                )}
                            </select>
                            <span className={"registration_form_required"}>this field is required *</span>
                        </div>

                    <div className={"registration_form_input_container"}>
                        <TextField
                            id="registration_form_orgDescription"
                            label="describe your organisation"
                            multiline
                            rows={4}
                            required
                            variant={"outlined"}
                        />
                        <span className={"registration_form_required"}>this field is required *</span>
                    </div>

                        <Box className={"registration_form_btn_multi_container"}>
                            <Button
                                variant={"contained"}
                                className={"registration_form_btn_multi"}
                                onClick={go_back_from_info}
                                color={"primary"}
                            >
                                back
                            </Button>
                            <Button
                                variant={"contained"}
                                className={"registration_form_btn_multi"}
                                onClick={validate_organisation_info}
                                color={"primary"}
                            >
                                next
                            </Button>
                        </Box>
                    </div>
                </Box>
                <Box id={"register_organisation_outter_container_contact"} className={"register_organisation_outter_container"}>
                    <p className={"register_organisation_heading"}>
                        contact person
                    </p>
                    <div className={"registration_form_container"}>
                        <div className={"registration_form_input_container"}>
                            <TextField
                                className={"registration_form_input"}
                                id="registration_form_orgContact_person"
                                label="name and surname"
                                type="text"
                                variant={"outlined"}
                            />
                            <span className={"registration_form_required"}>this field is required *</span>
                        </div>

                        <div className={"registration_form_container"}>
                            <TextField
                                className={"registration_form_input"}
                                id="registration_form_orgContact_number"
                                label="phone no i.g 0112345679"
                                type="number"
                                variant={"outlined"}
                            />
                            <span className={"registration_form_required"}>this field is required *</span>
                        </div>

                        <Box className={"registration_form_btn_multi_container"}>
                            <Button
                                variant={"contained"}
                                className={"registration_form_btn_multi"}
                                onClick={go_back_from_contact_info}
                                color={"primary"}
                            >
                                back
                            </Button>
                            <Button
                                variant={"contained"}
                                className={"registration_form_btn_multi"}
                                onClick={validate_organisation_contact_info}
                                color={"primary"}
                            >
                                next
                            </Button>
                        </Box>
                    </div>
                </Box>
                <Box id={"register_organisation_outter_container_photo"} className={"register_organisation_outter_container"}>
                    <p className={"register_organisation_heading profile_photo_upload_registration_organisation"}>
                        profile photo
                    </p>


                    <Alert id={"final_registration_toasts_org_succ"} severity={"success"}>
                        successfully registered, redirecting...
                    </Alert>
                    <Alert id={"final_registration_toasts_org_error"} severity={"error"}>
                        failed to register...
                    </Alert>
                    <Alert id={"final_registration_toasts_org_info"} severity={"info"}>
                        this will take a minute, please wait...
                    </Alert>


                    <div className={"registration_form_container registration_form_container_final"}>

                        <div className={"registration_form_input_container"}>
                            <TextField
                                className={"registration_form_input"}
                                id="registration_form_orgPhoto"
                                label="choose photo"
                                type="file"
                                accept="image/*"
                                variant={"standard"}
                            />
                            <span className={"registration_form_required"}>this field is required *</span>
                        </div>

                        <Box className={"registration_form_btn_multi_container"}>
                            <Button
                                variant={"contained"}
                                className={"registration_form_btn_multi"}
                                onClick={go_back_from_contact_photo}
                                color={"primary"}
                            >
                                back
                            </Button>
                            <Button
                                variant={"contained"}
                                className={"registration_form_btn_multi"}
                                onClick={validate_registration}
                                color={"primary"}
                            >
                                register
                            </Button>
                        </Box>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default OrganisationRegistration;
