import "./style.scss";
import React, {useState} from "react";
import {InputText2} from "../../components/inputText2";
//import {InputText} from "../../components/inputText";
import {TariffInfoRequest} from "../../models/Booking/TariffInfoRequest";
import {ObjPrice} from "../../models/Routes/ObjPrice";
import {Tariff} from "../../models/Routes/Tariff";
import {PaySystem} from "../../models/Routes/PaySystem";


type ContactUserProps = {
    email: string;
    phoneNumber1:string;
    phoneNumber2:string;
    emailError:string;
    currencies?: ObjPrice[];
    paySystems?:PaySystem[]
    updateContactHandler:(value: string, type: string)=>void
}
const alfaBy:PaySystem = {
    Currencies: [1,2], Id: "alphaBank", Name: "AlphaBank", SiteVersionId: 0

}
const alfaRu:PaySystem = {
    Currencies: [4], Id: "alphaBank", Name: "AlphaBank", SiteVersionId: 0

}

export function ContactsUser(props: ContactUserProps) {
    const [errors, setErrors,] = useState<{ [key: string]: string }>({});
    const [currency,setCurrency] = useState(getCurrency());
    const [paySystems, setPaySystems] = useState(getPaySystems());

    //for test
    console.log(props.currencies);
    console.log("PaymentSystems",props.paySystems);

    function getCurrency(){
        //ToDo update for other Payment system

        return 1;
    }



    function getPaySystems() :PaySystem[] {
        let result = props.paySystems?.filter((item:PaySystem) => item.Name==="AlphaBank" || item.Name==="AlfaBank");

        if(currency===4){
            result = props.paySystems?.filter((item:PaySystem) => item.Name==="AlphaBank");
        }else{
            result = [alfaBy]
        }

        props.updateContactHandler(currency.toString(),"currency")
        props.updateContactHandler("alfabankby","paySystem")

        return result??[alfaBy];
    }

    return (
        <div className='intercars-contact-user-container'>
            <h1>Контактные данные</h1>
            {/*<h2 >*/}
            {/*    Контактные данныеasdf*/}
            {/*</h2>*/}
            <p className='contacts-user__subtitle'>
                Эти данные будут использоваться для отправки информации о билетах
            </p>
            <div className='intercars-contact-user-sub-container'>

                <div className="intercars-contact-user-item">
                    <InputText2 value={props.email} label={"Email"}
                                setValue={(value: string) => {
                                    props.updateContactHandler(value, "email")
                                }

                                }/>
                    {/*{props.emailError && <p style={{color: "red"}}>pr</p>}*/}
                    <div className="intercars-contact-user-select">
                        <select
                            onChange={(e) => {
                                props.updateContactHandler(e.target.value, '');
                            }}
                        >
                            {props.currencies?.map((tariff, index) => {
                                return (<option>{tariff.CurrencyName}</option>)
                            })}
                        </select>
                    </div>
                    <div className="intercars-contact-user-select">
                        <select
                            onChange={(e) => {
                                props.updateContactHandler(e.target.value, '');
                            }}
                        >
                            {/* ToDo add other system */}
                            {/*{props.paySystems?.map((paySystem, index) => {*/}
                            {/*    return (<option>{paySystem.Name}</option>)*/}
                            {/*})}*/}
                            {paySystems.map((paySystem, index) => {
                                return (<option>{paySystem.Name}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className="intercars-contact-user-item">
                    <InputText2 value={props.phoneNumber1} label={"Номер телефона"}
                                setValue={(value: string) => {
                                    props.updateContactHandler(value, "phone")
                                }}
                    />
                    <InputText2 value={props.phoneNumber2} label={"дополнительный номер телефона"}
                                setValue={(value: string) => {
                                    props.updateContactHandler(value, "phone2")
                                }}
                    />
                </div>

            </div>

            <div className='contacts-user-form__check'>
                <input type='checkbox'/>
                {/*<input*/}
                {/*    type='checkbox'*/}
                {/*    /!*{...register('contacts.termsAccepted')}*!/*/}
                {/*/>*/}
                <label>Хочу получать информацию о скидках и акционных предложениях</label>
            </div>
        </div>
    );
};