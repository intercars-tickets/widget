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
    setCurrentCurrency:(currency:string)=>void
    updateContactHandler:()=>{}
}
export function ContactsUser(props: ContactUserProps) {
    //const { register, watch, formState: { errors } } = useFormContext();

    const [email, setEmail] = useState(props.email);
    const [mainPhone, setMainPhone] = useState(props.phoneNumber1);
    const [otherPhone,setOtherPhone] = useState(props.phoneNumber2);
    const [errors, setErrors,] = useState<{ [key: string]: string }>({});

    console.log(props.currencies);


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
                    <InputText2 value={email} label={"Email"} setValue={setEmail}/>
                    {/*{props.emailError && <p style={{color: "red"}}>pr</p>}*/}
                    <div className="intercars-contact-user-select">
                        <select
                            onChange={(e) => {
                               props.setCurrentCurrency(e.target.value);
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
                                props.setCurrentCurrency(e.target.value)
                            }}
                        >
                            {props.paySystems?.map((paySystem, index) => {
                                return (<option>{paySystem.Name}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className="intercars-contact-user-item">
                    <InputText2 value={mainPhone} label={"Номер телефона"} setValue={setMainPhone}/>
                    <InputText2 value={otherPhone} label={"дополнительный номер телефона"} setValue={setOtherPhone}/>
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