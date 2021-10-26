import React from "react";
import browse_general_footer from "../../Styles/browse_general_footer.css"

function Footer()
{
    return (
        <div className="footer-clean">
            <footer>
                <div className="container">
                    <div className="container2">
                        <div className="">
                            <h3>Links</h3>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">verify certificate</a></li>

                            </ul>
                        </div>
                        <div className="">
                            <h3>About</h3>
                            <ul>
                                <li><a href="#">Deepsink</a></li>
                                <li><a href="#">Team</a></li>

                            </ul>
                        </div>
                        <div className="">
                            <h3>contact us</h3>
                            <ul>
                                <li><a href="#">contact@givealot.org</a></li>
                                <li><a href="#">011 234 5678</a></li>
                            </ul>
                        </div>
                        <div className="social">
                            <p className="copyright">Givealot © {new Date().getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;