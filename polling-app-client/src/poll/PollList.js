import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './PollList.css';
import inicio from '../img/inicio.jpg'


class PollList extends Component {

    render() {

        return (
            <div className="polls-container">
               <div className="load-more-polls">
                   <img src={inicio} width='100%' alt="soluciones_logo"/>
                   
               </div> 
               
            </div>
             
        );
    }
}

export default withRouter(PollList);