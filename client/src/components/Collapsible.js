import React, { useState, useRef } from "react";
import "./Collapsible.css";

function Collapsible(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [style, setStyle] = useState("hide");

    const hide = () => {
        setStyle("hide");
        console.log("hide");
    }
    const show = () => {
        setStyle("show");
        console.log("show");
    }

    const parentRef = useRef();

    if (parentRef.current)
        console.log(parentRef.current.scrollHeight);

    return (

        <div className="collapsible">
            <div id="centerButton">
                <button className="toggle" onClick={() => {setIsOpen(!isOpen)}}>{props.label}</button>
            </div>
            <div className="content-parent"
                ref={parentRef}
                style={
                    isOpen ? {
                        height: parentRef.current.scrollHeight + "px",
                        display: "inline"
                    }
                        :
                        {
                            height: "0px",
                            display: "none"
                        }
                }
            >
                <div className="content">{props.children}</div>
            </div>
        </div>
    );
}

export default Collapsible;