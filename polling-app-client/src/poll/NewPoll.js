import React, { Component } from 'react';
import  Weather from './Weather';


class NewPoll extends Component {
    
    render() {
      
        return (
            <div className="polls-container">
               <div className="load-more-polls">
                    <span> {new Date().toLocaleString()} </span>
               </div> 
               <div className="load-more-polls">
               <Weather/> 
               </div>
            </div>
             
        );
    }
}

export default NewPoll;