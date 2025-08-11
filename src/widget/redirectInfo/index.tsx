import React, {useEffect} from "react";
import "./index.scss";

type RedirectInfoProps = {
    paymentUrl:string;
}


export function RedirectInfo({paymentUrl}:RedirectInfoProps) {

    console.log("paymentUrl", RedirectInfo)

    useEffect(() => {
        console.log("RedirectInfo", RedirectInfo)
        if(paymentUrl!==""){
            setTimeout(()=>{
                window.location.href = paymentUrl
            },3000)}

    }, []);
    //setTimeout(()=>{window.location.href = paymentUrl},3000)
    //setTimeout(()=>{window.location.href = paymentUrl},3000)
    return (<>
            <div className="intercars-redirect-info-container">
                <div className="intercars-redirect-info-item">Через несколько секунд Вы будете перенаправлены на страницу платежной системы Alfabank.</div>
                <div className="intercars-redirect-info-horizontal-line"></div>
                <div className="intercars-redirect-info-item">In a few seconds you will be redirected to the page of the Alfabank payment system.</div>
            </div>
        </>
    )
}