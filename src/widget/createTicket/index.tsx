import React, {Component, useEffect, useState} from "react";
import {WidgetApi} from "../../api/WidgetApi";
import "./style.scss";
import {CreateTicketRequest} from "../../models/Booking/CreateTicketRequest";
import {IntercarsPlace} from "../../models/Routes/IntercarsPlace";


enum CreateTicketStatus {
    None = "none",
    Creating = 0,
    Success,
}


type CreateTicketProps = {
    itemNumber: string;
    setActiveSection: (activeSection: string) => void;
}

export function CreateTicket(props: CreateTicketProps) {

    const [isLoading, setIsLoading] = useState(true);
    const [requestIsRunning, setIsRunning] = useState(false);
    const [componentStatus, setComponentStatus] = useState<CreateTicketStatus>(CreateTicketStatus.Creating);
    const {createTickets} = WidgetApi();


    const queryParams = new URLSearchParams(window.location.search);
    const orderId = queryParams.get("orderId") ?? "";

    const createTicketHandler = async () => {
        let request: CreateTicketRequest = {
            orderId: orderId,
            lang: "RUS",
            userId: "IntercarsTestWidget",
            itemId: ""
        }
        if (request.orderId !== undefined && request.userId !== undefined) {
            const response = await createTickets(request)
            console.log("Create ticvket response", response.Result);
            setComponentStatus(CreateTicketStatus.Success);
        }
    }
    // if(props.itemNumber!==undefined){
    //     const result = createTickets({
    //     const result = createTickets({
    //
    //     })
    // }
    const getCurrentStatus = ()=>{
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get("orderId") !== undefined) {
            setComponentStatus(CreateTicketStatus.Creating)
        }





    }



    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        console.log(queryParams.get("orderId"));


    }, [componentStatus]);


    useEffect(() => {
        if (!requestIsRunning) {
            console.log("startRequest create Ticket")
            createTicketHandler()
            setIsRunning(true)
        }


    }, [isLoading]);

    return (
        <>
            <div className="intercars-create-ticket-container">

                {componentStatus === CreateTicketStatus.None && (<>
                        <div className="intercars-create-ticket-sub-container"></div>
                        <div className="intercars-create-ticket-border"></div>
                        <div className="intercars-create-ticket-sub-container intercars-advertisment-block">
                            htrkfvf

                        </div>
                    </>

                )
                }
                {componentStatus === CreateTicketStatus.Creating && (<>
                    <div className="intercars-create-ticket-sub-container">
                        <div> Регистрация билетов в системе ...</div>
                        <div>item number:{props.itemNumber}</div>
                        <div>Loading</div>
                        <div>Скачать билет</div>
                        <div>Отправить на почту</div>
                        <button onClick={() => {
                            window.location.replace("http://localhost:3000/whitelabel/example")
                        }}>New Search
                        </button>
                    </div>
                    <div className="intercars-create-ticket-border"></div>
                    <div className="intercars-create-ticket-sub-container intercars-advertisment-block">
                        htrkfvf

                    </div>

                </>)}
                {componentStatus === CreateTicketStatus.Success && (<div className="intercars-create-ticket-item">
                    <div className="intercars-create-ticket-sub-container">
                        <div className="header">Спасибо за покупку на нашем сайте!</div>
                        <div><p>&nbsp;&nbsp;В ближайшее время вы получите письмо с билетом на электронную почту, распечатайте его и приходите на посадку.</p></div>
                        <div><p>&nbsp;&nbsp;Если Вы не получили письмо, свяжитесь с нами по телефонам +37529 643 70 22, +37529 872 37 55, 8017 395 45 91</p></div>
                        <div></div>
                        <div>&nbsp;&nbsp;Подписывайтесь на наши социальные сети и получите доступ к максимальным скидкам:</div>
                        <button onClick={() => {
                            window.location.replace("http://localhost:3000/whitelabel/example")
                        }}>Neww Search
                        </button>
                    </div>
                    <div className="intercars-create-ticket-border"></div>
                    <div className="intercars-create-ticket-sub-container intercars-advertisment-block">
                        <div className="header">Спасибо за покупку на нашем сайте!</div>
                        <div></div>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        {/* ToDo find link on picture*/}
                        {/*<img src={require("../../img/moscov-img.png")} alt="picture"></img>*/}
                        <img src={""} alt="picture"></img>

                    </div>

                </div>)}
            </div>
        </>
    );
}


