import React, {Component, useState} from 'react';
import axios from 'axios';
import "./Exercisedatabase.css"
import Collapsible from './Collapsible';

export default class Findworkout extends Component {

    state = {
        workouts: [],
        exercises: [],
        value: '',
        sets:[],
        reps:[]
    };

    

    getValue = (event) => {
        console.log(event.target.value)
        this.setState({value: event.target.value})
    }



    handleSubmit = (event) => {
        event.preventDefault()
        const search = this.state.value;
        console.log(search);
        this.getWorkout();
    }

    displayWorkout = (exercises) => {
        return (    
            exercises.map((exercise, index)=>(
                <div key = {index}>
                    <div className="centerVideo">
                    <video className="animation"  src={`videos/${exercise.exerciseName.replace(/\s/g, "")}.mp4`} autoPlay loop muted>
                        </video>
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    <h3>{exercise.exerciseName}</h3>
                    <h5>{exercise.description}</h5>
                    <h3>Tips</h3>
                    <h5>{exercise.tips}</h5>
                    </div>
                </div>
            
        )
            ))
    }

    getWorkout = () => {
        
        axios.get('http://127.0.0.1:5000/workouts/workoutSearch/'+this.state.value)
        .then((response) => {
            const workout = response.data
            this.setState({workouts:workout})
            console.log(this.state.workouts)
            for(let i of workout.exercises){
                const name = i.name;
                const sets = i.sets;
                const reps = i.repetitions;
                console.log(name);
                axios.get('http://127.0.0.1:5000/exercises/exerciseSearch/'+name)
                .then((res)=>{
                    const exercise = res.data;
                    this.setState(previousState => ({
                        exercises:[...previousState.exercises,exercise]
                    }));
                    console.log(this.state.exercises);
               
                     
                //   return(
                //     <div>
                //         <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
                //     <div className="centerVideo">
                //             <video className="animation"  src={`videos/${this.state.exercises.exerciseName.replace(/\s/g, "")}.mp4`} autoPlay loop muted>
                //             </video>
                //         <h3>{this.state.exercises.exerciseName}</h3>
                //         <h5>{this.state.exercises.description}</h5>
                //         <h3>Tips</h3>
                //         <h5>{this.state.exercises.tips}</h5>
                //     </div>
                //     </div>)
                })
            
                .catch(() => {
                    console.log("Errorr"); 
                 });
            }
            
        })
        .catch(() => {
           console.log("Errorr"); 
        });
    }

 
    render(){

        let content
        if(this.state.exercises == []){
            content = <h3></h3>
        }
        else{
            content =<div><div><h2>{this.state.workouts.workoutName}</h2></div><div>{this.displayWorkout(this.state.exercises)}</div></div>
        }

       return(
           <div>
        <br></br><br></br><br></br><br></br><br></br>
        
           <h1>Search by Workout ID</h1>
           <div>
         
            <form>
            <input type='text' placeholder='Workout ID' onChange={this.getValue}/>
            <button type="submit" onClick={this.handleSubmit} >Search Workout</button>
            </form>
                </div>
                <div>
                <div>
                        {content}
                </div>
                </div>
                </div>
       );
    }
}