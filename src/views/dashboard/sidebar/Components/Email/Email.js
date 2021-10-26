import React, { Component } from 'react';
import "./Styles/Email.css";
import Axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export class Email extends Component {

constructor(props) {
    super(props);

    this.state={
        recipient:"",
        subject:"",
        message:"",
        file:"",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

}

    onFormSubmit(e) {
        e.preventDefault();
        const data = {
            recipient: this.state.recipient,
            subject: this.state.subject,
            message: this.state.message,
            file: this.state.file,

        };
        console.log(data)
        Axios
            .post("", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    onToast = () => {
        toast.success('Email sent',{
            position: toast.POSITION.TOP_RIGHT

        });
    }

    handleInputChange = input => e => {

        this.setState({ [input]: e.target.value });

    };



    render() {
        return (
            <div className="email">
               <div className="email-container">

                   <div className="_container">
                       <form onSubmit={this.onFormSubmit}>
                           <div className="row">
                               <div className="col-25">
                                   <label className="emailLabel" >Recipient</label>
                               </div>
                               <div className="col-75">
                                   <input
                                       className="emailInput"
                                       type="text"
                                       id="email"
                                       name="email"
                                       placeholder="User email.."
                                       onChange={this.handleInputChange}
                                   />
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-25">
                                   <label className="emailLabel">Subject</label>
                               </div>
                               <div className="col-75">
                                   <input
                                       className="emailInput"
                                       type="text"
                                       id="subject"
                                       name="subject"
                                       placeholder="Your subject.."
                                       onChange={this.handleInputChange}
                                   />
                               </div>
                           </div>

                           <div className="row">
                               <div className="col-25">
                                   <label className="emailLabel">Message</label>
                               </div>
                               <div className="col-75">
                                   <textarea
                                       className="emailInput"
                                       id="message"
                                       name="message"
                                       placeholder="Write something.."
                                       onChange={this.handleInputChange}
                                       style={{height:"200px"}}/>

                               </div>
                           </div>
                           <div className="bottom_">
                               <div className="row">
                                   <input

                                       type="file"
                                       name="file"
                                       onChange={this.handleInputChange}
                                   />
                               </div>
                               <div className="row">
                               <input   className="emailSubmit" type="submit" value="Submit" onClick={this.onToast}/>
                           </div>
                           </div>
                           <div className="form-group">
                               <ToastContainer/>
                           </div>

                       </form>
                   </div>

               </div>
            </div>
        )
    }
}

export default Email