import {SelectGender} from "../../components/selectGender";
import {InputText2} from "../../components/inputText2";
import {Button} from "../../components/button";
import {Citizenship} from "../../models/Routes/Citizenship";
import {CSSProperties} from "react";
import {BookPassengerInfo} from "../../models/Booking/BookPassengerInfo";
import {DocumentType} from "../../models/Routes/DocumentType";
import {DateService} from "../../services/DateService";
import React from "react";
import {InputDate} from "../../components/inputDate";
import {Tariff} from "../../models/Routes/Tariff";


type PaxItemProps = {
    paxCount: number,
    index: number,
    pax: BookPassengerInfo,
    quantityPaxHandler: (action: string,  index: number) => void
    passengersCitizenship: Citizenship[],
    updatePaxHandler: (value: string, type: string, index: number) => void
    docTypes: DocumentType[],
    tariffs:  Tariff[]
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
                            //console.log(e.target.value)
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
                            let tariff = tariffs.findIndex(c => c.Name === e.target.value)
                            updatePaxHandler(tariff.toString(), "tariff", index)
                        }}
                    >
                        {tariffs.map((t, index) => {
                            return (<option>{t.Name}</option>)
                        })}
                    </select>
                </div>
                <SelectGender gender={"male"} selectGender={(value: "male" | "female") => {

                    updatePaxHandler(value, "gender", index)

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
                    <InputDate setDateHandler={(date: Date | undefined) => {
                        updatePaxHandler(convertDateForForm(date), "birthDate", index)
                    }}/>
                </div>
                <div typeof="common-select">
                    <select
                        defaultValue={"Тип документа"}
                        onChange={(e) => {
                            if (e.target.value !== "Тип документа") {
                                let doc = docTypes.find(doc => doc.Name === e.target.value)
                                updatePaxHandler(doc?.Id ?? "", "docType", index)
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
                        onClick={() => quantityPaxHandler("add", 0)}/>
            </div>}
        </div>
    </>)
}