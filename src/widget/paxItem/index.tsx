import {SelectGender} from "../../components/selectGender";
import {InputText2} from "../../components/inputText2";
import {Button} from "../../components/button";
import {Citizenship} from "../../models/Routes/Citizenship";
import {CSSProperties} from "react";
import {BookPassengerInfo} from "../../models/Booking/BookPassengerInfo";
import {DocumentType} from "../../models/Routes/DocumentType";
import {DateService} from "../../services/DateService";
import React from "react";

interface OptionType {
    value: string;
    label: string;
}


type PaxItemProps = {
    paxCount: number,
    index: number,
    pax: BookPassengerInfo,
    quantityPaxHandler: (action: string,  index: number) => void
    passengersCitizenship: Citizenship[],
    updatePaxHandler: (value: string, type: string, index: number) => void
    docTypes: DocumentType[],
    tariffs: OptionType[]
}

export function PaxItem({

                            pax,
                            index,
                            paxCount,
                            quantityPaxHandler,
                            passengersCitizenship,
                            updatePaxHandler,
                            docTypes,
                            tariffs,
                        }: PaxItemProps) {
    const {convertDateForForm, convertStringDateForForm} = DateService();

    const selectedSelectStyle: CSSProperties = {fontWeight: '800'};


    return (<>
        <div className="intercars-book-route-column-sub-container"
             style={{marginTop: "6px"}}>
            <div className="intercars-book-route-passenger-number-item">
                <div>Пассажир №{index + 1}</div>
                {index !== 0 &&
                    <div typeof="last-item" style={{cursor: "pointer"}}
                         onClick={() => {
                             quantityPaxHandler('remove', index)
                         }}
                    >&#x2715;</div>}
            </div>
            <div className="intercars-book-route-input-sub-container">
                <div typeof="common-select">
                    <select
                        onChange={(e) => {
                            let country =
                                passengersCitizenship.find(c => c.Name === e.target.value)
                            updatePaxHandler(country?.Abbr ?? "", "citizenship", index)
                            console.log(e.target.value)
                        }}
                    >
                        {passengersCitizenship.map((country, index) => {


                            return (<option
                                style={country.Abbr === "BY" ? selectedSelectStyle : {}}>{country.Name}</option>)
                        })}
                    </select>
                </div>
                <div typeof="common-select">
                    <select
                        onChange={(e) => {
                            console.log(e.target.value)
                        }}
                    >
                        {tariffs.map((country, index) => {
                            return (<option>{country.value}</option>)
                        })}
                    </select>
                </div>
                <SelectGender gender={"male"} selectGender={(gender: "male" | "female") => {
                }}/>
            </div>
            <div className="intercars-book-route-input-sub-container">
                <div typeof="common-input">
                    <InputText2 label="Фамилия" value={pax.LastName}
                                setValue={(value) => {
                                    updatePaxHandler(value, "lastName", index)
                                }}/>
                </div>
                <div typeof="common-input">
                    <InputText2 label="Имя" value={pax.FirstName}
                                setValue={(value) => {
                                    updatePaxHandler(value, "firstName", index)
                                }}/>
                </div>
                <div typeof="common-input">
                    <InputText2 label="Отчество" value={pax.MiddleName}
                                setValue={(value) => {
                                    updatePaxHandler(value, "patronymic", index)
                                }}/>
                </div>
            </div>
            <div className="intercars-book-route-input-sub-container">
                <div typeof="common-input">
                    <InputText2 label="Дата рождения"
                                value={(convertDateForForm(pax.Birthdate))}
                                placeholder="ДД-MM-ГГГГ"
                                maxLength={10}
                                setValue={(value) => {
                                    updatePaxHandler(value, "birthDate", index)
                                }}/>
                </div>
                <div typeof="common-select">
                    <select
                        defaultValue={"Тип документа"}
                        onChange={(e) => {
                            if (e.target.value !== "Тип документа") {

                                let doc = docTypes.find(doc => doc.Name === e.target.value)
                                updatePaxHandler(doc?.Id ?? "", "docType", index)
                                //console.log(e.target.value)
                                console.log(e.target.value)
                            }
                        }}
                    >
                        <option>{"Тип документа"}</option>
                        {docTypes.map((doc, index) => {
                            return (<option>{doc.Name}</option>)
                        })}
                    </select>
                </div>
                <div typeof="common-input">
                    <InputText2 label="Номер документа" value={pax.DocumentNumber}
                                setValue={(value) => {
                                    updatePaxHandler(value, "docNumber", index)
                                }}/>
                </div>
                {}
            </div>
            {(paxCount === index + 1) && <div style={{marginLeft: "auto"}}>
                <Button title="+ Add passenger "
                        onClick={() => quantityPaxHandler("add",0)}/>
            </div>}
        </div>

    </>)
}