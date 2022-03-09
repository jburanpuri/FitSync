import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Collapsible from './Collapsible';
import SearchBar from './SearchBar';
import "./Exercisedatabase.css"

export default class exercisedatabase extends Component {

    constructor(props){
        super(props);
        this.state = {exercises:[]}
    }
   
    componentDidMount = () => {
        this.getExercise();
        
    };
    
    // SearchBar=()=>{
    //     const[searchTerm, setSearchTerm] = useState('');
    //     return(
    //         <input type="text" className="search" placeholder="Search Exercises..." onChange={event => {setSearchTerm(event.target.value)}}/>
    //     );
    // }

    getExercise = () => {
        axios.get('http://127.0.0.1:5000/exercises/')
        .then((response)=>{
            const data = response.data
            this.setState({exercises:data});
            console.log("Data has been received!")
        })
        .catch((error)=>{
            console.log("Error: " + error);
        })
    }
    displayExercises = (exercises) => {
        if(!exercises.length){
            console.log("null");
        }

        return exercises.map((exercise, index)=>
          (
            <div key = {index}>
                <br></br><br></br><br></br>
                <Collapsible label={exercise.exerciseName}>
                    
                    <div id="centerVideo">
                        <video id="animation"  src={`videos/${exercise.exerciseName.replace(/\s/g, "")}.mp4`} autoPlay loop muted>
                        </video>
                    
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

                    <h3>{exercise.exerciseName}</h3>
                    <h5>{exercise.description}</h5>
                    <h3>Tips</h3>
                    <h5>{exercise.tips}</h5>
                    </div>
                </Collapsible>    
            </div>
            )
        );
    };

    render(){
        let content
        console.log(this.state.exercises)
        if(this.state.exercises == []){
            content = <h3></h3>
        }
        else{
            content = <div className = "inExercise">
            {this.displayExercises(this.state.exercises)} </div>

        }
        
        return(
            
            <div> 
                {content}
            </div>
        )
    }
}