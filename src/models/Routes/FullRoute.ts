import {Tariff} from "./Tariff";

interface BaseCity {
    Id: number,
    NameEng: string,
    NameRus: string
}
interface BasePath {
    Id: number,
    Name:string,
    CarrierId: number
}
interface ChangeRouteDetails{
    cityStart: string,
    dateDepart: string,
    timeDepart: string,
    isChangedBus: boolean
}



export interface FullRoute {
    GuidIdentityNumber: string,
    City1: BaseCity,
    CitySourceId: number,
    CityTargetId: number,
    CitySourceUniqueId: string,
    CityTargetUniqueId: string,
    CityCodeSource: string,
    CityCodeTarget: string,
    StopNameSource: string,
    StopNameTarget: string,
    City2: BaseCity,
    Path: BasePath,
    Date: string,
    Count: number,
    FreeSeats: number[],
    RequestGetFreeSeats: string,
    DiscountListCode: null,
    TripCode: null,
    TimeOfArrival: null,
    TimeOfDeparture: null,
    SystemId: null,
    CarrierName: null,
    CarrierId: string,
    Number: string,
    RealCarrierId: number,
    Tariffs: Tariff[],
    Byn: number,
    IsChangeRoute: boolean,
    ChangeRouteDetails: ChangeRouteDetails[]
}
