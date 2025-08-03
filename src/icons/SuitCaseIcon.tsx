import React from "react";
import {ISvgIcon} from "../abstractions/ISvgIcon";
import {ICON_SIZE_DEFAULT} from "../constants/ComponentStyles";

export function SuitCaseIcon ({iconSize=ICON_SIZE_DEFAULT}:ISvgIcon) {
    return (<>
        <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Suitcase">
                <path id="Ellipse 51 (Stroke)" fillRule="evenodd" clipRule="evenodd"
                      d="M16 31C24.2843 31 31 24.2843 31 16C31 7.71573 24.2843 1 16 1C7.71573 1 1 7.71573 1 16C1 24.2843 7.71573 31 16 31ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                      fill="currentColor"/>
                <g id="Vector">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M17.5 9V7C17.5 6.72386 17.2761 6.5 17 6.5H15C14.7239 6.5 14.5 6.72386 14.5 7V9H13.5V7C13.5 6.17157 14.1716 5.5 15 5.5H17C17.8284 5.5 18.5 6.17157 18.5 7V9H17.5Z"
                          fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M11.5 10C10.6716 10 10 10.6716 10 11.5V23.5C10 24.3284 10.6716 25 11.5 25H12V25.5C12 25.7761 12.2239 26 12.5 26C12.7761 26 13 25.7761 13 25.5V25H19V25.5C19 25.7761 19.2239 26 19.5 26C19.7761 26 20 25.7761 20 25.5V25H20.5C21.3284 25 22 24.3284 22 23.5V11.5C22 10.6716 21.3284 10 20.5 10H11.5ZM14 13L14 23H13V13H14ZM19 13V23H18V13H19Z"
                          fill="currentColor"/>
                </g>
            </g>
        </svg>
    </>)
}