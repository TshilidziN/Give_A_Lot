import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import "../Calendar/styles/Calendar.css"
import {
    Scheduler,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    WeekView,
    MonthView,
    EditRecurrenceMenu,
    AllDayPanel,
    ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import axios from "axios";
import OrgSidebar from "../DemoSidebar/OrgSidebar";

export default class OrgCalendar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentDate: new Date().toDateString(),
            email: localStorage.getItem('curr_user_email'),
            eventAdded: false,
            addedAppointment: {},
            appointmentChanges: {},
            editingAppointment: undefined,
            serverDomain : 'https://givealotcharities.herokuapp.com'
        };

        this.commitChanges = this.commitChanges.bind(this);
        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
        this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
    }

    changeAddedAppointment(addedAppointment) {
        this.setState({ addedAppointment });
    }

    changeAppointmentChanges(appointmentChanges) {
        this.setState({ appointmentChanges });
    }

    changeEditingAppointment(editingAppointment) {
        this.setState({ editingAppointment });
    }

    commitChanges({ added, changed, deleted }) {

        this.setState((state) => {
            let { data } = state;
            console.log(data)

            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
                let startTime = data[data.length-1].startDate.toString().split(" ")[4];
                let endTime = data[data.length-1].endDate.toString().split(" ")[4];
                let title = data[data.length-1].title;
                let description = data[data.length-1].notes;
                let startDateYear = data[data.length-1].startDate.toString().split(" ")[3];
                let startDateMonth = data[data.length-1].startDate.toString().split(" ")[1];
                let startDateDay = data[data.length-1].startDate.toString().split(" ")[2];
                let eventStartDate = startDateYear +'-' + startDateMonth + '-' + startDateDay;

                let endDateYear = data[data.length-1].endDate.toString().split(" ")[3];
                let endDateMonth = data[data.length-1].endDate.toString().split(" ")[1];
                let endDateDay = data[data.length-1].endDate.toString().split(" ")[2];
                let eventEndDate = endDateYear +'-' + endDateMonth + '-' + endDateDay;

                const eventDayAndTime = {
                    eventTitle: title,
                    eventDescription: description,
                    eventStartTime: startTime,
                    eventEndTime: endTime,
                    eventStartDate: eventStartDate,
                    eventEndDate: eventEndDate,
                    userEmail : this.state.email
                }

                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    }
                }
                axios.post(this.state.serverDomain + '/event/calender/add', eventDayAndTime ,config)
                    .then(response =>{
                    })
                    .catch(error =>{
                        console.log(error)
                    })
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id] ?
                        { ...appointment, ...changed[appointment.id] } : appointment));

                let testing = changed.undefined

                if(testing.title !== undefined){
                    let config = {
                        headers: {
                            "Content-Type": "application/json",
                            'Access-Control-Allow-Origin': '*',
                        }
                    }
                    let eventId = data[data.length-1].eventId
                    const titleUpdate = {
                        "userEmail" : this.state.email,
                        "eventId" : eventId,
                        "newTitle" : testing.title
                    }

                    axios.post(this.state.serverDomain + '/event/calender/edit/title', titleUpdate ,config)
                        .then(response =>{

                        })
                        .catch(error =>{
                            console.log(error)
                        })
                }

                if(testing.startDate !== undefined){

                    let config = {
                        headers: {
                            "Content-Type": "application/json",
                            'Access-Control-Allow-Origin': '*',
                        }
                    }

                    let startDateMonth = testing.startDate.toString().split(" ")[1];
                    let startDateYear = testing.startDate.toString().split(" ")[3];
                    let startDateDay = testing.startDate.toString().split(" ")[2];
                    let eventStartDate = startDateYear +'-' + startDateMonth + '-' + startDateDay;

                    let eventId = data[data.length-1].eventId
                    const startDateUpdate = {
                        "userEmail" : this.state.email,
                        "eventId" : eventId,
                        "newDate" : eventStartDate
                    }
                    axios.post(this.state.serverDomain + '/event/calender/edit/date/start', startDateUpdate ,config)
                    .then(response =>{
                    })
                    .catch(error =>{
                        console.log(error)
                    })
                }

                if(testing.endDate !== undefined){
                    let config = {
                        headers: {
                            "Content-Type": "application/json",
                            'Access-Control-Allow-Origin': '*',
                        }
                    }
                    let endDateMonth = testing.endDate.toString().split(" ")[1];
                    let endDateYear = testing.endDate.toString().split(" ")[3];
                    let endDateDay = testing.endDate.toString().split(" ")[2];
                    let eventEndDate = endDateYear +'-' + endDateMonth + '-' + endDateDay;

                    let eventId = data[data.length-1].eventId
                    const endDateUpdate = {
                        "userEmail" : this.state.email,
                        "eventId" : eventId,
                        "newDate" : eventEndDate
                    }
                    axios.post(this.state.serverDomain + '/event/calender/edit/date/end', endDateUpdate ,config)
                        .then(response =>{
                        })
                        .catch(error =>{
                            console.log(error)
                        })
                }

                if(testing.startDate !== undefined){
                    let startTime =testing.startDate.toString().split(" ")[4];
                    let config = {
                        headers: {
                            "Content-Type": "application/json",
                            'Access-Control-Allow-Origin': '*',
                        }
                    }
                    let eventId = data[data.length-1].eventId
                    const startTimeUpdate = {
                        "userEmail" : this.state.email,
                        "eventId" : eventId,
                        "newTime" : startTime
                    }
                    axios.post(this.state.serverDomain + '/event/calender/edit/time/start', startTimeUpdate ,config)
                        .then(response =>{
                        })
                        .catch(error =>{
                            console.log(error)
                        })
                }

                if(testing.endDate !== undefined){
                    let endTime =testing.endDate.toString().split(" ")[4];
                    let config = {
                        headers: {
                            "Content-Type": "application/json",
                            'Access-Control-Allow-Origin': '*',
                        }
                    }
                    let eventId = data[data.length-1].eventId
                    const endTimeUpdate = {
                        "userEmail" : this.state.email,
                        "eventId" : eventId,
                        "newTime" : endTime
                    }
                    console.log(endTimeUpdate)
                    axios.post(this.state.serverDomain + '/event/calender/edit/time/end', endTimeUpdate ,config)
                        .then(response =>{
                        })
                        .catch(error =>{
                            console.log(error)
                        })
                }

                if(testing.notes !== undefined){
                    let config = {
                        headers: {
                            "Content-Type": "application/json",
                            'Access-Control-Allow-Origin': '*',
                        }
                    }
                    let eventId = data[data.length-1].eventId
                    const descriptionUpdate = {
                        "userEmail" : this.state.email,
                        "eventId" : eventId,
                        "newDescription" : testing.notes
                    }
                    console.log(descriptionUpdate)
                    axios.post(this.state.serverDomain + '/event/calender/edit/description', descriptionUpdate ,config)
                        .then(response =>{
                        })
                        .catch(error =>{
                            console.log(error)
                        })
                }
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
    }
    componentDidMount() {
        this.getEvents();
    }

    getEvents(){
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        axios.get(this.state.serverDomain +'/event/get/calender/'+this.state.email,  config)
            .then(response =>{
                this.setState({data: response.data.object})
            })
            .catch(error =>{
                console.log(error)
            })
    }

    render() {
        const {
            currentDate, data, addedAppointment, appointmentChanges, editingAppointment,
        } = this.state;

        return (
            <div className="trythis">
                <div>
                    <OrgSidebar />
                </div>
            <div className="calendar">
                    <Paper>
                        <Scheduler
                            data={data}
                            height={660}
                            remoteFiltering={true}
                        >
                            <ViewState
                                currentDate={currentDate}
                            />
                            <EditingState
                                onCommitChanges={this.commitChanges}
                                addedAppointment={addedAppointment}
                                onAddedAppointmentChange={this.changeAddedAppointment}
                                appointmentChanges={appointmentChanges}
                                onAppointmentChangesChange={this.changeAppointmentChanges}
                                editingAppointment={editingAppointment}
                                onEditingAppointmentChange={this.changeEditingAppointment}
                            />
                            <MonthView />
                            <AllDayPanel />
                            <EditRecurrenceMenu />
                            <ConfirmationDialog />
                            <Appointments />
                            <AppointmentTooltip
                                showOpenButton
                                showDeleteButton
                            />
                            <AppointmentForm />
                        </Scheduler>
                    </Paper>
            </div>
            </div>

        );
    }
}
