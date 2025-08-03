import {ICON_SIZE_DEFAULT} from "../constants/ComponentStyles";
import {ISvgIcon} from "../abstractions/ISvgIcon";
import React from "react";

export function IncrementIcon({iconSize = ICON_SIZE_DEFAULT}: ISvgIcon) {
    return(<>
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M5.2002 11.5C5.2002 11.3343 5.33451 11.2 5.5002 11.2L18.5002 11.2C18.6659 11.2 18.8002 11.3343 18.8002 11.5L18.8002 12.5C18.8002 12.6657 18.6659 12.8 18.5002 12.8L5.5002 12.8C5.33451 12.8 5.2002 12.6657 5.2002 12.5L5.2002 11.5Z"
                  fill="#FFFFFF"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M12.4998 5.20001C12.6655 5.20001 12.7998 5.33433 12.7998 5.50001L12.7998 18.5C12.7998 18.6657 12.6655 18.8 12.4998 18.8L11.4998 18.8C11.3341 18.8 11.1998 18.6657 11.1998 18.5L11.1998 5.50001C11.1998 5.33433 11.3341 5.20001 11.4998 5.20001L12.4998 5.20001Z"
                  fill="#FFFFFF"/>
        </svg>
    </>)
}