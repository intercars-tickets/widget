import "./style.scss";
import {ArrowFormIcon} from "../../icons/ArrowFormIcon";
import {useEffect, useState} from "react";
import {WidgetApi} from "../../api/WidgetApi";
import {City} from "../../models/Routes/City";
import {DateService} from "../../services/DateService";
import {SearchRouteRequest} from "../../models/Routes/SearchRoutesRequest";
import React from "react";

const minskCity: City = {
    Coordinates: {Latitude: "", Longitude: ""}, Id: 1, Name: "Минск"
}
const moscowCity: City = {
    Coordinates: {Latitude: "", Longitude: ""}, Id: 3, Name: "Москва"
}

type SearchComponentProps = {
    departureDate: Date;
    setDepartureDate: (date: Date) => void;
    runSearch: (request: SearchRouteRequest) => void;
    isSearching: boolean;
    setError: (error: { [key: string]: string }) => void;

}

export function SearchComponent(props: SearchComponentProps) {

    //services
    const {searchCity,getCities} = WidgetApi();
    const {dateToDatePickerFormat} = DateService();

    //hooks
    const [cityNameFrom, setCityNameFrom] = useState("");
    const [cityNameTo, setCityNameTo] = useState("");
    const [cityFrom, setCityFrom] = useState<City>();
    const [cityTo, setCityTo] = useState<City>();

    const [departureDate, setDepartureDate] = useState(dateToDatePickerFormat(props.departureDate));
    const [isSearching, setIsSearching] = useState(props.isSearching);
    const [showCitiesFrom, setShowCitiesFrom] = useState(false);
    const [showCitiesTo, setShowCitiesTo] = useState(false);
    const [citiesFromArr, setCityFromArr] = useState<City[]>([]);
    const [citiesToArr, setCityToArr] = useState<City[]>([]);
    const [errors, setErrors] = useState("");


    const selectCityHandler = async (city: City, point: "from" | "to") => {

        if (point === "from") {
            console.log("SelectCityHandler");
            setCityNameFrom(city.Name);
            setShowCitiesFrom(false);
            setCityFrom(city);
            console.log("CityFrom", cityFrom);
        } else {
            setCityNameTo(city.Name);
            setShowCitiesTo(false);
            setCityTo(city);
        }

    }

    const clearErrorHandler = (errorType: string) => {
        if (errorType === "all") {
            let err: { [key: string]: string } = {
                "cityFromError": "",
                "cityToError": "",
                "dateFromError":""
            };
            props.setError(err)
        }
    }

    const runSearchHandler = async () => {

        let err: { [key: string]: string } = {};

        if (cityFrom === undefined) {
            err = {...err, "cityFromError": "Выберите город отправления."}
        }
        if (cityTo === undefined) {
            err = {...err, "cityToError": "Выберите город прибытия."}
        }
        if (departureDate !== undefined) {
            props.setError(err)
            err = {...err, "dateFromError": "Выберите город прибытия."}
            //return;
        } else {
            props.setError(err)
        }

        setIsSearching(true);

        // // Todo add validation for city and date
        //  if (cityFrom === undefined || cityTo === undefined) {
        //      console.log("cityFrom", cityFrom)
        //      console.log("cityTo", cityTo)
        //      setIsSearching(false);
        //
        //      return;
        //  }

        let request: SearchRouteRequest = {
            DateDeparture: departureDate,
            CityDeparture: cityFrom?.Id ?? 0,
            CityArrival: cityTo?.Id ?? 0,
            IsDynamic: false,
            Carriers: [],
            Lang: "RUS"
        }
        console.log("run search searchComponet", cityTo)
        console.log("run search searchComponet", departureDate)

        setIsSearching(true);
        await  props.runSearch(request);
        setIsSearching(false);
    }

    const inputCityHandler = async (partCityName: string, point: "from" | "to") => {
        console.log("inputCityHandler part cityName", partCityName);

        let cities = point === "from" ? citiesFromArr : citiesToArr;
        point === "from" ? setCityNameFrom(partCityName) : setCityNameTo(partCityName);
        let setCities = point === "from" ? setCityFromArr : setCityToArr;
        let setShowPopup = point === "from" ? setShowCitiesFrom : setShowCitiesTo;
        let localStorageName = point === "from" ? "citiesFromIC" : "citiesToIC";

        if (partCityName.length >= 2 && cities.length === 0) {

            const response = await searchCity({
                Lang: "RUS", Name: partCityName, isExactly: false
            })

            setCities(response.Result)
            sessionStorage.setItem(localStorageName, JSON.stringify(response.Result))
            setShowPopup(true)
        } else if (partCityName.length >= 2 && cities.length > 0) {
            const json = sessionStorage.getItem(localStorageName) ?? "";
            const savedCities: City[] = json.length > 0 ? JSON.parse(json) : [];
            setCities(savedCities.filter(city => city.Name.includes(partCityName)));

        } else if (partCityName.length === 1 && cities.length > 0) {
            console.log("clear data")
            setCities([])
            sessionStorage.setItem(localStorageName, '')
            setShowPopup(false)
        } else {
            setShowPopup(false)
        }
    }
    useEffect(() => {
        setIsSearching(props.isSearching);
        console.log("useEffect")
    }, [cityFrom]);

    return (<>

        <div className="search-component-wrapper">
            <div className="search-component-container">
                {/*Input city from*/}
                <div className="search-component-sub-container">
                    <div className="label-item">Откуда</div>

                    <input className="input-item" value={cityNameFrom}
                           onBlur={() => setShowCitiesFrom(false)}
                           onFocus={() => setShowCitiesFrom(true)}
                           onChange={async (e) => {
                               await inputCityHandler(e.target.value, "from")
                           }}/>

                    <div className="example-item">
                        <div>Например</div>
                        <div onClick={() => {
                            setCityNameFrom("Москва")
                            setCityFrom(moscowCity)
                        }}>Москва
                        </div>
                        <div onClick={() => {
                            setCityNameFrom("Минск")
                            setCityFrom(minskCity)
                        }}>Минск
                        </div>
                    </div>
                    <div className="search-component-icon-sub-container"><ArrowFormIcon/></div>
                    {showCitiesFrom && citiesFromArr.length > 0 &&
                        <div className="search-component-popUpSubContainer">
                            <ul onSelect={() => {
                                console.log("Ul eevent")
                            }}>
                                {citiesFromArr.map(city => {
                                    return (
                                        <li
                                            onMouseDown={async () => {
                                                console.log("clik by city", city)
                                                await selectCityHandler(city, "from")
                                            }}>{city.Name}</li>)
                                })}
                            </ul>
                        </div>}
                </div>

                {/*Input city To*/}
                {/*<div className="search-component-icon-sub-container"><ArrowFormIcon/></div>*/}
                <div className="search-component-sub-container">
                    <div className="label-item">Куда:</div>
                    <input className="input-item" name="midle" type="text" value={cityNameTo}
                           onBlur={() => setShowCitiesTo(false)}
                           onFocus={() => setShowCitiesTo(true)}
                        //onChange={(e) => setCityFrom(e.target.value)}
                           onChange={async (e) => {
                               await inputCityHandler(e.target.value, "to")
                           }}
                    />
                    {showCitiesTo && citiesToArr.length > 0 &&
                        <div className="search-component-popUpSubContainer">
                            <ul>
                                {citiesToArr.map((city, index) => {
                                    return (<li
                                        key={'sity-from-' + city.Name + '-' + index}
                                        onSelect={(e) => {
                                            console.log("select")
                                        }}
                                        onMouseDown={() => {
                                            console.log("select" + city.Name)
                                            selectCityHandler(city, "to")
                                        }}>{city.Name}</li>)
                                })}
                            </ul>
                        </div>}
                    {/*<input className="input-item" name="midle" placeholder={"City to"}/>*/}

                    {/*<InputText value="Минск" setValue={() => {                }}/>*/}
                    <div className="example-item">
                        <div>Например</div>
                        <div onClick={() => {
                            setCityNameTo("Москва");
                            setCityTo(moscowCity);
                        }}>Москва
                        </div>
                        <div onClick={() => {
                            setCityNameTo("Минск");
                            setCityTo(minskCity)
                        }}>Минск
                        </div>
                    </div>
                </div>

                {/*Input departure Date*/}
                <div className="search-component-sub-container">
                    <div className="label-item">Когда</div>
                    <input className="input-item" name="last" type="date" value={departureDate}
                           onChange={(e) => setDepartureDate(e.target.value)}

                    />
                    {/*<InputText value="Минск" setValue={() => {                }}/>*/}
                    <div className="example-item">
                        <div>Например</div>
                        <div typeof="link"
                             onClick={() => setDepartureDate(dateToDatePickerFormat(new Date()))}>Сегодня
                        </div>
                        <div typeof="link" onClick={() => {
                            let date = new Date();
                            date.setDate(date.getDate() + 1);
                            setDepartureDate(dateToDatePickerFormat(date));
                        }}
                        >Завтра
                        </div>
                    </div>
                </div>

                <div className="search-component-button-sub-container">
                    {!isSearching ?
                        <button className="search-button" type="button" onClick={() => runSearchHandler()}>Найти
                            билеты</button> :
                        <div className="loader"></div>}
                </div>
            </div>
        </div>
    </>);
}