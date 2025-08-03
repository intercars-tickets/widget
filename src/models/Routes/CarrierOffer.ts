import {CommonRoute} from "./CommonRoute";

export interface CarrierOffer {
    Routes:CommonRoute[],
    CarrierId:string,
    IsActive:boolean,
}