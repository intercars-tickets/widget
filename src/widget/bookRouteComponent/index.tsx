import "./style.scss";
import {CSSProperties, useEffect, useState} from "react";
import {BusTicket} from "../busTicket";
import {CommonRoute} from "../../models/Routes/CommonRoute";
import {FullBusPlaces} from "../../testData/FullBusPlases";
import {ContactsUser} from "../contactUser";
import {WidgetApi} from "../../api/WidgetApi";
import {BookPassengerInfo} from "../../models/Booking/BookPassengerInfo";
import {IntercarsPlace} from "../../models/Routes/IntercarsPlace";
import {Button} from "../../components/button";
import {DateService} from "../../services/DateService";
import {ValidateService} from "../../services/ValidateService";
import {BookTicketRequest} from "../../models/Booking/BookTicketRequest";
import {BookingRouteInfo} from "../../models/Routes/BookingRouteInfo";
import React from "react";
import {PaxItem} from "../paxItem";
import {WidgetSections} from "../../models/enums/WidgetSections";
import {WidgetError} from "../../models/WidgetError";
import Timer from "../../components/timer/Timer";

interface Passenger {
    firstName: string;
    lastName: string;
    patronymic: string;
    dateOfBirth: string;
    passportNumber: string;
    docType: string;
}


type BookRouteProps = {
    routeInfo: BookingRouteInfo
    route?: CommonRoute
    searchId: string
    setActiveSection: (section: WidgetSections ) => void
    setPaymentUrl: (url: string) => void
}

const defaultPassenger: BookPassengerInfo = {
    Birthdate: new Date(1987, 6, 4),
    Citizenship: "",
    DocumentId: "",
    DocumentNumber: "",
    FirstName: "",
    Gender: "M",
    HasBonus: false,
    LastName: "",
    MiddleName: "",
    PlaceNumber: 0,
    TarifId: 0
}

type BookError = {
    emailError: string;
    phoneNumberError: string;
    phoneNumber1: string;
}
const defaultErrorState: BookError = {
    emailError: "Invalid email", phoneNumber1: "", phoneNumberError: ""
}

type Currency = {
    currencyCode: string;
    currencyName: string;
    currencyId: number;
}


