import {BookPassengerInfo} from "./BookPassengerInfo";

export interface BookingRouteRequest {
    Passengers: BookPassengerInfo[],
    Phone: string,
    PhoneTwo: string,
    Email: string,
    CurrencyId: number,
    PaySystem: string,
    ExtraBaggage: number,
    PromoCode: string,
    Note: string,
    SiteVersionId: number,
    HasSubscription: boolean,
    Analytics: {
        Url: string,
        Refferer: string,
        GoogleClientId: string
    },
    UserId: string,
    RouteId: string//"00000000-0000-0000-0000-000000000000",
    SearchId: string,
    Lang: "RUS"
}