import React from "react";
import {ISvgIcon} from "../abstractions/ISvgIcon";
import {ICON_SIZE_DEFAULT} from "../constants/ComponentStyles";

export function ArrowFormIcon({iconSize=ICON_SIZE_DEFAULT}:ISvgIcon) {
    return (<svg width={iconSize} height={iconSize} viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2985_5275)">
                <circle cx="16.3458" cy="16" r="15" fill="white" stroke="#0243A6" strokeWidth="2"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M14.1565 16.4999L11.1565 19.4999L14.1565 22.4999L13.0958 23.5606L9.56546 20.0303C9.27257 19.7374 9.27257 19.2625 9.56546 18.9696L13.0958 15.4393L14.1565 16.4999Z"
                      fill="#0243A6"/>
                <path d="M10.8458 18.75L19.3458 18.75V20.25H10.8458V18.75Z" fill="#0243A6"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M18.5351 9.49993L21.5351 12.4999L18.5351 15.4999L19.5958 16.5606L23.1261 13.0303C23.419 12.7374 23.419 12.2625 23.1261 11.9696L19.5958 8.43927L18.5351 9.49993Z"
                      fill="#0243A6"/>
                <path d="M21.8458 11.75H13.3458V13.25H21.8458V11.75Z" fill="#0243A6"/>
            </g>
            <defs>
                <clipPath id="clip0_2985_5275">
                    <rect width="32" height="32" fill="white" transform="translate(0.345795)"/>
                </clipPath>
            </defs>
        </svg>
    )
}