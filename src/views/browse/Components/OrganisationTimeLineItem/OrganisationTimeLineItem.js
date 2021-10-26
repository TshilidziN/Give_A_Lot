import {
    TimelineConnector,
    TimelineContent,
    TimelineDot, TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import React from "react";


function OrganisationTimeLineItem(props)
{
    return(

        <TimelineItem>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                    {props.date}
                </Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
                <TimelineDot></TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent>
                <Paper elevation={3} id={"timeLinePaper"}>
                    <Typography variant="h6" component="h1" id={"timeLineTitle"}>
                        {props.title}
                    </Typography>
                    <Typography id={"timelineParagraph"}>{props.description}</Typography>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    )
}

export default OrganisationTimeLineItem;