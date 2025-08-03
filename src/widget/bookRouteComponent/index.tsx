import "./style.scss";
import {CSSProperties, useEffect, useState} from "react";
import {BusTicket} from "../busTicket";
import {CommonRoute} from "../../models/Routes/CommonRoute";
import {FullBusPlaces} from "../../testData/FullBusPlases";
import {ContactsUser} from "../contactUser";
import {InputText2} from "../../components/inputText2";
import {WidgetApi} from "../../api/WidgetApi";
import {BookPassengerInfo} from "../../models/Booking/BookPassengerInfo";
import {IntercarsPlace} from "../../models/Routes/IntercarsPlace";
import {Button} from "../../components/button";
import {SelectGender} from "../../components/selectGender";
import {DateService} from "../../services/DateService";
import {ValidateService} from "../../services/ValidateService";
import {BookTicketRequest} from "../../models/Booking/BookTicketRequest";
import {BookingRouteInfo} from "../../models/Routes/BookingRouteInfo";
import React from "react";
import {PaxItem} from "../paxItem";

interface OptionType {
    value: string;
    label: string;
}

const optionsCountry: OptionType[] = [
    {value: 'Беларусь', label: 'BY'},
    {value: 'Россия', label: 'Россия'},
    {value: 'Латвия', label: 'Латвия'},
    {value: 'Китай', label: 'Китай'},
    {value: 'Эстония', label: 'Эстония'},]

const optionsTariff: OptionType[] = [
    {value: 'DT(до 12лет)', label: 'DT(до 12лет)'},
    {value: 'ET(12-26лет)', label: 'ET(12-26лет)'},
    {value: 'PT(27-59лет)', label: 'PT(27-59лет)'},
    {value: 'ET(более 60лет)', label: 'ET(более 60лет)'}
]

const optionsTypeDocument: OptionType[] = [
    {value: 'Паспорт', label: 'Паспорт'}
]

interface Passenger {
    firstName: string;
    lastName: string;
    patronymic: string;
    dateOfBirth: string;
    passportNumber: string;
    docType: string;
}

const defaultOldPassenger: Passenger = {
    firstName: "",
    lastName: "",
    patronymic: "",
    dateOfBirth: "",
    passportNumber: "",
    docType: ""
}
type BookRouteProps = {
    routeInfo:BookingRouteInfo
    route?: CommonRoute
    searchId: string
}

const pax: BookPassengerInfo = {
    Birthdate: new Date(1986, 6, 4),
    Citizenship: "BY",
    DocumentId: "1",
    DocumentNumber: "BM250225",
    FirstName: "Сергей",
    Gender: "M",
    HasBonus: false,
    LastName: "Хинкевич",
    MiddleName: "Владимирович",
    PlaceNumber: 5,
    TarifId: 3
}

