import React from "react"

type PointIconProps = {
    sizeIcon: "big"|"small"
}

export function PointIcon({sizeIcon}: PointIconProps)
{
    return(<>
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            {sizeIcon === "big" &&
                <circle id="start" cx="25" cy="25" r="8" stroke="#6a85ab" strokeWidth="5" fill="white"/>}
            {sizeIcon === "small" &&
                <circle id="start" cx="25" cy="25" r="4" stroke="#6a85ab" strokeWidth="5" fill="white"/>}
        </svg>
    </>)
}