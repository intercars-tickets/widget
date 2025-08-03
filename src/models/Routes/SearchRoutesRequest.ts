export interface SearchRouteRequest {
    "CityDeparture": number,
    "CityArrival": number,
    "DateDeparture": string,
    "Carriers":number[],
    "IsDynamic": boolean,
    "Lang": "RUS"|"ENG"
}