export function BookRouteComponent({searchId, routeInfo}: BookRouteProps) {
    const {bookRoute, getTariffs, bookTickets} = WidgetApi();
    const {convertDateForForm, convertStringDateForForm} = DateService();
    const {validateEmail,validateBookRequest} = ValidateService();
    const [passengers, setPassengers] = useState<BookPassengerInfo[]>([defaultPassenger]);
    const [selectedPlaces, setSelectedPlaces] = useState<IntercarsPlace[]>([]);
    //const [errors, setErrors] = useState<BookError>(defaultErrorState);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberTwo, setPhoneNumberTwo] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [extraBaggage, setExtraBaggage] = useState(0);
    const [currentCurrency, setCurrentCurrency] = useState<number>(0)
    const [paysystem,setPaySystem] = useState<string>("alfabankby");
    const [hasSubscription, setHasSubscription] = useState<boolean>(false);
    const [errors, setErrors] = useState<WidgetError[]>([]);

    const {convertToDateFromForm}=DateService();
    //console.log(routeInfo.Result.Route?.Id)
    //console.log(searchId)

    const userId = 'd02ae181-c17a-42e1-97be-e791cb20dd4b';

    const mapPassengers = (passengers: Passenger) => {
    }

    const checkData = () => {
        console.log(routeInfo.Result.Route?.Price)
        console.log("Route:", routeInfo.Result.Route)
    };
    checkData();


    function getCurrencies(route?: CommonRoute) {

        if (route === undefined) {
            return [{
                currencyCode: "BYN",
                currencyName: "BYN",
                currencyId: 1
            }]
        }

        let currencies: Array<Currency> = route.Price.map(p =>
            ({
                currencyCode: p.CurrencyName,
                currencyName: p.CurrencyName,
                currencyId: p.Currency
            }));
        return (currencies);
    }
    //bookTickets
    const bookHandler = async () => {
        setErrors([]);

        let request: BookTicketRequest = {
            analytics: {
                GoogleClientId: "",
                Refferer: "http://localhost:3000/",
                Url: "http://localhost:3000/create-tickets"
            },
            currencyId: currentCurrency,
            email: clientEmail,
            extraBaggage: extraBaggage,
            hasSubscription: hasSubscription,
            lang: "RUS",
            note: "",
            passengers: passengers,
            paySystem:paysystem,
            //paySystem: "alfabankby",
            phone: phoneNumber,
            phoneTwo: phoneNumber,
            promoCode: "",
            routeId: routeInfo.Result.Route?.Id ?? "",
            searchId: searchId,
            siteVersionId: 1,
            userId: "IntercarsTestWidget"
        }
        let tarif = routeInfo.Result.Route.Price.find(p => p.Currency === currentCurrency);

        request.passengers.forEach((passenger) => {
            passenger.TarifId = tarif?.Currency ?? routeInfo.Result.Route.Price[0].Currency;
        })

        let validateErrors = validateBookRequest(request);

        if (validateErrors!==undefined && validateErrors?.length > 0) {
            setErrors(validateErrors);
            console.log("validateErrors", validateErrors);
            return;
        }


        const response = await bookTickets(request);

        if (response.Result.result.Response !== null) {
            window.location.href = response.Result.result.Response;
        } else {
            // console.log("cannot redirecct")
        }

        // console.log('BookRouteResponse', response)
    }

    //add or remove additional passenger
    const quantityPassHandler = (action: string, index: number = 0) => {
        //console.log("Add [passenger}")

        if (action === "add") {
            //setOldPassengers([...oldPassengers, defaultOldPassenger]);
            setPassengers([...passengers, defaultPassenger]);
            //console.log("count pax", oldPassengers.length)
        }
        if (action === "remove") {
            //setOldPassengers(oldPassengers.filter((_, i) => i !== index));
            setPassengers(passengers.filter((_, i) => i !== index));
        }
    }

    //update pax data
    const updatePassHandler = (value: string, type: string, index: number) => {

        //console.log("PassengerHandler", value,type, index);

        let passArray = [...passengers]

        switch (type) {
            case "lastName": {
                passArray[index].LastName = value;
                break;
            }
            case "patronymic": {
                passArray[index].MiddleName = value;
                break;
            }
            case "firstName": {
                passArray[index].FirstName = value;
                break;
            }
            case "birthDate": {
                let dateValue = convertToDateFromForm(value)
                if (dateValue !== undefined) {
                    passengers[index].Birthdate = dateValue;
                }
                break;
            }
            case "docNumber": {
                passArray[index].DocumentNumber = value;
                break;
            }

            case "citizenship": {
                passArray[index].Citizenship = value;
                break;
            }
            case "docType": {
                passArray[index].DocumentId = value;
                break;
            }
            case "tariff": {
                passArray[index].TarifId = Number(value);
                break;
            }
            case "gender": {
                passArray[index].Gender = value==="male"?"M":"F";
                break;
            }

        }
        setPassengers(passArray);
    }

    const updateContactInfo = (value: string, type: string) => {
        switch (type) {
            case "phone":{
                setPhoneNumber(value);
                break;
            }

            case "phone2":{
                setPhoneNumberTwo(value);
                break;
            }
            case "email":{
                setClientEmail(value);
                break;
            }
            case "currency":{
                setCurrentCurrency(Number(value));
                break;
            }
            case "paySystem":{
                setPaySystem(value)
                break;
            }
        }

    }

    let places = FullBusPlaces;

    function compare(a: { Row: number; Col: number; }, b: { Row: number; Col: number; }) {
        if (a.Row < b.Row) {
            return -1;
        }
        if (a.Row > b.Row) {
            return 1;
        }
        if (a.Col < b.Col) {
            return -1;
        }
        if (a.Col > b.Col) {
            return 1;
        }
        return 0;
    }

    places.sort(compare);

    const sortedArrays: IntercarsPlace[][] = [];
    let currentRow = FullBusPlaces[0].Row;
    let currentArray: IntercarsPlace[] = [];

    places.forEach(place => {
        if (place.Row !== currentRow) {
            sortedArrays.push(currentArray);
            currentArray = [];
            currentRow = place.Row;
        }
        currentArray.push(place);
    });

    sortedArrays.push(currentArray);

    sortedArrays.forEach(array => {
        array.sort((a, b) => a.Floor - b.Floor);
    });

    //console.log(sortedArrays);
    const maxCol = Math.max(...FullBusPlaces.map(place => place.Col));

    const selectedSelectStyle: CSSProperties = {fontWeight: '800'};

    //console.log(sortedArrays);
    useEffect(() => {

    }, [passengers]);

    return (<>
            <div className="intercars-book-route-container">
                {/*Info row*/}
                <div className="intercars-book-route-info-sub-container__wide">
                    <div typeof="main-direction">{routeInfo.Result.Route?.Route} </div>
                    {/*<div typeof="timer"> Врем оформления заказа </div>*/}
                    <Timer isTicketPage={true}/>
                </div>
                {/*Departure, arrive Info row*/}
                <div className="intercars-book-route-info-sub-container__wide">
                    <div className="intercars-book-route-column-item">
                        <div typeof="title"> Отправление:</div>
                        <div typeof="time"> {routeInfo.Result.Route?.DateDepart1}</div>
                        <div typeof="station"> {routeInfo.Result.Route?.DepartName}</div>
                    </div>
                    <div className="intercars-book-route-column-item">
                        <div typeof="title"> Прибытие</div>
                        <div typeof="time">{routeInfo.Result.Route?.DateArrive1}</div>
                        <div typeof="station">{routeInfo.Result.Route?.ArriveName}</div>
                    </div>
                    <div className="intercars-book-route-column-item">
                        <div typeof="title"> Стоимость</div>
                        <div typeof="price">{routeInfo.Result.Route?.Price[0].Ptar} </div>
                        <div typeof="price-info"> за 1 билет</div>
                    </div>
                </div>

                {/*Passengers data*/}
                <form className="intercars-order-form" autoComplete="off" style={{gap: "6px"}}>

                    <div style={{gap: "6px"}}>
                        {passengers && passengers.map((passenger, index) => {
                            return (<PaxItem
                                    errors={errors}
                                    updateErrors={setErrors}
                                    paxCount={passengers.length}
                                    index={index}
                                    pax={passenger}
                                    quantityPaxHandler={quantityPassHandler}
                                    passengersCitizenship={routeInfo.Result.PassengersCitizenship}
                                    updatePaxHandler={updatePassHandler}
                                    docTypes={routeInfo.Result.DocumentTypes}
                                    tariffs={routeInfo.Result.Route.Routes[0].Tariffs}/>
                            )
                        })
                        }

                    </div>
                    <BusTicket busPlaces={sortedArrays} countUser={passengers.length}
                               handlePlaceSelection={setSelectedPlaces}/>
                    {/*{errors.emailError && <p>{errors.emailError}</p>}*/}
                    <ContactsUser errors={errors}
                                  updateErrors={setErrors}
                                  email={""}
                                  phoneNumber1={phoneNumber}
                                  phoneNumber2={phoneNumberTwo}
                                  currencies={routeInfo.Result.Route?.Price}
                                  paySystems={routeInfo.Result.PaySystems}
                                  updateContactHandler={updateContactInfo} />
                    <button type="button"
                            onClick={async () => {
                                await bookHandler();
                            }}
                            style={{width: "150px", height: "56px", backgroundColor: "#0243a6", color: "white"}}>Book
                    </button>
                    <Button title="Book" onClick={()=>{
                        console.log("PaxDate",passengers[0]);
                        console.log("CurrentCurrency",currentCurrency);
                        console.log("PhoneNumber",phoneNumber);
                        console.log("email",clientEmail)
                        console.log("emcurrencyl",currentCurrency)
                    }}/>
                </form>
            </div>
        </>
    )
}