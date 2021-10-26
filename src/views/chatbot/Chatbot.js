import {Box} from "@material-ui/core";
import "./Styles/Chatbot.css";
import Button from "@material-ui/core/Button";

function Chatbot()
{
    let bot_visible = false;
    const toggleBot = event =>
    {
        event.preventDefault();
        if(bot_visible === false) {
            document.getElementById("iframe").style.display = "block";
            document.getElementById("iframe-givealot-toggle-btn").innerText = "MINIMIZE";
            bot_visible = true;
        }
        else if(bot_visible === true)
        {
            document.getElementById("iframe").style.display = "none";
            document.getElementById("iframe-givealot-toggle-btn").innerText = "ASK GIVEABOT";
            bot_visible = false;
        }
    }
    return (
        <Box id={"iframe-container"}>
            <div id={"iframe"}>
                <iframe src="https://31b4-105-208-196-65.ngrok.io/">
                    sorry, the bot is not available for you
                </iframe>
            </div>

            <Button
                id={"iframe-givealot-toggle-btn"}
                variant={"contained"}
                color={"secondary"}

                onClick={toggleBot}
            >
                ASK GIVEABOT
            </Button>
        </Box>
    )
}

export default Chatbot;
