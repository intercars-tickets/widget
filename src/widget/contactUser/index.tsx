import "./style.scss";
import React, {useEffect, useState} from "react";
import {InputText2} from "../../components/inputText2";
import {ObjPrice} from "../../models/Routes/ObjPrice";
import {PaySystem} from "../../models/Routes/PaySystem";
import {ValidateService} from "../../services/ValidateService";
import {WidgetError} from "../../models/WidgetError";


type ContactUserProps = {
    errors: WidgetError[];
    updateErrors: (errors: WidgetError[]) => void;
    email: string;
    phoneNumber1: string;
    phoneNumber2: string;
    currencies?: ObjPrice[];
    paySystems?: PaySystem[]
    updateContactHandler: (value: string, type: string) => void
}
const alfaBy: PaySystem = {
    Currencies: [1, 2], Id: "alphaBank", Name: "AlphaBank", SiteVersionId: 0

}
const alfaRu: PaySystem = {
    Currencies: [4], Id: "alphaBank", Name: "AlphaBank", SiteVersionId: 0

}

export function ContactsUser(props: ContactUserProps) {

    const {checkError} = ValidateService();

    const [currency, setCurrency] = useState(getCurrency());
    const [paySystems, setPaySystems] = useState(getPaySystems());
    const [hasEmailError, setHasEmailError] = useState(false);
    const [hasPhoneError, setHasPhoneError] = useState(false);


    function getCurrency() {

        return 1;
    }

    function getPaySystems(): PaySystem[] {
        let result = props.paySystems?.filter((item: PaySystem) => item.Name === "AlphaBank" || item.Name === "AlfaBank");

        if (currency === 4) {
            result = props.paySystems?.filter((item: PaySystem) => item.Name === "AlphaBank");
        } else {
            result = [alfaBy]
        }

        props.updateContactHandler(currency.toString(), "currency")
        props.updateContactHandler("alfabankby", "paySystem")

        return result ?? [alfaBy];
    }

    useEffect(() => {
        if (props.errors?.some(err => err.type === "email")) {
            setHasEmailError(true);
        }
        if (props.errors?.some(err => err.type === "phone")) {
            setHasPhoneError(true);
        }
    }, [props.errors]);


    return (
        <div className='intercars-contact-user-container'>
            <h2>Контактные данные</h2>
            {/*<h2 >*/}
            {/*    Контактные данныеasdf*/}
            {/*</h2>*/}
            <div className="intercars-contact-user-info">
                <p>
                    Эти данные будут использоваться для отправки информации о билетах
                </p>
            </div>

            <div className='intercars-contact-user-sub-container'>

                <div className="intercars-contact-user-item">
                        <div className="error-msg">
                            {hasEmailError
                                ? props.errors?.find(err => err.type === "email")?.message
                                : <> &nbsp;</>
                            }
                        </div>
                        <InputText2 value={props.email} label={"Email"}
                                    setValue={(value: string) => {
                                        if (hasEmailError) {
                                            props.updateErrors(props.errors.filter(err => err.type !== "email"));
                                            setHasEmailError(false);
                                        }
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
                    <div className="error-msg">
                        {hasPhoneError
                            ? props.errors?.find(err => err.type === "phone")?.message
                            : <> &nbsp;</>
                        }
                    </div>
                    <InputText2 value={props.phoneNumber1} label={"Номер телефона"}
                                setValue={(value: string) => {
                                    if (hasPhoneError) {

                                        props.updateErrors(props.errors.filter(err => err.type !== "phone"));
                                        setHasPhoneError(false);
                                    }
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
}