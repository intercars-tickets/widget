import React from "react";

export function DirectionIcon (){
    return(<>
        <svg width="220" height="30" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="15" x2="200" y2="15" stroke="gray" strokeWidth="3"/>
            <line x1="165" y1="10" x2="180" y2="15" stroke="gray" strokeWidth="3"/>
            <line x1="165" y1="20" x2="180" y2="15" stroke="gray" strokeWidth="3"/>
            <circle id="start" cx="20" cy="15" r="8" stroke="red" strokeWidth="5" fill="white"/>
            <circle id="end" cx="190" cy="15" r="8" stroke="green" strokeWidth="5" fill="white"/>
        </svg>
    </>)
}