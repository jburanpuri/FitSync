import React, { useState, useRef } from "react";
import "./Exercisedatabase.css"
import "./SearchBar.css"

const SearchBar = () => (
    <div id="searchDiv">
        <form id="searchForm" action={`http://127.0.0.1:5000/exercises/exerciseSearch/`} method="get">
            <input
                type="text"
                id="search"
                placeholder="Search for Exercise"
            />
            <button id="searchButton" type="submit">Search</button>
        </form>
    </div>
);

/*function SearchBar(){
    const[searchTerm, setSearchTerm] = useState('');
    return(
        <input type="text" className="search" placeholder="Search Exercises..." onChange={event => {setSearchTerm(event.target.value)}}/>
    );
}*/

export default SearchBar;