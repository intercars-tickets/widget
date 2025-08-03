import React from "react";
import {ISvgIcon} from "../abstractions/ISvgIcon";

export function AirConditionerIcon({iconSize}: ISvgIcon) {
    return (<>
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M12 23.25C18.2132 23.25 23.25 18.2132 23.25 12C23.25 5.7868 18.2132 0.75 12 0.75C5.7868 0.75 0.75 5.7868 0.75 12C0.75 18.2132 5.7868 23.25 12 23.25ZM12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                  fill="#2B394D"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M5.25 7.875C5.25 7.25368 5.75368 6.75 6.375 6.75H17.625C18.2463 6.75 18.75 7.25368 18.75 7.875V13.125C18.75 13.7463 18.2463 14.25 17.625 14.25H16.875V12.75C16.875 12.1287 16.3713 11.625 15.75 11.625H8.25C7.62868 11.625 7.125 12.1287 7.125 12.75V14.25H6.375C5.75368 14.25 5.25 13.7463 5.25 13.125V7.875ZM7.875 8.625V10.125H7.125V8.625H7.875ZM9.375 8.625V10.125H8.625V8.625H9.375Z"
                  fill="#2B394D"/>
            <path
                d="M16.125 12.75V14.25H7.875V12.75C7.875 12.5429 8.04289 12.375 8.25 12.375H15.75C15.9571 12.375 16.125 12.5429 16.125 12.75Z"
                fill="#2B394D"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.75 15V18H12V15H12.75Z" fill="#2B394D"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M16.099 14.9541L16.8755 17.8518L16.151 18.0459L15.3745 15.1482L16.099 14.9541Z" fill="#2B394D"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M7.87455 17.8518L8.65101 14.9541L9.37545 15.1482L8.59899 18.0459L7.87455 17.8518Z" fill="#2B394D"/>
        </svg>
    </>)
}