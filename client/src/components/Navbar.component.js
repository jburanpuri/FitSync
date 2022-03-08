import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"

export default class Navbar extends Component {

    render(){

        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/">FitSync</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/createworkout">Create Workout</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/exercisedatabase">Exercise Database</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}