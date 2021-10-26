import React from 'react';
import logo from "../../../assets/logo/logo3_1.png";
import {Link} from "react-router-dom";

function Logo()
{
    return(
       <div style={{width: "200px", marginLeft: "15px"}}>
           <Link to={"/"}>
               <img id="logo" src={logo} alt={"logo"} />
           </Link>
       </div>
    );
}

export default Logo;
