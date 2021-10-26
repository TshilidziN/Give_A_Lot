import React, { Component } from "react";
import "../registerOrganisation/Styles/registerOrganisation.css"
import backgroundImg from "../../../assets/homeBackground.jpg";
import Logo from "../../login/Components/Logo"
import { Link } from "react-router-dom";

export class UserSuccess extends Component {
    styles = {
        main: {
            backgroundImage: `url(${backgroundImg})`
        }
    }

    render()
    {
        if(localStorage.getItem( "new_user") === "true")
        {
            localStorage.setItem( "new_user", "false");
        }

        return (

            <div className="registerOrganisation" style={this.styles.main}>
                <div  id={"banner_filter"}>
                    <Logo/>
                    <div className="registerCard">
                        <div className="wrap">
                        <form className="form1">
                           <span className="headerTag">
                               Registration was a success
                           </span>
                                <div className="button">
                                    <div className="formButton ">
                                        <Link to={"/login"}>
                                            <button className="register-btn">
                                                {" "}
                                                Login
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSuccess;
