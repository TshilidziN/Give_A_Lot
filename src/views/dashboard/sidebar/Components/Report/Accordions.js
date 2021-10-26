import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ReportIcon from '@material-ui/icons/Report';
import AccordionActions from '@material-ui/core/AccordionActions';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {ApiContext} from "../../../../../apiContext/ApiContext";



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding:  '7px 20px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,


    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    hidden:{
        color: "",
    }
}));

export default function Accordions({org,id,title, description,appeal}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [orgId] = React.useState(org);
    const [reportId] = React.useState(id);
    const [message, setMessage] = React.useState("");
    const [appeal1, setAppeal1] = React.useState(appeal);
    const [serverDomain] = useState(useContext(ApiContext))

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleInput=(e)=>{
        setMessage(e.target.value)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) =>{

        e.preventDefault()
        const postData= {
            message,
            reportId,
            orgId,
        };

        axios.post(serverDomain + "/report/appeal/", postData)
            .then(res=>{
                console.log(res)
                setAppeal1(true);
            }).catch(err=>{
                console.log(err)
        })

    }


    if(appeal1){
        return (
            <div className={classes.root}>

                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography className={classes.heading}>
                            <ReportIcon className="iconReport"/>
                            Report {id}
                        </Typography>

                        <Typography className={classes.secondaryHeading}>
                            {title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {description}
                        </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>

                        <button size="small" className="AppealButton1" onClick={handleClickOpen}>
                            Appealed
                        </button>
                    </AccordionActions>
                </Accordion>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Can not make an appeal</DialogTitle>
                        <DialogContent>
                            <DialogContentText >
                                Appeal has already been sent, awaiting Admin response.
                            </DialogContentText>

                        </DialogContent>

                </Dialog>
            </div>
        );
    }else
        return (
        <div className={classes.root}>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>
                        <ReportIcon className="iconReport"/>
                       Report {id}
                    </Typography>

                    <Typography className={classes.secondaryHeading}>
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {description}
                    </Typography>
                </AccordionDetails>
                <Divider />
                <AccordionActions>

                    <button size="small" className="AppealButton" onClick={handleClickOpen}>
                        Appeal
                    </button>
                </AccordionActions>
            </Accordion>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Make an appeal</DialogTitle>
                <form onSubmit={e => { handleSubmit(e) }}>
                <DialogContent>
                    <DialogContentText className={classes.hidden}>
                        Do not remove this line , it is very important.Do not remove this line , it is .
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id="appeal"
                        label="Description"
                        multiline
                        rows={5}
                        name="appeal"
                        variant="outlined"
                        onChange={handleInput}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type={"submit"} onClick={handleClose} color="primary">
                        Submit
                    </Button>
                </DialogActions>

                </form>
            </Dialog>
        </div>
    );
}
