//import {axiosInstance} from "./AxiosInstance";
import {
    MAIN_API_HOSTNAME,
    MAIN_API_HOSTNAME_LOCAL,
    ROUTE_AUTH_REGISTER
} from "../constants/routeConstants/ApiRouteConstants";
import {SearchRouteRequest} from "../models/Routes/SearchRoutesRequest";
import {SearchCityRequest} from "../models/Routes/SearchCityRequest";
import {ApiResponse} from "../models/ApiResponse";
import {City} from "../models/Routes/City";
import {SearchRouteResponse} from "../models/Routes/SearchRoutesResponse";
import {BookingRouteRequest} from "../models/Booking/BookRouteRequest";
import {TariffInfoRequest} from "../models/Booking/TariffInfoRequest";
import {Tariff} from "../models/Routes/Tariff";
import {BookTicketRequest} from "../models/Booking/BookTicketRequest";
import {BookTicketResponse} from "../models/Booking/BookTicketResponse";
import {GetRouteRequest} from "../models/Routes/GetRouteRequest";
import { BookingRouteInfo } from "../models/Routes/BookingRouteInfo";
import {CreateTicketRequest} from "../models/Booking/CreateTicketRequest";

export function WidgetApi() {
    const env = 'development'

    /**
     * POST method for searchCities
     * @param {RegisterUserRequest} request - request data
     * @return {Promise<AxiosResponse<any>>} response with user info
     */
    const searchCity = async (request: SearchCityRequest): Promise<ApiResponse<City>> => {


        let env = 'staging'



       let result : ApiResponse<City>;
        const response =await fetch(getHost() + "/api/v1/cities/find", {
            //mode: "no-cors",
            method: "POST",
            headers: {
                //Accept:"application/json",
                //"Accept-Encoding": "gzip, deflate, br, zstd",
                //"Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                // Authorization: "Basic KzM3NTI5Mzc2MzU1MjpRV0VSVFkxMjM="
            },
            body: JSON.stringify(request)

        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResult = await response.json();

        console.log("Js",<ApiResponse<City>>jsonResult);

        result = JSON.parse(JSON.stringify(jsonResult,null,2));


        return  result;

    }

    const getCities = async (): Promise<ApiResponse<City>> => {

        let result : ApiResponse<City>;
        console.log("run Searsh")
        const response = await fetch("https://api.intercars.ru/api/v1/cities/get", {
            //mode: "no-cors",
            method: "POST",
            headers: {
                //Accept:"application/json",
                //"Accept-Encoding": "gzip, deflate, br, zstd",
                //"Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                // Authorization: "Basic KzM3NTI5Mzc2MzU1MjpRV0VSVFkxMjM="
            },
            body: JSON.stringify({
                "Page": 1,
                "Count": 2,
                "Lang": "RUS"
            })

        })

        console.log("Return",response);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResult = await response.json();

        console.log("Js",<ApiResponse<City>>jsonResult);

        result = JSON.parse(JSON.stringify(jsonResult,null,2));


        return  result;

    }


    /**
     * POST method for signup
     * @param {RegisterUserRequest} request - request data
     * @return {Promise<AxiosResponse<any>>} response with user info
     */
    const searchRoutes = async (request: SearchRouteRequest): Promise<SearchRouteResponse> => {

        let result :SearchRouteResponse;

        const response = await fetch(getHost() + "/api/v1/routes/search", {
            //mode: "no-cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Basic KzM3NTI5Mzc2MzU1MjpRV0VSVFkxMjM="
            },
            body: JSON.stringify(request)
        })

        if (!response.ok) {
            return {Error: "Error",
                Result: undefined
            }

           // throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonResult = await response.json();
        console.log("Js RoutesApi",jsonResult);
        result = JSON.parse(JSON.stringify(jsonResult,null,2));
        return  result;
    }

    /**
     * POST method for signup
     * @param {RegisterUserRequest} request - request data
     * @return {Promise<AxiosResponse<any>>} response with user info
     */
    const getRouteInfo = async (request: GetRouteRequest): Promise<BookingRouteInfo> => {

        let result: BookingRouteInfo;

        const response = await fetch(getHost() + "/api/v1/routes/getRoute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Basic KzM3NTI5Mzc2MzU1MjpRV0VSVFkxMjM="
            },
            body: JSON.stringify(request)
        })
        console.log("GetRouteInfo -response", response)
        const jsonResult = await response.json();

        result = JSON.parse(JSON.stringify(jsonResult, null, 2));
        console.log("GetRouteInfo result", result)
        return result;

    }

    const getTariffs = async (request: TariffInfoRequest): Promise<ApiResponse<Tariff>> => {

        const response = await fetch(getHost() + "/api/v1/routes/getTariffs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Basic KzM3NTI5Mzc2MzU1MjpRV0VSVFkxMjM="
            },
            body: JSON.stringify(request)


        })
        console.log("WidgetApi",response)
        const jsonResult = await response.json();
        return jsonResult;
    }

    const bookRoute = async (request: BookingRouteRequest): Promise<ApiResponse<any>> => {

        let result :any;
        const response =await fetch(getHost() + "/api/v1/tickets/booking", {
            //mode: "no-cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)

        })
        console.log("Widget api response book", response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResult = await response.json();

        console.log("Js RoutesApi",jsonResult);

        result = JSON.parse(JSON.stringify(jsonResult,null,2));

        return  result;
    }


    const createTickets = async (request: CreateTicketRequest) => {


        const response = await fetch("https://localhost:44363" + "/api/v1/tickets/widget/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)

        })
        console.log("Widget api response create", response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResult = await response.json();

        console.log("CreateTickets", jsonResult);

        let result = JSON.parse(JSON.stringify(jsonResult, null, 2));
        console.log("WidgetApi", result);
        let obj: BookTicketResponse = JSON.parse(JSON.stringify(result, null, 2));
        console.log("WidgetApi, response as obj", obj);
        //Todo check Result

        return obj;
    }

    // const searchCityAxios = async (request: SearchCityRequest) => {
    //     const response = await axiosInstance.post<ApiResponse<City>>(ROUTE_AUTH_REGISTER, request);
    //     console.log(response.data);
    //     return response.data;
    // };

    const bookTickets = async (request:BookTicketRequest) => {


        const response = await fetch(getHost() + "/api/v1/tickets/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)

        })
        console.log("Widget api response book", response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResult = await response.json();

        console.log("Js RoutesApi",jsonResult);

        let result = JSON.parse(JSON.stringify(jsonResult,null,2));
        console.log("WidgetApi",result);
        let obj:BookTicketResponse= JSON.parse(JSON.stringify(result,null,2));
        console.log("WidgetApi, response as obj",obj);
        //Todo check Result

        return  obj;
    }


    function getHost() {
        if(env==="development"){
            return "https://localhost:44363";
        }
        if(env==="staging"){
            return "https://testapi.intercars.ru"
        }else{
            return "https://localhost:44363";}
    }
    //


   // const bookTickets = async (request:BookTicketRequest);


return {searchRoutes, searchCity, bookRoute,getTariffs, bookTickets, getCities,getRouteInfo,createTickets};
}