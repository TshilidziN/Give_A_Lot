import {Link} from "react-router-dom";
import logo from "../../../../assets/logo/logo3_1.png";
import React, {useContext, useEffect, useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import SearchResults from "../SearchResults/SearchResults";
import {ApiContext} from "../../../../apiContext/ApiContext";
import {Box, LinearProgress} from "@material-ui/core";

function Navbar()
{
    const [searchResultsOrganisations, setSearchResultsOrganisations] = useState([]);
    const [showSearchResults, SetShowSearchResults] = useState(false);
    const [searchResultsOrganisationsRelated, setSearchResultsOrganisationsRelated] = useState([]);
    const [serverDomain, setServerDomain] = useState(useContext(ApiContext))


    function searchOrganisation(e)
    {
        e.preventDefault();
        document.getElementById("searchResultsProgressLoader").style.display = "block";
        fetch(serverDomain + "/search/organisation/browse/"+document.getElementById("browse_search_input2").value)
        .then(async response =>{
            const data = await response.json();
            document.getElementById("searchResultsProgressLoader").style.display = "none";
            if(!response.ok) /* error handling here */
            {
                if(response.status === 500)
                {}
                if(typeof data !== 'undefined')
                {
                }
            }

            if(data.message === "success")
            {
                setSearchResultsOrganisations(data.results);
                setSearchResultsOrganisationsRelated(data.suggestions);

                SetShowSearchResults(true);
                document.getElementById("searchResults").hidden = false;
            }
            else
            {

            }
        })
        .catch(error => {
            alert("failed search " + error)
        });
    }

    const onKeyUp = event =>
    {
        /*
            code 13 represents the ENTER button
        */
        if (event.charCode === 13) {
            searchOrganisation(event);
        }
    }

   useEffect(() =>{

    },[]);
    return (

        <>
            <div id="browseNavSection">
                {showSearchResults && <SearchResults org_list={searchResultsOrganisations}
                                org_suggestions={searchResultsOrganisationsRelated}/>}

                <Link to={"/"}><img id="browseLogo" src={logo} alt={"logo"} /></Link>
                <p>browse organisations</p>
                <div className="browse_search_input2_container">
                    <input
                        id={"browse_search_input2"}
                        placeholder="Search organisation"
                        type="text"

                        onKeyPress={onKeyUp}
                    />
                    <SearchIcon
                        id={"search_icon_nav"}
                        onClick={searchOrganisation}
                    />
                </div>
            </div>
            <Box sx={{ width: '100%' }} id={"searchResultsProgressLoader"}>
                <LinearProgress color={"secondary"} />
            </Box>
        </>
    )
}

export default Navbar;
