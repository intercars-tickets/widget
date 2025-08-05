import {BookPassengerInfo} from "./BookPassengerInfo";
import {BookAnalytics} from "./BookAnalytics";

export interface BookTicketRequest {

    passengers:BookPassengerInfo[];
    phone: string,
    phoneTwo: string,
    email: string,
    currencyId: number,
    paySystem: string,
    extraBaggage: number,
    promoCode: string,
    note: string,
    siteVersionId: number,
    hasSubscription: boolean,
    analytics:BookAnalytics
    userId: string,
    routeId:string,
    searchId: string,
    lang: "RUS"|"ENG"
}

