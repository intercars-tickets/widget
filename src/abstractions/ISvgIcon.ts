import {CSSProperties} from "react";

export interface ISvgIcon {
    iconSize?:string
    //width?:string,
    //height?:string,
    onClick?:()=>void
    svgStyle?:{[selector:string]:CSSProperties}
}