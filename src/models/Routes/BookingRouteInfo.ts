import {DocumentType} from "./DocumentType";
import {Citizenship} from "./Citizenship";
import {PaymentType} from "./PaymentType";
import {PaySystem} from "./PaySystem";
import {CommonRoute} from "./CommonRoute";

export interface BookingRouteInfo {
    Result: {
        Route: CommonRoute,
        RouteDetails: null,
        DocumentTypes: DocumentType[],
        PassengersCitizenship: Citizenship[],
        PaymentTypes: PaymentType[],
        PaySystems: PaySystem[],
        MultiplePassengersBooking: boolean,
        HasPlacesSelection: boolean,
        HasPromoPermission: boolean
    },
    Error: null|string;
}