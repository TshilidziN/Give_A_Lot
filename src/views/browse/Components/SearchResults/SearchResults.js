import {Box, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, {useContext, useState} from "react";
import Divider from "@material-ui/core/Divider";
import SearchResult from "./SearchResult";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import closeResults from '../Navbar/Navbar';
import {ApiContext} from "../../../../apiContext/ApiContext";

function SearchResults(props)
{
    let curr_results = [];
    const [serverDomain, setServerDomain] = useState(useContext(ApiContext));

    if(props.org_list.length !== undefined)
    {
        for (let i = 0; i < props.org_list.length; i++) {
            let orgDescription = props.org_list[i].orgDescription;
            let orgName = props.org_list[i].orgName;
            let orgId = props.org_list[i].orgId;
            let orgImage = serverDomain + "/v1/organisation/image/get/logo/" + orgId;
            curr_results.push(
                <>
                    <SearchResult key={orgId} orgDescription={orgDescription}
                                                orgName={orgName}
                                                orgId={orgId}
                                                orgImage={orgImage}/>
                    <Divider/>
                </>
            );
        }
    }
    let curr_suggestions = [];
    if(props.org_suggestions.length !== undefined)
    {
        for (let i = 0; i < props.org_suggestions.length; i++) {
            let orgDescription = props.org_suggestions[i].orgDescription;
            let orgName = props.org_suggestions[i].orgName;
            let orgId = props.org_suggestions[i].orgId;
            let orgImage = serverDomain + "/v1/organisation/image/get/logo/" + orgId;

            curr_suggestions.push(
                <>
                <SearchResult key={orgId} orgDescription={orgDescription}
                                orgName={orgName}
                                orgId={orgId}
                                orgImage={orgImage}/>
                    <Divider/>
                </>
            );
        }
    }

    return (
        <Paper id={"searchResults"}>
            <Button
                startIcon={<CloseIcon />}
                variant={"contained"}
                id={"searchResultCloseBtn"}
                color={"secondary"}
                onClick={(()=>{
                    document.getElementById("searchResults").hidden = true;
                })}
            >
                close
            </Button>
            <p className={"searchResults-inner-headings"}>{curr_results.length} results</p>
                {curr_results}

            {curr_suggestions.length > 0 ? <p className={"searchResults-inner-headings"}>related results</p>
                :<p className={"searchResults-inner-headings"}></p> }

                {curr_suggestions}
        </Paper>
    )
}

export default SearchResults;
