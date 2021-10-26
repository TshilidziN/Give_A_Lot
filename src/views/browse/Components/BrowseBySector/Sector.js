import React from "react";

function Sector(props)
{
    return (
        <div className="browse_sector">
            <p className="browse_sector_name">{props.sector}</p>
            <div className="browse_sector_organisations_container">
                {props.organisations_for_sec}
            </div>
        </div>
    );
}

export default Sector;