import React, { Component } from 'react'
import "../../styles/Organisations.css"
import isEmpty from "lodash/isEmpty";
import axios from "axios";
import Board from "react-trello";

export class Todos extends Component {

    state = {
        data: {}
    };

    componentDidMount() {
        this.getTodos();
    }

    getTodos = () => {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                const data = {
                    lanes: [
                        {
                            id: "applicants",
                            title: "Applicants",
                            style: { width: 280 },
                            cards: res.data.map(user => ({
                                id: user.id.toString(),
                                title: user.name,
                                description: user.email
                            }))
                        },
                        {
                            id: "interviewed",
                            title: "Interviewed",
                            style: { width: 280 },
                            cards: []
                        }
                    ]
                };

                this.setState({ data });
            })
            .catch(error => {
                console.error(error);
            });
    };


    render() {
        const { data } = this.state;
        return (
            <div className="organisations">
                {!isEmpty(data) ? <Board data={data} draggable /> : <p>Loading...</p>}
                {/*{this.state.data.length > 0 ?  <Board data={data} draggable /> : <p>Loading...</p>}*/}
            </div>
        );
    }
}

export default Todos

// import React,{Component} from "react";
// import Board from 'react-trello'
// import axios from "axios";
// import "../../styles/Organisations.css"
//
// export default class Todos extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             board: {lanes:[]}
//         }
//
//
//     }
//
//
//
//     componentDidMount() {
//         this.get_column()
//
//     }
//
//
//     get_column = () =>{
//
//         let user_id = localStorage.getItem('UserId');
//         // console.log(res.data);
//         if(this.props.match) {
//             const {match: {params}} = this.props;
//             /* console.log(params.id);*/
//
//             axios.get('http://localhost:8000/'+ user_id +'/projects/'+ params.id+'/projects', {headers: {'Authorization': `${localStorage.getItem('UserToken')}`}}).then( (response) => {
//                 const data_elem = [];
//                 response.data.map( (elem) =>{
//                     //console.log(elem.id);
//
//                     axios.get('http://localhost:8000/'+ user_id +'/projects/columns/'+elem.id+'/cards', {headers: {'Authorization': `${localStorage.getItem('UserToken')}`}}).then((res) => {
//                         // console.log(res.data);
//                         if(res.data.length > 0){
//                             elem['cards'] = res.data;
//                         }
//
//                     });
//
//                     data_elem.push(elem);
//
//                 });
//
//
//                 if(data_elem.length > 0){
//                     this.setState({board:{lanes: data_elem}})
//                 }
//
//             });
//
//
//
//         }
//     }
//
//     render() {
//
//         if(this.state.board.lanes.length > 0 ) {console.log(this.state.board)}
//
//         return (<div className="organisations">
//
//             {this.state.board.lanes.length > 0 ? <Board data={this.state.board} draggable/>: <p>Loading...</p>}
//         </div>)
//     }
// }
//
