import React, {useState, useEffect, useContext} from 'react';

/* assets import */
import filterBtn_mobile from '../../assets/filter_list_black_24dp.svg';
import ui_message_art from '../../assets/feedback-2044700_1280.jpg';
/* assets import end */

/* components import */
import Organisation from './Components/Organisation/Organisation';
import OrganisationRecommended from './Components/Organisation/OrganisationRecommended';
import Sector from "./Components/BrowseBySector/Sector";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Loader from "../loader/Loader";
/* components import end */

/*css imports */
import  './Styles/browse_general.css';
import  './Styles/browse_desktop.css';
import {ApiContext} from "../../apiContext/ApiContext";
import Chatbot from "../chatbot/Chatbot";


function Browse ()
{
    const [organisations, setOrganisations] = useState([]);
    const [recommendedOrganisations, setRecommendedOrganisations] = useState([]);
    const [pageLoaded, setPageLoaded] = React.useState(false);
    const [serverDomain, setServerDomain] = useState(useContext(ApiContext))

    const mobile_popUpControl_hide = event =>
    {
        event.preventDefault();
        var dark_backdrop_active_for_mobile = document.getElementById("dark_backdrop_active_for_mobile");
        var browse_filters = document.getElementById("browse_filters");

        dark_backdrop_active_for_mobile.style.display = "none";
        browse_filters.style.display = "none";
    }

    const mobile_popUpControl_display = event =>
    {
        event.preventDefault();
        var dark_backdrop_active_for_mobile = document.getElementById("dark_backdrop_active_for_mobile");
        var browse_filters = document.getElementById("browse_filters");

        dark_backdrop_active_for_mobile.style.display = "block";
        browse_filters.style.display = "block";
    }

    /* fetch request - organisations by sections - start*/

    /* 
        REMEMBER HOOKS: ELSE GOOD LUCK TRYING TO SOLVE THE 
                        INEVITABLE SHIT SHOW. 

        TODO: update login to use tokens on the request URL
    */
    useEffect(() => {
        fetch( serverDomain + "/v1/browse/sectors")
        .then(async response =>{

            const data = await response.json();

            if(!response.ok) /* error handling here */
            {            
                if(response.status === 500)
                {
                    window.location.assign("/browse");
                }
                else if(response.status === 401)
                {

                }

                if(typeof data !== 'undefined')
                {

                }
            }

            if(data.message === "success") /*successfully fetched*/
            {
                setOrganisations(data.object);
                setPageLoaded(true);
            }
            else
            {

                setOrganisations([]);
            }
        })
        
        .catch(error => {

        });
    }
    ,[])
    /* fetch request - organisations by sections - end*/

    let organisations_by_sector = [];
    if(organisations !== undefined)
    {
        for (let i = 0; i < organisations.length; i++)
        {
            let sector = organisations[i].sector;
            let organisations_for_the_sector = [];

            for (let k = 0; k < organisations[i].organisations.length; k++)
            {
                let orgId = organisations[i].organisations[k].orgId;
                let orgName = organisations[i].organisations[k].orgName;
                let dateAdded = organisations[i].organisations[k].dateAdded;
                let imgUrl = serverDomain + "/v1/organisation/image/get/logo/" + orgId;
                let orgDescription = organisations[i].organisations[k].orgDescription;
                let certificate_level = organisations[i].organisations[k].certificate_level;

                organisations_for_the_sector.push(<Organisation orgId = {orgId}
                                                                orgName= {orgName}
                                                                dateAdded = {dateAdded}
                                                                imgUrl = {imgUrl}
                                                                certificate_level = {certificate_level}
                                                                orgDescription = {orgDescription}
                                                                key={orgId}/>);
            }
            /*
              Note for future reference: sector takes a list of organisations as prop
            */

            organisations_by_sector.push(<Sector sector={sector}
                                                 organisations_for_sec={organisations_for_the_sector}
                                                 key={sector}/>);
        }
    }

    /* fetch request - recommended - start*/
    /*
        REMEMBER HOOKS: ELSE GOOD LUCK TRYING TO SOLVE THE
                        INEVITABLE SHIT SHOW.

        TODO: update login to use tokens on the request URL
    */
    let user_id = "default"; /*TODO: pull this id from dom storage, if user is not logged in, use default*/

    useEffect(() => {
            fetch(serverDomain + "/v1/browse/sectors/recommendations/"+user_id)
                .then(async response =>{

                    const data = await response.json();

                    if(!response.ok) /* error handling here */
                    {
                        if(response.status === 500)
                        {

                        }
                        else if(response.status === 401)
                        {

                        }

                        if(typeof data !== 'undefined')
                        {
                        }
                    }


                    if(data.message === "success") /*successfully fetched*/
                    {
                        setRecommendedOrganisations(data.object);
                    }
                    else
                    {
                        setRecommendedOrganisations([]);
                    }
                })

                .catch(error => {

                });
        }
        ,[])
    /* fetch request - recommended - end*/

    let organisations_recommended = [];
    if(recommendedOrganisations !== undefined)
    {

        for (let k = 0; k < recommendedOrganisations.length; k++)
        {
            let orgId = recommendedOrganisations[k].orgId;
            let orgName = recommendedOrganisations[k].orgName;
            let dateAdded = recommendedOrganisations[k].dateAdded;
            let imgUrl = serverDomain + "/v1/organisation/image/get/logo/" + orgId;
            let certificate_level = recommendedOrganisations[k].certificate_level;
            let org_sector = recommendedOrganisations[k].sector;
            let orgDescription = recommendedOrganisations[k].orgDescription;

            organisations_recommended.push(<OrganisationRecommended orgId = {orgId}
                                                                    orgName= {orgName}
                                                                    dateAdded = {dateAdded}
                                                                    imgUrl = {imgUrl}
                                                                    certificate_level = {certificate_level}
                                                                    org_sector = {org_sector}
                                                                    orgDescription = {orgDescription}
                                                                    key={orgId}/>);
        }
    }
    return (
        <div id={"main_browse_page"}>

            {pageLoaded === false && <Loader />}
            <Navbar/>
            <Chatbot />
            <div id="browse_body">

                <div id="dark_backdrop_active_for_mobile" onClick={mobile_popUpControl_hide}>
                    {/*this is used on the mobile version of the application,
                       helps minimise the the filters */}
                </div>

                <div id="filters_mobile" onClick={mobile_popUpControl_display}>
                    <p >filters</p><img  src={filterBtn_mobile} alt={"filter-icon"} />
                </div>
                
                <section id="browse_body_main">
                    <div id="browse_organisations">


                        {organisations_recommended.length > 0 &&
                            <>
                                <div className="browse_sector">
                                    <p className="browse_sector_name">recommended for you</p>
                                </div>
                                <div id="reco_organisations">
                                    {organisations_recommended}
                                </div>
                            </>
                        }

                        {organisations_by_sector.length > 0 &&
                            <div id="ui_element_message">
                            <img src={ui_message_art} alt={""}/>
                            <div id="ui_element_message_text">
                                <p id="ui_element_message_head">Find a cause that you care about</p>
                                <p id="ui_element_message_subtext">The following organisations have been individually
                                    reviewed by Give A Lot<img/></p>
                            </div>
                        </div>}

                        <div id="default_organisations">
                            {organisations_by_sector}
                        </div>

                        {/* this block was not a part of the initial design */}

                        {organisations_by_sector.length > 0 &&
                        <div id="ui_element_message">
                            <img src={ui_message_art} alt={""}/>
                            <div id="ui_element_message_text">
                                    <p id="ui_element_message_head">Find a cause that you care about</p>
                                    <p id="ui_element_message_subtext">The following organisations have been individually
                                    reviewed by Give A Lot<img/></p>
                            </div>
                            </div>
                        }
                        {/* this block was not a part of the initial design - end */}
                    </div>
                </section>

                <Footer/>
            </div>
        </div>
    )
}

export default Browse;