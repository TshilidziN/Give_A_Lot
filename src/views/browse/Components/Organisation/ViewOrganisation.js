import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Button from '@material-ui/core/Button';
import ImageGallery from 'react-image-gallery';


import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import '../../Styles/view_organisation.css';
import {Accordion, AccordionDetails,Box, TextField} from "@material-ui/core";
import Footer from "../Footer/Footer";
import Container from '@material-ui/core/Container';

import Timeline from "@material-ui/lab/Timeline";
import OrganisationTimeLineItem from '../OrganisationTimeLineItem/OrganisationTimeLineItem'

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Loader from "../../../loader/Loader";
import {ApiContext} from "../../../../apiContext/ApiContext";
import axios from "axios";
import {Alert} from "@material-ui/lab";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Chatbot from "../../../chatbot/Chatbot";
import "react-image-gallery/styles/css/image-gallery.css";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


/*timeline*/

function trim_description(descr)
{
    let summary = "";
    let complete_descr = "";
    if(descr !== undefined) {
        if (descr.length > 50) {
            summary = "";
            let i;
            let upperbound = 200;
            for (i = 0; i < upperbound && i < descr.length; i++) {
                if (i + 1 === upperbound && descr[i] !== " ")
                    upperbound++;
                summary = summary + descr[i];
            }

            summary = summary + "[expand to read more]";

            for (let k = i; k < descr.length; k++) {
                complete_descr = complete_descr + descr[k];
            }

        }
    }
    return [summary, complete_descr];
}
function ViewOrganisation()
{
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [pageLoaded, setPageLoaded] = React.useState(true);
    const [organisationData, setOrganisationData] = React.useState([]);
    const [serverDomain, setServerDomain] = useState(useContext(ApiContext))
    const [open, setOpen] = React.useState(false);

    let [timelineEvents, setTimelineEvents] = useState([]);
    let [curr_organisation_id, set_curr_organisation_id] = useState(localStorage.getItem('id'));

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    let {id} = useParams();
    let image_id = id + "";
    let showReportFormTrack = false;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const reportOrganisation = event =>
    {
        event.preventDefault();
        let orgId = id;
        let userId = localStorage.getItem("id");
        let reportType = document.getElementById("report-title-input").value;
        let reportDescription = document.getElementById("report-description-input").value;

        let reportRequest = {
            orgId : orgId,
            userId : userId,
            reportType : reportType,
            description : reportDescription
        }

        if(userId === null || userId === "default")
        {
            alert("please sign in if you want to report an organisation");
            window.location.assign("/login");
        }
        else
        {
            document.getElementById('report_wait_alert').style.display = "flex";
            document.getElementById('report_error_alert').style.display = "none";
            document.getElementById('report_server_error_alert').style.display = "none";
            axios.post(serverDomain + '/report/org/', reportRequest)
            .then(response =>
            {
                if(response)
                {
                    document.getElementById('report_success_alert').style.display = "flex";
                    document.getElementById('report_wait_alert').style.display = "none";
                    setTimeout(function(){
                        document.getElementById('report_success_alert').style.display = "none";
                    }, 3000);
                }
            })
            .catch(error =>
            {
                document.getElementById('report_wait_alert').style.display = "none";
                if(error.response)
                {
                    document.getElementById('report_error_alert').style.display = "flex";
                }
                else
                {
                    document.getElementById('report_server_error_alert').style.display = "flex";
                }
            })
        }
    }

    useEffect(() => {

            let tmp_selected_user;
            if(localStorage.getItem("role") !== "general")
                tmp_selected_user = "default";
            else tmp_selected_user = localStorage.getItem("id");

            fetch( serverDomain + "/v1/organisation/sel/organisation/" + id + "/" + tmp_selected_user)
            .then(async response =>
            {
                const data = await response.json();

                if (!response.ok) /* error handling here */
                {
                    if (response.status === 500) {
                    } else if (response.status === 401) {
                    }
                    if (typeof data !== 'undefined') {
                    }
                }

                if (data.message === "success") /*successfully fetched*/
                {
                    setOrganisationData(data.response);
                    setPageLoaded(true);
                }
                else
                {
                    setOrganisationData([]);
                }
            })

            .catch(error => {
                alert("failed - select - sector")
            });

            fetch( serverDomain + "/event/get/timeline/" + id)
                .then(async response =>{

                    const data = await response.json();

                    if(!response.ok) /* error handling here */
                    {
                        if(response.status === 500)
                        {}
                        else if(response.status === 401)
                        {}

                        if(typeof data !== 'undefined')
                        {}
                    }

                    if(data.message === "success") /*successfully fetched*/
                        setTimelineEvents(data.object)
                    else
                    {}
                })

                .catch(error => {
                    alert("failed - organisations - sector")
                });
        }
        ,[])
    /* fetch request - organisations by sections - end*/



    let description = [];
    description[0] = "";
    description[1] = "";

    if(organisationData !== undefined)
    {
        description = trim_description(organisationData.orgDescription);
    }

    let fetched_timeline_events = [];
    if(timelineEvents !== undefined)
    {
        for (let i = 0; i < timelineEvents.length; i++)
        {
            let timeline_event_date = timelineEvents[i].eventDate;
            let timeline_event_title = timelineEvents[i].eventTitle;
            let timeline_event_id = timelineEvents[i].eventId;
            let timeline_event_description = timelineEvents[i].eventShortDescription;

            fetched_timeline_events.push(
                <OrganisationTimeLineItem id={timeline_event_id}
                                          date={timeline_event_date}
                                          title={timeline_event_title}
                                          description={timeline_event_description}
                />
            )
        }
    }

    let number_of_images = 0;
    if(organisationData !== undefined)
    {
        number_of_images = organisationData.numberOfImages;

    }

    let images = [];

    for(let i = 1; i < number_of_images+1; i++)
    {
        let image = {
            original : serverDomain + "/media/version/gallery/images/"+id+"/" + i,
            originalClass: "galleryOriginal",
            originalHeight: 310,
            originalWidth: 400,
            thumbnail: serverDomain + "/media/version/gallery/images/"+id+"/" + i,
            thumbnailHeight: 60,
            thumbnailWidth: 20,

            thumbnailClass: "galleryThumbnail"
        }
        images.push(image);
    }

    return (
       <div id={"view_organisation_container_outer"}>
           {pageLoaded === false && <Loader />}
           <Chatbot />
           <Navbar/>
           <Container maxWidth={"xl"}  id="view_organisation_container">
               <Container maxWidth={"sm"} id="view_organisation">
                   <div id="view_header">
                       <div id="view_organisations_card">
                           <h1>{organisationData.orgName}</h1>
                           <h4>{organisationData.slogan}</h4>
                       </div>

                       <img src={ serverDomain + "/v1/organisation/image/get/logo/" + id} id={"imageCover"}/>

                       <div id={"id_social_media"}>
                           {organisationData.istagramURl ?
                               <Button id={"instaIcon"} size={"small"} startIcon={<InstagramIcon/>}
                                    onClick={() => {
                                        window.open(organisationData.istagramURl);
                                    }}>
                               instagram
                           </Button>
                               :
                               <Button id={"instaIcon"}
                                       disabled
                                       size={"small"}
                                       className={"disabledBTN"}
                                       startIcon={<InstagramIcon/>}>
                                   instagram
                               </Button>
                           }

                           {organisationData.facebookUrl ?
                               <Button id={"FacebookIcon"}
                                       size={"small"}
                                       startIcon={<FacebookIcon/>}
                                        onClick={() => {
                                            window.open(organisationData.facebookUrl);
                                        }}>
                                    facebook
                               </Button>
                               :
                               <Button id={"FacebookIcon"}
                                       disabled
                                       size={"small"}
                                       className={"disabledBTN"}
                                       startIcon={<FacebookIcon/>}>
                                    facebook
                               </Button>
                           }

                           {organisationData.twitterUrl ?
                               <Button id={"TwitterIcon"} size={"small"} startIcon={<TwitterIcon/>}
                                    onClick={() => {
                                        window.open(organisationData.twitterUrl);
                                    }}>
                                  twitter
                               </Button>
                               :
                               <Button id={"TwitterIcon"}
                                       disabled
                                       size={"small"}
                                       className={"disabledBTN"}
                                       startIcon={<TwitterIcon/>}>
                                   twitter
                               </Button>
                           }
                       </div>
                   </div>

                   <div id="view_organisation_meta_body">
                       <p id="view_organisation_meta_body_about">about us</p>

                       <Accordion elevation={0} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                           <AccordionSummary
                               expandIcon={<ExpandMoreIcon />}
                               aria-controls="panel1bh-content"
                               id="panel1bh-header"
                           >
                               {/*  <Typography className={classes.heading}>General settings</Typography> */}
                               <Typography className={classes.secondaryHeading}>{description[0]}</Typography>
                           </AccordionSummary>
                           <AccordionDetails>
                               <Typography>
                                   {description[1]}
                               </Typography>
                           </AccordionDetails>
                       </Accordion>
                   </div>

                   {images.length > 0 ?
                       <>
                           <p id="view_organisation_meta_body_about">gallery</p>
                           <div id="view_organisation_gallery">
                           <p>{images.length} pictures</p>
                           <ImageGallery
                               showFullscreenButton={false}
                               showPlayButton={false}
                               showIndex={true}
                               autoPlay={true}
                               items={images}/>
                           </div>
                       </>

                       :

                       <></>
                   }

               </Container>

               <Container maxWidth="sm" id="view_organisation_right">
                   <Box maxWidth={500} id="certificate_container" color="text.primary">
                       <div>
                           <div id={"view_header_meta_content"}>
                               <div><p>Certificate level</p></div>
                               <img src={"https://avatars.dicebear.com/api/initials/" + organisationData.certificateLevel + ".svg?w=500"} />
                           </div>

                           <Box id={"donateSection"}>
                               <img src={serverDomain + "/media/version/qr_code/" + id} width={128} height={128}/>

                               {
                                   organisationData.donationLink ?
                                       <Button variant={"contained"}>donate</Button>

                                       :

                                       <Button variant={"contained"}
                                               disabled
                                               className={"disabledBTN"}>donate</Button>
                               }

                           </Box>
                       </div>

                       <p id={"certificate_award_message"}>
                          The following certificate was awarded by Give A Lot to <em>{organisationData.orgName}</em> upon reviewing
                          their organisation and the information they provided to Give A Lot.
                       </p>

                       <img src={serverDomain + "/media/version/cert_png/" + id}  />

                       <Button variant="contained" color="secondary"
                               onClick={(e) => {
                                   e.preventDefault();
                                   window.open(serverDomain +'/certificate/download/' + id);
                               }}
                       >
                           Download certificate
                       </Button>
                   </Box>


                   <Box id={"report_organisation_container"}>
                       <p>
                           Your satisfaction matters to us,
                           report an organisation if you have any suspicions.
                       </p>
                       <Button
                        variant={"outlined"}
                        color={"secondary"}
                        /*onClick={reportFormToggle}*/
                           onClick={handleClickOpen}
                       >
                           Report
                       </Button>
                       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                           <DialogTitle id="report_organisation_heading_browse">please complete your report</DialogTitle>
                           <Box id={"report_form_container"}>

                               <Alert
                                   id={"report_success_alert"}
                                   severity={"success"}
                               >
                                   successfully reported
                               </Alert>

                               <Alert
                                   id={"report_wait_alert"}
                                   severity={"info"}
                               >
                                   please wait...
                               </Alert>

                               <Alert
                                   id={"report_error_alert"}
                                   severity={"error"}
                               >
                                   all fields are required!!!
                               </Alert>

                               <Alert
                                   id={"report_server_error_alert"}
                                   severity={"error"}
                               >
                                   server error :-(
                               </Alert>

                               <TextField
                                   className={"report_form_input"}
                                   id={"report-title-input"}
                                   variant={"outlined"}
                                   label="What is your accusation?"
                                   placeholder={"example, imposter"}
                                   type="text"
                               />

                               <TextField
                                   className={"report_form_input"}
                                   variant={"outlined"}
                                   id={"report-description-input"}
                                   label="describe the event"
                                   placeholder="Describe the accusation in detail"
                                   maxRows={3}
                                   multiline
                               />

                               <Button
                                   variant={"contained"}
                                   color={"primary"}
                                   class="g-recaptcha"
                                   data-sitekey="reCAPTCHA_site_key"
                                   data-action='submit'
                                   data-callback='reportOrganisation'
                                   onClick={reportOrganisation}

                               >
                                   submit
                               </Button>
                           </Box>
                       </Dialog>


                   </Box>

                   <p id="view_organisation_meta_body_about">timeline</p>

                   <Box id={"organisation_timeline"}>
                        <Timeline align="alternate">
                            {fetched_timeline_events}
                        </Timeline>
                   </Box>
               </Container>
           </Container>
            <Footer />
       </div>
    )
}

export default ViewOrganisation;
