import React from 'react';
import { Link } from "react-router-dom";
import "./Styles/SignUp.css"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Logo from "../login/Components/TermsLogo"

function TermsAndConditions()
{
    return (
        <div>
            <div className="Terms5" >
                <div  >
                    <Logo/>
                    <Link to={"/SignUp"}>
                        <ArrowBackIcon style={{color: "black", marginLeft: "30px", fontSize: "xx-large"}}/>
                    </Link>
                    <div >
                        <span className="LoginHeader">
                           Terms of use
                       </span>
                        <div className="terms_text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sodales iaculis urna nec interdum. Quisque vel ullamcorper nisi. In blandit dictum mi, a tincidunt ligula mattis non. Pellentesque id mi tristique, posuere risus sit amet, lacinia dui. Cras non bibendum nulla. Suspendisse tempor non urna ac laoreet. Maecenas et dictum dui, dictum sagittis ligula. Curabitur sodales, leo id volutpat euismod, risus purus vulputate ex, sit amet mattis velit mauris vel purus. Phasellus bibendum iaculis quam ut lacinia. Nullam elementum suscipit leo, sed tincidunt mi tincidunt vitae. Etiam convallis ante at massa maximus, eget efficitur quam dictum. Etiam ac turpis non elit tincidunt volutpat. Nunc commodo nisl tristique augue ultricies semper. Duis a diam leo.

                            Cras ultrices volutpat neque, at molestie tortor auctor nec. Suspendisse placerat pellentesque urna, in vehicula lorem tristique sed. Aenean dui dolor, dictum eget leo at, malesuada euismod libero. Ut vel mauris consequat, tempus neque eget, faucibus diam. Nunc urna quam, sagittis id risus sit amet, porttitor efficitur turpis. Maecenas eu lacus quis nisi interdum vulputate quis sit amet est. Integer porttitor posuere enim, et ultrices tortor. Quisque enim ante, auctor sed commodo et, venenatis vitae ex. Sed semper facilisis maximus. Integer congue faucibus condimentum.

                            Cras lacinia elit vitae metus eleifend, non ultrices quam vestibulum. Nulla facilisi. Vestibulum fermentum gravida risus, vitae consequat nisi auctor a. Morbi vitae magna volutpat, gravida diam eget, tristique augue. Integer sollicitudin tortor at massa consectetur, vel ultrices risus condimentum. Ut eget interdum ante, at tincidunt ligula. Maecenas aliquam ligula non est maximus, a mattis purus congue. Fusce tortor est, iaculis sit amet tincidunt nec, ultricies quis dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        </div>

                        <span className="LoginHeader">
                           Privacy Statement
                       </span>
                        <div className="terms_text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sodales iaculis urna nec interdum. Quisque vel ullamcorper nisi. In blandit dictum mi, a tincidunt ligula mattis non. Pellentesque id mi tristique, posuere risus sit amet, lacinia dui. Cras non bibendum nulla. Suspendisse tempor non urna ac laoreet. Maecenas et dictum dui, dictum sagittis ligula. Curabitur sodales, leo id volutpat euismod, risus purus vulputate ex, sit amet mattis velit mauris vel purus. Phasellus bibendum iaculis quam ut lacinia. Nullam elementum suscipit leo, sed tincidunt mi tincidunt vitae.
                        </div>

                        <span className="LoginHeader">
                           Personal information we collect
                       </span>
                        <div className="terms_text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sodales iaculis urna nec interdum. Quisque vel ullamcorper nisi. In blandit dictum mi, a tincidunt ligula mattis non. Pellentesque id mi tristique, posuere risus sit amet, lacinia dui. Cras non bibendum nulla. Suspendisse tempor non urna ac laoreet. Maecenas et dictum dui, dictum sagittis ligula. Curabitur sodales, leo id volutpat euismod, risus purus vulputate ex, sit amet mattis velit mauris vel purus. Phasellus bibendum iaculis quam ut lacinia. Nullam elementum suscipit leo, sed tincidunt mi tincidunt vitae.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sodales iaculis urna nec interdum. Quisque vel ullamcorper nisi. In blandit dictum mi, a tincidunt ligula mattis non. Pellentesque id mi tristique, posuere risus sit amet, lacinia dui. Cras non bibendum nulla. Suspendisse tempor non urna ac laoreet. Maecenas et dictum dui, dictum sagittis ligula. Curabitur sodales, leo id volutpat euismod, risus purus vulputate ex, sit amet mattis velit mauris vel purus. Phasellus bibendum iaculis quam ut lacinia. Nullam elementum suscipit leo, sed tincidunt mi tincidunt vitae.
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TermsAndConditions;
