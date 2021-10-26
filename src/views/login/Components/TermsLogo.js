import React from 'react';
import logo from "../../../assets/logo/givealot-logo-red..png";
import {Link} from "react-router-dom";

function TermsLogo()
{
    return(
        <div style={{width: "200px", marginLeft: "15px"}}>
            <Link to={"/"}>
                <img id="logo" src={logo} alt={"logo"} />
            </Link>
        </div>
    );
}

export default TermsLogo;