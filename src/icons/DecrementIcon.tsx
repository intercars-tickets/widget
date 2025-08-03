import {ISvgIcon} from "../abstractions/ISvgIcon";
import {ICON_SIZE_DEFAULT} from "../constants/ComponentStyles";
import React from "react";

export function DecrementIcon({iconSize = ICON_SIZE_DEFAULT}: ISvgIcon) {
    return (<>
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" >
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M5.2002 11.5C5.2002 11.3343 5.33451 11.2 5.5002 11.2L18.5002 11.2C18.6659 11.2 18.8002 11.3343 18.8002 11.5L18.8002 12.5C18.8002 12.6657 18.6659 12.8 18.5002 12.8L5.5002 12.8C5.33451 12.8 5.2002 12.6657 5.2002 12.5L5.2002 11.5Z"
                  fill="#FFFFFF"/>
        </svg>
    </>)
}