const defaultPassenger: BookPassengerInfo = {
    Birthdate: new Date(1987,6,4),
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


export function BookRouteComponent({ searchId, routeInfo}: BookRouteProps) {
    const {bookRoute, getTariffs, bookTickets} = WidgetApi();
    const {convertDateForForm, convertStringDateForForm} = DateService();
    const {validateEmail} = ValidateService();
    const [passengers, setPassengers] = useState<BookPassengerInfo[]>([defaultPassenger]);
    const [oldPassengers, setOldPassengers] = useState<Passenger[]>([defaultOldPassenger]);
    const [selectedPlaces, setSelectedPlaces] = useState<IntercarsPlace[]>([]);
    const [errors, setErrors] = useState<BookError>(defaultErrorState);
    const [phoneNumber, setPhoneNumber] = useState("+375293763552");
    const [phoneNumberTwo, setPhoneNumberTwo] = useState("");
    const [clientEmail, setClientEmail] = useState("hinkevich@gmail.com");
    const [extraBaggage, setExtraBaggage] = useState(0);
    const [currentCurrency, setCurrentCurrency] = useState("")


    console.log(routeInfo.Result.Route?.Id)
    console.log(searchId)

    const userId = 'd02ae181-c17a-42e1-97be-e791cb20dd4b';

    const validateHandler = () => {
        //validateEmail
        const isValidEmail = validateEmail(clientEmail);
        if (!isValidEmail) {
            setErrors({...errors, emailError: "Неправильный формат Email."})
        }
    }


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
        let request: BookTicketRequest = {
            analytics: {
                GoogleClientId: "",
                Refferer: "http://localhost:3000/",
                Url: "http://localhost:3000/create-tickets"
            },
            currencyId: 1,
            email: clientEmail,
            extraBaggage: extraBaggage,
            hasSubscription: true,
            lang: "RUS",
            note: "",
            passengers: passengers,
            paySystem: "alfabankby",
            phone: "+375293763552",
            phoneTwo: "",
            promoCode: "",
            routeId: routeInfo.Result.Route?.Id ?? "",
            searchId: searchId,
            siteVersionId: 1,
            userId: "IntercarsTestWidget"
        }
        let tarif = routeInfo.Result.Route.Price.find(p=>p.CurrencyName ===currentCurrency) ;

        request.passengers.forEach((passenger) => {
            passenger.TarifId = tarif?.Currency??routeInfo.Result.Route.Price[0].Currency;
        })



        const response = await bookTickets(request);

        if (response.Result.result.Response !== null) {
            window.location.href = response.Result.result.Response ;
        } else {
            console.log("cannot redirecct")
        }

        console.log('BookRouteResponse', response)
    }

    //add or remove additional passenger
    const quantityPassHandler = (action: string, index: number = 0) => {
        console.log("Add [passenger}")

        if (action === "add") {
            setOldPassengers([...oldPassengers, defaultOldPassenger]);
            setPassengers([...passengers, defaultPassenger]);
            console.log("count pax", oldPassengers.length)
        }
        if (action === "remove") {
            setOldPassengers(oldPassengers.filter((_, i) => i !== index));
        }
    }

    //update pax data
    const updatePassHandler = (value: string, type: string, index: number) => {

        console.log("PassengerHandler", value, index);

        let oldPassArray = [...oldPassengers]
        let passArray = [...passengers]

        switch (type) {
            case "lastName": {

                console.log("input last name")
                // oldPassArray[index].lastName = value;
                passArray[index].LastName = value;
                console.log("input lastNAme", value, index);
                break;
            }
            case "patronymic": {
                oldPassArray[index].patronymic = value;
                passArray[index].MiddleName = value;
                break;
            }
            case "firstName": {
                oldPassArray[index].firstName = value;
                passArray[index].FirstName = value;
                break;
            }
            case "birthDate": {

                let dateValue = convertStringDateForForm(value, oldPassArray[index].dateOfBirth)
                console.log("date from method", dateValue)

                // oldPassArray[index].dateOfBirth = convertDateForForm(value, oldPassArray[index].dateOfBirth)
                break;
            }
            case "docNumber": {
                oldPassArray[index].passportNumber = value;
                passArray[index].DocumentNumber = value;
                break;
            }

            case "citizenship": {
                oldPassArray[index].passportNumber = value;
                passArray[index].Citizenship = value;
                break;
            }
            case "docType": {
                oldPassArray[index].passportNumber = value;
                passArray[index].DocumentId = value;
                break;
            }

        }

        setPassengers(passArray);
        setOldPassengers(oldPassArray)
        console.log("After setpassengers", oldPassArray[index].dateOfBirth);
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

    const selectedSelectStyle:CSSProperties = {fontWeight: '800'};

    //console.log(sortedArrays);
    useEffect(() => {

    }, [oldPassengers]);

    return (<>
            <div className="intercars-book-route-container">
                {/*Info row*/}
                <div className="intercars-book-route-info-sub-container__wide">
                    <div typeof="main-direction">{routeInfo.Result.Route?.Route} </div>
                    <div typeof="timer"> Врем оформления заказа</div>
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
                                    paxCount={oldPassengers.length}
                                    index={index}
                                    pax={passenger}
                                    quantityPaxHandler={quantityPassHandler}
                                    passengersCitizenship={routeInfo.Result.PassengersCitizenship}
                                    updatePaxHandler={updatePassHandler}
                                    docTypes={routeInfo.Result.DocumentTypes}
                                    tariffs={optionsTariff}/>
                            )
                            // return (<>
                            //         <div className="intercars-book-route-column-sub-container"
                            //              style={{marginTop: "6px"}}>
                            //             <div className="intercars-book-route-passenger-number-item">
                            //                 <div>Пассажир №{index + 1}</div>
                            //                 {index !== 0 &&
                            //                     <div typeof="last-item" style={{cursor: "pointer"}}
                            //                          onClick={() => {
                            //                              quantityPassHandler('remove', index)
                            //                          }}
                            //                     >&#x2715;</div>}
                            //             </div>
                            //             <div className="intercars-book-route-input-sub-container">
                            //                 <div typeof="common-select">
                            //                     <select
                            //                         onChange={(e) => {
                            //                            let country =
                            //                                routeInfo.Result.PassengersCitizenship.find(c=>c.Name===e.target.value)
                            //                             updatePassHandler(country?.Abbr??"", "citizenship", index)
                            //                             console.log(e.target.value)
                            //                         }}
                            //                     >
                            //                         {routeInfo.Result.PassengersCitizenship.map((country, index) => {
                            //
                            //
                            //                             return (<option style={country.Abbr ==="BY"?selectedSelectStyle:{}}>{country.Name}</option>)
                            //                         })}
                            //                     </select>
                            //                 </div>
                            //                 <div typeof="common-select">
                            //                     <select
                            //                         onChange={(e) => {
                            //                             console.log(e.target.value)
                            //                         }}
                            //                     >
                            //                         {optionsTariff.map((country, index) => {
                            //                             return (<option>{country.value}</option>)
                            //                         })}
                            //                     </select>
                            //                 </div>
                            //                 <SelectGender gender={"male"} selectGender={(gender: "male" | "female") => {
                            //                 }}/>
                            //             </div>
                            //             <div className="intercars-book-route-input-sub-container">
                            //                 <div typeof="common-input">
                            //                     <InputText2 label="Фамилия" value={passenger.LastName}
                            //                                 setValue={(value) => {
                            //                                     updatePassHandler(value, "lastName", index)
                            //                                 }}/>
                            //                 </div>
                            //                 <div typeof="common-input">
                            //                     <InputText2 label="Имя" value={passenger.FirstName}
                            //                                 setValue={(value) => {
                            //                                     updatePassHandler(value, "firstName", index)
                            //                                 }}/>
                            //                 </div>
                            //                 <div typeof="common-input">
                            //                     <InputText2 label="Отчество" value={passenger.MiddleName}
                            //                                 setValue={(value) => {
                            //                                     updatePassHandler(value, "patronymic", index)
                            //                                 }}/>
                            //                 </div>
                            //             </div>
                            //             <div className="intercars-book-route-input-sub-container">
                            //                 <div typeof="common-input">
                            //                     <InputText2 label="Дата рождения"
                            //                                 value={(convertDateForForm(passenger.Birthdate))}
                            //                                 placeholder="ДД-MM-ГГГГ"
                            //                                 maxLength={10}
                            //                                 setValue={(value) => {
                            //                                     updatePassHandler(value, "birthDate", index)
                            //                                 }}/>
                            //                 </div>
                            //                 <div typeof="common-select">
                            //                     <select
                            //                         defaultValue={"Тип документа"}
                            //                         onChange={(e) => {
                            //                             if (e.target.value !== "Тип документа") {
                            //
                            //                                 let doc = routeInfo.Result.DocumentTypes.find(doc => doc.Name === e.target.value)
                            //                                 updatePassHandler(doc?.Id ?? "", "docType", index)
                            //                                 //console.log(e.target.value)
                            //                                 console.log(e.target.value)
                            //                             }
                            //                         }}
                            //                     >
                            //                         <option>{"Тип документа"}</option>
                            //                         {routeInfo.Result.DocumentTypes.map((doc, index) => {
                            //                             return (<option>{doc.Name}</option>)
                            //                         })}
                            //                     </select>
                            //                 </div>
                            //                 <div typeof="common-input">
                            //                     <InputText2 label="Номер документа" value={passenger.DocumentNumber}
                            //                                 setValue={(value) => {
                            //                                     updatePassHandler(value, "docNumber", index)
                            //                                 }}/>
                            //                 </div>
                            //                 {}
                            //             </div>
                            //             {(oldPassengers.length === index + 1) && <div style={{marginLeft: "auto"}}>
                            //                 <Button title="+ Add passenger "
                            //                         onClick={() => quantityPassHandler("add")}/>
                            //             </div>}
                            //         </div>
                            //     </>
                            // )
                        })
                        }

                    </div>

                    <BusTicket busPlaces={sortedArrays} countUser={oldPassengers.length}
                               handlePlaceSelection={setSelectedPlaces}/>
                    {errors.emailError && <p>{errors.emailError}</p>}
                    <ContactsUser emailError={errors.emailError}
                                  email={""}
                                  phoneNumber1={phoneNumber}
                                  phoneNumber2={phoneNumberTwo}
                                  currencies={routeInfo.Result.Route?.Price}
                                  setCurrentCurrency={setCurrentCurrency}
                                  paySystems={routeInfo.Result.PaySystems}

                                  updateContactHandler={function (): {} {
                                      throw new Error("Function not implemented.");
                                  }}/>
                    <button type="button"
                            onClick={async () => {
                                await bookHandler();
                            }}
                            style={{width: "150px", height: "56px", backgroundColor: "#0243a6", color: "white"}}>Book
                    </button>
                    <Button title="Book"/>
                </form>


            </div>

        </>
    )
}