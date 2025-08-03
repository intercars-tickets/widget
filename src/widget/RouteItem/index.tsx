import "./style.scss";
import {CommonRoute} from "../../models/Routes/CommonRoute";
import {DirectionIcon} from "../../icons/DirectionIcon";
import {WifiIcon} from "../../icons/WifiIcon";
import {UsbIcon} from "../../icons/UsbIcon";
import {AirConditionerIcon} from "../../icons/AirConditionerIcon";
import {SuitCaseIcon} from "../../icons/SuitCaseIcon";
import {PointIcon} from "../../icons/PointIcon";
import {VerticalLine} from "../../icons/VerticalLine";
import React, {useState} from "react";
import {BusIcon} from "../../icons/BusIcon";


type RouteItemProps = {
    route: CommonRoute;
    bookRoute:(route: CommonRoute) => void;
}

export function RouteItem({route,bookRoute}: RouteItemProps) {

    // const {parseTimeFromDate} =DateService()
    const [showAdditional, setShowAdditional] = useState(false);

    const dateDepart = route.DepartDateTime as Date;

    const routeDuration = "Время в пути: " + route.Hour + " ч." + (route.Minuts === "0" ? "" : route.Minuts + " минут.");

    const price = route.Price[0].Ptar + " " + route.Price[0].CurrencyName;

    return (<>
            <div className="intercars-route-container">

                <div className="intercars-route-main-container">

                    {/* Date and time info*/}
                    <div className="intercars-route-data-container">
                        <div className="intercars-route-data-sub-container">
                            <div className="intercars-route-data-item">
                                <div typeof="date">{route.DateDepart}</div>
                                <div typeof="time">{route.TimeDepart}</div>
                            </div>
                            <div className="intercars-route-data-item__middle">
                                <div style={{zIndex:"100"}}>{routeDuration}</div>
                                <div><DirectionIcon/></div>
                                <div className="intercars-bus-route-icon"><BusIcon iconSize="50px"/></div>
                            </div>
                            <div className="intercars-route-data-item__last">
                                <div typeof="date">{route.DateArrive}</div>
                                <div typeof="time">{route.TimeArrive}</div>
                            </div>
                        </div>
                        {/* route info*/}
                        <div className="intercars-route-data-sub-container">
                            <div className="intercars-route-data-item">
                                <div typeof="city">{route.City1}</div>
                                <div typeof="stopping">{route.DepartName}</div>
                            </div>
                            <div className="intercars-route-data-item__middle">
                                <div>Перевозчик</div>
                                <div typeof="stopping">{route.CarrierName}</div>
                            </div>
                            <div className="intercars-route-data-item__last">
                                <div typeof="city">{route.City2}</div>
                                <div typeof="stopping">{route.ArriveName}</div>
                            </div>
                        </div>

                        {/* additional info*/}
                        <div className="intercars-route-data-item-last">
                            <div className="intercars-route-horizontal-line"></div>
                            <div className="intercars-route-data-sub-container">
                                <div className="intercars-route-data-item">
                                    <div typeof="link" onClick={()=>setShowAdditional(!showAdditional)}>Детали маршрута</div>
                                </div>
                                <div className="intercars-route-data-item__middle">
                                </div>
                                <div className="intercars-route-data-item__last">
                                    <div typeof="icons">
                                        <WifiIcon iconSize="24px"/>
                                        {route.BusOptions.some(opt => opt.Name === "IsUSB") &&
                                            <UsbIcon iconSize="24px"/>}
                                        {route.BusOptions.some(opt => opt.Name === "IsBaggage") &&
                                            <SuitCaseIcon iconSize="24px"/>}
                                        <AirConditionerIcon iconSize="24px"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="intercars-route-price-sub-container">
                        <div>{route.CarrierName}</div>
                        <div className="intercars-best-offer">
                            Лучшая цена&nbsp;&nbsp;
                        </div>
                        {route.HasBonusProgram && <div className="intercars-bonus-ticket">
                            Бонусный&nbsp;&nbsp;
                        </div>}
                        {route.IsPartnerRoute && <div className="intercars-partner-route">
                            Рейс партнера&nbsp;&nbsp;
                        </div>}

                        <div>&nbsp;</div>

                        {/*<div className="intercars-best-offer">*/}
                        {/*    Лучшая цена*/}
                        {/*</div>*/}
                        <div typeof="price">
                            {price}
                        </div>
                        <button name="select-ticket" onClick={() => {
                            bookRoute(route)
                        }}>Выбрать билет
                        </button>
                        <div>Осталось мест: {route.FreePlace}</div>
                    </div>
                </div>

                {/*Additional Info container*/}
                {showAdditional &&
                    <div className="intercars-route-additional-container">
                    {route.AllStops && route.AllStops.map((stopping, index) => {
                        return (<>
                                <div className="intercars-route-additional-info-item">
                                    <div typeof="stopping-time">{stopping.TimeArrive}</div>
                                    <div typeof="stopping-img">{(index === 0 || route.AllStops.length === (index + 1)) ?
                                        <PointIcon sizeIcon={"big"}/> : <PointIcon sizeIcon={"small"}/>} </div>
                                    <div typeof="stopping-city">{stopping.Name}</div>
                                </div>
                                <div className="intercars-route-additional-info-item">
                                    <div typeof="stopping-date">{stopping.DateArrive}</div>
                                    <div typeof="stopping-img">{route.AllStops.length !== (index + 1) ?
                                        <VerticalLine/> : ""}    </div>
                                    <div typeof="stopping-name">{stopping.Name}</div>
                                </div>
                            </>
                        )
                    })}

                    {/* info block*/}
                    {/*<div className="intercars-route-additional-info-item">*/}
                    {/*    <div typeof="stopping-time">фыв</div>*/}
                    {/*    <div typeof="stopping-img">*/}
                    {/*       </div>*/}
                    {/*    <div typeof="stopping-city"></div>*/}
                    {/*</div>*/}

                </div>}

            </div>
        </>
    )
}