import {CarrierOffer} from "./CarrierOffer";

export interface SearchRouteResponse {
    Result: {
        IsActive: boolean,
        CarrierRoutes: CarrierOffer[],
        Id: string,
        CityDeparture: 1,
        CityArrival: 3,
        DateDeparture: Date,
        DateCreate: Date,
        IsDynamic: boolean
    } | undefined
    Error: string
}