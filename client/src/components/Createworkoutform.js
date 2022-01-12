import axios from 'axios';
import React, {Component,useState} from 'react';
import {useForm, Controller} from 'react-hook-form'


import{
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormInput,
    FormSelect,
    Container,
    Row,    
    Col,
    Button
} from "shards-react";

import "shards-ui/dist/css/shards.min.css"

function Createworkoutform({formData = {
    workoutName: 'Sample Name',
    exercises:[
        {
        name:'Sample Exercise',
        sets:'#',
        repetitions:'#'
    },],
},},){
    
    const{register, errors, handleSubmit} = useForm({
        mode:'all',
        reValidateMode:"all",
        defaultValues: formData,
    });
    
    const [exerciseIDs, setExerciseIDs] = useState(Object.keys(formData.exercises))

    const onSubmit = (data) => {
        console.log({
            ...data, 
            exercises:Object.values(data.exercises),
            
        }); 
        const newWorkout = {
            workoutName: data.workoutName,
            exercises: data.exercises

        }
        axios.post('http://127.0.0.1:5000/workouts/addWorkout', newWorkout)
        .then(res => console.log(res.data));
    }

    const onAddExercise = () => {
        setExerciseIDs([...exerciseIDs, exerciseIDs.length++]);
    }

    const onDeleteExercise = (index) => {
        setExerciseIDs(exerciseIDs.filter((id) => id != index));
    }

    return(
            <div><p>yaayyyy</p>  
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup className="mb-2">
                    <InputGroupAddon type="prepend">
                        <InputGroupText>Workout Name</InputGroupText>
                    </InputGroupAddon>
                    <input placeholder="Name of Workout" {...register('workoutName', {required:true})}/>
                    </InputGroup>
                <Container>
                    {exerciseIDs.map((index) => (
                         <Row key={index}>
                         <Col>
                         <input placeholder="Name of Exercise" {...register(`exercises.${index}.name`, {required:true})}/>
                         </Col>
                         <Col>
                         <input placeholder="Number of Sets" {...register(`exercises.${index}.sets`, {required:true})}/>
                         </Col>
                         <Col>
                         <input placeholder="Number of Repetitions" {...register(`exercises.${index}.repetitions`, {required:true})}/>
                         </Col>
                         <Col sm="1">
                         <Button onClick={()=>{
                             onDeleteExercise(index)}
                             }>Delete</Button>
                         </Col>
                     </Row>
                    ))}
                   
            
        
            <div>
            <Button onClick={()=>onAddExercise()}>Add Exercise</Button>
            </div>
            <div>
            <Button type='submit'>Submit</Button>
            </div>
            </Container>
           </form>
           </div>  
    );
}

export default Createworkoutform;