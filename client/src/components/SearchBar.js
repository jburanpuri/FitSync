import React, { useState, useRef } from "react";
import "./Exercisedatabase.css"

function SearchBar(){
    const[searchTerm, setSearchTerm] = useState('');
    return(
        <input type="text" className="search" placeholder="Search Exercises..." onChange={event => {setSearchTerm(event.target.value)}}/>
    );
}

export default SearchBar;