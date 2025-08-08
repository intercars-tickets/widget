import React from "react";
import {BookingRouteInfo} from "../../models/Routes/BookingRouteInfo";
import {CommonRoute} from "../../models/Routes/CommonRoute";
import {WidgetSections} from "../../models/enums/WidgetSections";


type RedirectInfoProps = {
    paymentUrl:string;
}


export function RedirectInfo({paymentUrl}:RedirectInfoProps) {

    console.log("paymentUrl", RedirectInfo)

   setTimeout(()=>{window.location.href = paymentUrl},3000)
    return (<>
        <div>Через несколько секунд Вы будете перенаправлены на страницу платежной системы Alfabank.</div>
        <div>In a few seconds you will be redirected to the page of the Alfabank payment system.</div>
        </>
    )
}