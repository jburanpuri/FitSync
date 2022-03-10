import React, { Component } from 'react';
import axios from 'axios';
import Collapsible from './Collapsible';
//import SearchBar from './SearchBar';
import "./SearchBar.css"
import "./Exercisedatabase.css"

//import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

var stringSimilarity = require("string-similarity");

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default class exercisedatabase extends Component {

    constructor(props) {
        super(props);
        this.state = { exercises: [], exerciseSearch: [], search: '', searchCompare: '', open: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false] }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount = () => {
        this.getExercise();
        const halfSec = 10;
        let exerciseSearchTest = []
        setInterval(() => {
            if (this.state.search.length > 0 && this.state.search !== this.state.searchCompare) {
                this.state.exercises.forEach(exercise => {
                    let similarity = stringSimilarity.compareTwoStrings(this.state.search.toLowerCase(), exercise.exerciseName.toLowerCase())
                    console.log(similarity)
                    console.log(this.state.search)
                    console.log(exercise.exerciseName)
                    if (similarity >= 0.3) {
                        //this.setState(prevState => ({
                        //    exerciseSearch: [...prevState.exerciseSearch, exercise]
                        //}))
                        exerciseSearchTest.push(exercise)
                    }
                    console.log(this.state.exerciseSearch)
                })
                //this.displayExercises(this.state.exerciseSearch)
                this.setState({ exerciseSearch: exerciseSearchTest, searchCompare: this.state.search }, () => {
                    exerciseSearchTest = []
                    //this.setState({exerciseSearch: []})
                })                     //may need to put in async part
            }
        }, halfSec)
    };

    // SearchBar=()=>{
    //     const[searchTerm, setSearchTerm] = useState('');
    //     return(
    //         <input type="text" className="search" placeholder="Search Exercises..." onChange={event => {setSearchTerm(event.target.value)}}/>
    //     );
    // }

    /*exerciseSearch = () => {
        const[exerciseName, setExerciseName] = useState('');
        axios.post('http://127.0.0.1:5000/exercises/exerciseSearch', {
        })
    }*/

    handleOpen = (index) => {
        let newArray = [...this.state.open]
        newArray[index] = true
        this.setState({ open: newArray })
        console.log("open")
    }
    handleClose = (index) => {
        let newArray = [...this.state.open]
        newArray[index] = false
        this.setState({ open: newArray })
        console.log("close")
    }

    handleChange = (event) => {
        this.setState({ search: event.target.value })
    }

    getExercise = () => {
        axios.get('http://127.0.0.1:5000/exercises/')
            .then((response) => {
                const data = response.data
                this.setState({ exercises: data });
                console.log("Data has been received!")
            })
            .catch((error) => {
                console.log("Error: " + error);
            })
    }
    displayExercises = (exercises) => {
        console.log(exercises)
        if (!exercises.length) {
            console.log("null");
        }
        /*console.log(exercises)
        console.log(exerciseSearch)
        if(this.state.search.length > 0 && this.state.search != this.state.searchCompare) {
            console.log("dragon")
            exercises.forEach(exercise => {
                let similarity = stringSimilarity.compareTwoStrings(this.state.search, exercise.exerciseName)
                if(similarity > 0) {
                    console.log("baddy")
                    this.setState(prevState => ({
                        exerciseSearch: [...prevState.exerciseSearch, exercise]
                    }))
                }
            })
            this.setState({searchCompare: this.state.search})

            return (
                exerciseSearch.map((exercise, index)=>(
                    <div key = {index}>
                        <br></br><br></br><br></br>
                        <Collapsible label={exercise.exerciseName}>
                            
                            <div className="centerVideo">
                                <video className="animation"  src={`videos/${exercise.exerciseName.replace(/\s/g, "")}.mp4`} autoPlay loop muted>
                                </video>
                            
                            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    
                            <h3>{exercise.exerciseName}</h3>
                            <h5>{exercise.description}</h5>
                            <h3>Tips</h3>
                            <h5>{exercise.tips}</h5>
                            </div>
                        </Collapsible>    
                    </div>
                    ))
            )
        }*/
        return (
            exercises.map((exercise, index) => (
                <div key={index}>
                    <br></br><br></br><br></br>
                    <Collapsible label={exercise.exerciseName}>

                        <div className="centerVideo">
                            <video className="animation" src={`videos/${exercise.exerciseName.replace(/\s/g, "")}.mp4`} autoPlay loop muted></video>
                            <Button onClick={() => this.handleOpen(index)}>expand</Button>
                            <Modal
                                open={this.state.open[index]}
                                onClose={() => this.handleClose(index)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <div id="centerModalVideo">
                                        <video className="animation2" src={`videos/${exercise.exerciseName.replace(/\s/g, "")}.mp4`} autoPlay loop muted></video>
                                    </div>
                                </Box>
                            </Modal>

                            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

                            <h3>{exercise.exerciseName}</h3>
                            <h5>{exercise.description}</h5>
                            <h3>Tips</h3>
                            <h5>{exercise.tips}</h5>
                        </div>
                    </Collapsible>
                </div>
            ))
        )
    };

    render() {
        let content
        if (this.state.exercises === []) {
            content = <h3></h3>
        }
        else if (this.state.exercises.length > 0 && this.state.exerciseSearch.length > 0) {
            content = <div className="inExercise">
                {this.displayExercises(this.state.exerciseSearch)} </div>
        }
        else {
            content = <div className="inExercise">
                {this.displayExercises(this.state.exercises)} </div>
        }
        if (document.getElementById('search') != null) {
            console.log(document.getElementById('search').value);
        }
        //if(document.getElementById('search').value == null) {
        //    console.log('badump')
        //}
        //console.log(document.getElementById('search').value)

        return (
            <div>
                {console.log("hmmmm")}
                <div id="searchDiv">
                    <form id="searchForm" action={`http://127.0.0.1:5000/exercises/exerciseSearch/`} method="get">
                        <input
                            type="text"
                            id="search"
                            placeholder='Search for Exercise'
                            onChange={this.handleChange}
                            value={this.state.search}
                        />
                    </form>
                </div>
                <div>
                    {content}
                </div>
            </div>
        )
    }
}