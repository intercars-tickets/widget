import {ICON_SIZE_DEFAULT} from "../constants/ComponentStyles";
import {ISvgIcon} from "../abstractions/ISvgIcon";
import React from "react";

export function BusDriverIcon({iconSize = ICON_SIZE_DEFAULT}: ISvgIcon) {
    return(<>
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M30 33C30 40.732 23.732 47 16 47C8.26801 47 2 40.732 2 33C2 25.268 8.26801 19 16 19C23.732 19 30 25.268 30 33Z"
                stroke="#D5DDE7" strokeWidth="4"/>
            <rect x="36" y="14" width="4" height="38" rx="2" fill="#D5DDE7"/>
        </svg>
    </>)
}