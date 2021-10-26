import {Component} from "react";
import LoaderGif from "./Style/Curve-Loading.gif"
import "./Style/FullPageLoader.css"


class FullPageLoader extends Component{
    state={

    }

    render(){
        return(
            <div className="loading_container">

                <div className="loading_spinner">

                    <img src={LoaderGif} alt={"loader"}/>

                </div>

            </div>

        )
    }
}

export default FullPageLoader;