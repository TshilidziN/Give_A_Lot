import {Box, Link} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Redirect, useHistory} from 'react-router-dom';

function SearchResult(props)
{
    let history = useHistory();
    return (

        <Box className={"Result"} onClick={()=>{
            history.push("/organisation/"+props.orgId)
        }
        }>

            <Box>
                <img className={"Result-image"} src={props.orgImage} width={200}/>
            </Box>
            <Box>
                <Typography  className={"search-result-org-name"} noWrap>{props.orgName}</Typography>
                <Typography className={"search-result-org-description"} noWrap>{props.orgDescription}</Typography>
                <Typography className={"search-result-org-date"} noWrap>2021-09-09</Typography>
                <Typography className={"search-result-org-sector"} noWrap>health</Typography>
            </Box>
        </Box>
    )
}

export default SearchResult;