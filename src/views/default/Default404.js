import {useContext, useState} from "react";
import {FrontEndContext} from "../../apiContext/FrontEndContext";

function Default404()
{
    /*const [frontEndDomain, setFrontEndDomain] = useState(useContext(FrontEndContext));
    if (localStorage.getItem("role")){
        if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "organisation"){
            window.location.href = frontEndDomain + "/dashboard/"
        }
    }*/
    return (
    <div>
        404
    </div>
    )
}

export default Default404;

