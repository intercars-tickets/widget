import "./style.scss";
import React, {useEffect, useState} from "react";
//import BusDriver from "../../icons/BusDriver";
import {IntercarsPlace} from "../../models/Routes/IntercarsPlace";
import {Counter} from "../counter";
import {BusDriverIcon} from "../../icons/BusDriverIcon";

interface IBusPlace {
    Col: number,
    Floor: number,
    IsFree: boolean,
    Row: number,
    Seat: number
}

export interface IPlaces {
    places: IBusPlace[][],
    maxCol: any,
    handlePlaceSelection: (selectedPlace: any) => void,
    countUser: number,
    selectedPlaces: any[],
    handleBaggage: (baggageCount: number) => void
}


type BusTicketProps = {
    busPlaces: IntercarsPlace[][]
    handlePlaceSelection: (selectedPlace: IntercarsPlace[]) => void,
    countUser: number,

}

export function BusTicket(props: BusTicketProps) {
    const [countBaggage, setCountBaggage] = useState(0)
    const [selectedPlaces, setSelectedPlaces] = useState<IntercarsPlace[]>([])
    const [isVisibleWarning, setIsVisibleWarning] = useState(false)


    //console.log(places);
    const handleSeatClick = (place: IntercarsPlace) => {

        //remove place
        if (selectedPlaces.includes(place)) {
            let newPlaces = selectedPlaces.filter(px => px.Seat !== place.Seat)
            setSelectedPlaces(newPlaces);
            props.handlePlaceSelection(newPlaces);
        } else if (selectedPlaces.length < props.countUser) {
            //add place
            setSelectedPlaces([...selectedPlaces, place]);
            props.handlePlaceSelection([...selectedPlaces, place]);
        }else{
            setIsVisibleWarning(true)
        }


        //setSelectedPlaces([...selectedPlaces, place])
        //handlePlaceSelection(place);
    };
    const handleGetCountBaggage = (value: number) => {
        setCountBaggage(value);
    };
    useEffect(() => {
        setTimeout(()=>{
            setIsVisibleWarning(false)
        },5000)

    }, [isVisibleWarning]);

    useEffect(() => {
        // handleBaggage(countBaggage)
    }, [countBaggage])
    const floor1Array = props.busPlaces.filter(array => array.some(place => place.Floor === 1));
    const floor2Array = props.busPlaces.filter(array => array.some(place => place.Floor === 2));


    return (
        <div className='bus-ticket'>
            <h2 className='bus-ticket__title'>
                Выберите места в автобусе {isVisibleWarning ?
                <div style={{color: "red"}}>Нельзя выбрать больше мест, чем пассажиров.</div> : ""}
            </h2>
            <div className='bus-ticket__wrapper'>
                <div className='bus-ticket-info'>
                    <div className='bus-ticket-info__item'>
                        <p>Свободно</p>
                    </div>
                    <div className='bus-ticket-info__item'>
                        <p>Выбрано</p>
                    </div>
                    <div className='bus-ticket-info__item'>
                        <p>Недоступно</p>
                    </div>
                </div>
                <div className='bus-places'>
                    <div className='bus-places__wrapper'>
                        <BusDriverIcon iconSize="48px"/>
                        {/*<img width={40} height={66} src={BusDriver} className='bus-places__icon' alt=''/>*/}
                        <div className="bus-component">
                            {floor2Array.map((array, index) => {
                                const maxCol = Math.max(...array.map(place => place.Col));
                                const sortedArray = array.sort((a, b) => a.Col - b.Col);

                                return (
                                    <div className="row" key={index}>
                                        {Array.from({length: maxCol + 1}).map((_, placeIndex) => {
                                            const place = sortedArray.find(item => item.Col === placeIndex && item.Floor === 2);

                                            if (!place) {
                                                return (
                                                    <div className="seat invisible" key={placeIndex}
                                                         data-col={placeIndex}/>
                                                );
                                            }

                                            const colClass = place.Floor === 2 ? 'floor2' : 'floor1';
                                            const seatClass = place.IsFree ? 'free' : 'occupied';

                                            return (
                                                <div
                                                    className={`seat ${colClass} ${seatClass} ${selectedPlaces.includes(place) ? 'choose' : ''}`}
                                                    key={placeIndex} data-col={placeIndex}
                                                    onClick={() => handleSeatClick(place)}>
                                                    {place ? <span>{place.Seat}</span> : null}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {floor1Array.length > 0 ? (
                        <>
                            <div className='bus-places__wrapper'>
                                <BusDriverIcon iconSize="48px"/>
                                {/*<img width={40} height={66} src={BusDriver} className='bus-places__icon' alt=''/>*/}
                                <div className="bus-component">

                                    {floor1Array.map((array, index) => {
                                        const maxCol = Math.max(...array.map(place => place.Col));
                                        const sortedArray = array.sort((a, b) => a.Col - b.Col);

                                        return (
                                            <div className="row" key={index}>
                                                {Array.from({length: maxCol + 1}).map((_, placeIndex) => {
                                                    const place = sortedArray.find(item => item.Col === placeIndex && item.Floor === 1);

                                                    if (!place) {
                                                        return (
                                                            <div className="seat invisible" key={placeIndex}
                                                                 data-col={placeIndex}/>
                                                        );
                                                    }

                                                    const colClass = place.Floor === 2 ? 'floor2' : 'floor1';
                                                    const seatClass = place.IsFree ? 'free' : 'occupied';

                                                    return (
                                                        <div
                                                            className={`seat ${colClass} ${seatClass} ${selectedPlaces.includes(place) ? 'choose' : ''}`}
                                                            key={placeIndex} data-col={placeIndex}
                                                            onClick={() => handleSeatClick(place)}>
                                                            {place ? <span>{place.Seat}</span> : null}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    ) : null}

                </div>
            </div>
            <div className='bus-ticket-baggage'>
                <h3 className='bus-ticket-baggage__title'>
                    Укажите количество дополнительного багажа
                </h3>
                <Counter
                    className={'bus-ticket-counter'}
                    initialStateValue={0}
                    getCountValue={handleGetCountBaggage}/>
                <p className='bus-ticket-baggage__text'>
                    В стоимость билета входит 2 единицы багажа бесплатно объемом 90*60*25 см. и весом 20 кг каждая.
                    Негабаритный багаж и багаж более 2-ух единиц необходимо оплачивать дополнительно.
                </p>
            </div>
        </div>
    );
}

