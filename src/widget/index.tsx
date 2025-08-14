import "./style.scss";
import {SearchComponent} from "./searchComponent";
import {use, useEffect, useState} from "react";
import {RouteItem} from "./RouteItem";
import {WidgetApi} from "../api/WidgetApi";
import {City} from "../models/Routes/City";
import {CommonRoute} from "../models/Routes/CommonRoute";
import {SearchRouteRequest} from "../models/Routes/SearchRoutesRequest";
import {BookRouteComponent} from "./bookRouteComponent";
import {Button} from "../components/button";
import {BusIcon} from "../icons/BusIcon";

import React from "react";
import "./style.scss";
import {BookingRouteInfo} from "../models/Routes/BookingRouteInfo";
import {GetRouteRequest} from "../models/Routes/GetRouteRequest";
import {CreateTicket} from "./createTicket";
import {RedirectInfo} from "./redirectInfo";
import {WidgetSections} from "../models/enums/WidgetSections";

// enum WidgetSections {
//     Search = 0,
//     Book = 1 << 0,//0001
//     CreateTicket,
//     RedirectInfo = 3
//     // Book
//
// }

type WidgetErrors = {
    cityFromError: string;
    cityToError: string;
    dateFromError: string;
}

export function Widget() {
    const [activeSection, setActiveSection] = useState<WidgetSections>(WidgetSections.Search);
    const [departureDate, setDepartureDate] = useState<Date>(new Date());
    const [searchRouteId, setSearchRouteId] = useState("");
    const [foundRoutes, setFoundRoutes] = useState<CommonRoute[]>([]);
    const [activeRoute, setActiveRoute] = useState<BookingRouteInfo>();
    const [paymentUrl, setPaymentUrl] = useState("");

    const [isSearching, setIsSearching] = useState(false);
    const [errors, setErrors] = useState<WidgetErrors>({dateFromError: "", cityFromError: "", cityToError: ""});

    const [itemNumber, setItemNumber] = useState("");
    const [lang, setLang] = useState("");
    const {searchRoutes, getRouteInfo} = WidgetApi();

    let urlParams = new URLSearchParams(document.location.search);

    console.log("Urk parsms", urlParams);
    console.log(urlParams.get("itemNumber"));

    const userId = 'd02ae181-c17a-42e1-97be-e791cb20dd4b';

    const selectRouteHandler = async (route: CommonRoute) => {

        let request: GetRouteRequest = {
            Lang: "RUS",
            RouteId: route.Id,
            SearchId: searchRouteId,
        }

        let response = await getRouteInfo(request)

        if (response.Error === null) {

            setActiveRoute(response)
            setActiveSection(WidgetSections.Book);

        } else {
            console.log(response.Error)
        }


        //ToDo getRoute? details and tariffs
        // setActiveRoute(route)
        //setActiveSection(WidgetSections.Book);
    }

    const updateErrorHandler = (error: { [key: string]: string }) => {
        // let keys = Object.keys(error)
        //let newErrors = {...errors, ...error};
        setErrors({...errors, ...error});
    }

    const searchRoutesHandler = async (request: SearchRouteRequest) => {


        const response = await searchRoutes(request)
        console.log("Search route Response ExamplePage", response)

        //ToDo show Message
        if(response.Result === undefined) {

            console.log("SearchRouteHandler",response.Error)
            setIsSearching(false);
            return;
        }

        setIsSearching(false);
        setSearchRouteId(response.Result!.Id);

        let routes = new Array<CommonRoute>();
        response.Result!.CarrierRoutes.forEach(route => {
            routes.push(...route.Routes)
        })
        setFoundRoutes(routes);
        sessionStorage.setItem("commonRoutesIC", JSON.stringify(routes));
    }
    useEffect(() => {
        //console.log("departure dATE iSO", departureDate);
    }, [errors]);

    //get url
    useEffect(() => {

        if (urlParams.get("itemNumber") !== null) {
            setActiveSection(WidgetSections.CreateTicket);
            setItemNumber(urlParams.get("itemNumber") ?? "");
        }

    }, [activeSection]);
    useEffect(()=>{

    }, [activeSection])



    return (
        <div className="intercars-widget-container">

            {activeSection === WidgetSections.Search && <p>Search </p>}
            {activeSection === WidgetSections.Search &&
                <SearchComponent
                    //cityFrom={cityFrom}
                    //cityTo={cityTo}
                    isSearching={isSearching}
                    // setCityTo={setCityTo}
                    runSearch={searchRoutesHandler}
                    //setCityFrom={setCityFrom}
                    departureDate={departureDate} setDepartureDate={setDepartureDate}
                    setError={updateErrorHandler}/>}

            {activeSection === WidgetSections.Search && foundRoutes && foundRoutes.length > 0 && foundRoutes.map(route => {
                return (<RouteItem route={route} bookRoute={selectRouteHandler}/>)
            })}


            {activeSection === WidgetSections.Book && activeRoute !== undefined &&
                <BookRouteComponent searchId={searchRouteId} routeInfo={activeRoute} setActiveSection={setActiveSection} setPaymentUrl={setPaymentUrl}/>}

            {activeSection === WidgetSections.RedirectInfo && <RedirectInfo paymentUrl={paymentUrl}/>}

            {activeSection === WidgetSections.CreateTicket &&
                <CreateTicket itemNumber={urlParams.get("itemNumber") ?? ""} setActiveSection={() => {
                }}/>}
            {/*<div style={{paddingTop:"16px"}}><RouteItem/></div>*/}

            {/*<button onClick={searchRoutesHandler}>Search</button>*/}
        </div>


    )


}