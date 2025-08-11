import {SelectGender} from "../../components/selectGender";
import {InputText2} from "../../components/inputText2";
import {Button} from "../../components/button";
import {Citizenship} from "../../models/Routes/Citizenship";
import {CSSProperties, useEffect, useState} from "react";
import {BookPassengerInfo} from "../../models/Booking/BookPassengerInfo";
import {DocumentType} from "../../models/Routes/DocumentType";
import {DateService} from "../../services/DateService";
import React from "react";
import {InputDate} from "../../components/inputDate";
import {Tariff} from "../../models/Routes/Tariff";
import {ValidateService} from "../../services/ValidateService";
import {WidgetError} from "../../models/WidgetError";


type PaxItemProps = {
    errors: WidgetError[];
    updateErrors: (errors: WidgetError[]) => void;
    paxCount: number,
    index: number,
    pax: BookPassengerInfo,
    quantityPaxHandler: (action: string, index: number) => void
    passengersCitizenship: Citizenship[],
    updatePaxHandler: (value: string, type: string, index: number) => void
    docTypes: DocumentType[],
    tariffs: Tariff[]
}

export function PaxItem({
                            pax,
                            index,
                            errors,
                            updateErrors,
                            paxCount,
                            quantityPaxHandler,
                            passengersCitizenship,
                            updatePaxHandler,
                            docTypes,
                            tariffs,
                        }: PaxItemProps) {
    const {convertDateForForm, convertStringDateForForm} = DateService();
    const [paxErrors, setPaxErrors] = useState<WidgetError[]>(errors?.filter(err => err.index === index));
    const [hasFirstNameErr, setHasFirstNameErr] = useState<boolean>(false);
    const [hasLastNameErr, setHasLastNameErr] = useState<boolean>(false);
    const [hasBirthDateErr, setHasBirthDateErr] = useState<boolean>(false);
    const [hasDocTypeErr, setHasDocTypeErr] = useState<boolean>(false)
    const [hasDocNumberErr, setHasDocNumberErr] = useState<boolean>(false);

    //const {checkError} = ValidateService();
    const selectedSelectStyle: CSSProperties = {fontWeight: '800'};

    useEffect(() => {
        console.log("UseEffect 1 , Errors",errors)
        if (errors?.some(err => err.index === index && err.type === "firstName")) {
            setHasFirstNameErr(true);
        }
        if (errors?.some(err => err.index === index && err.type === "lastName")) {
            setHasLastNameErr(true);
        }
        if (errors?.some(err => err.index === index && err.type === "birthDate")) {
            setHasBirthDateErr(true);
        }
        if (errors?.some(err => err.index === index && err.type === "docType")) {
            setHasDocTypeErr(true);
        }
        if (errors?.some(err => err.index === index && err.type === "docNumber")) {
            setHasDocNumberErr(true);
        }

    }, [errors]);

    return (<>
        <div className="intercars-book-route-column-sub-container"
        >
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
                    <div className="error-msg">
                        &nbsp;
                    </div>
                    <select
                        onChange={(e) => {
                            let country =
                                passengersCitizenship.find(c => c.Name === e.target.value)
                            updatePaxHandler(country?.Abbr ?? "", "citizenship", index)
                            if (paxErrors.some(err => err.type === "citizenship")) {
                                setPaxErrors(paxErrors.filter(err => err.type !== "citizenship"));
                            }
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
                    <div className="error-msg">
                        { " "
                        }
                    </div>
                    <select
                        onChange={(e) => {
                            let tariff = tariffs.findIndex(c => c.Name === e.target.value)
                            updatePaxHandler(tariff.toString(), "tariff", index)

                            if (paxErrors.some(err => err.type === "tariff")) {
                                setPaxErrors(paxErrors.filter(err => err.type !== "tariff"));
                            }
                        }}
                    >
                        {tariffs.map((t, index) => {
                            return (<option>{t.Name}</option>)
                        })}
                    </select>
                </div>
                <div typeof="common-input">
                    <div className="error-msg">&nbsp;</div>
                    <SelectGender gender={"male"} selectGender={(value: "male" | "female") => {
                        updatePaxHandler(value, "gender", index)
                    }}/>
                </div>
            </div>

            <div className="intercars-book-route-input-sub-container">
                <div typeof="common-input">
                    <div className="error-msg">
                        {hasLastNameErr
                            ? errors?.find(err => err.index === index && err.type === "lastName")?.message
                            : " asdf"
                        }
                    </div>
                    <InputText2 label="Фамилия" value={pax.LastName}
                                setValue={(value) => {
                                    updatePaxHandler(value, "lastName", index)
                                    if (hasLastNameErr) {
                                        setHasLastNameErr(false)
                                        updateErrors(errors.filter(err => err.index === index && err.type !== "lastName"));
                                    }
                                }}/>
                </div>
                <div typeof="common-input">
                    <div className="error-msg">
                        {hasFirstNameErr
                            ? errors?.find(err => err.index === index && err.type === "firstName")?.message
                            : " "
                        }
                    </div>
                    <InputText2 label="Имя" value={pax.FirstName}
                                setValue={(value) => {
                                    updatePaxHandler(value, "firstName", index)
                                    if (hasFirstNameErr) {
                                        console.log("Input firsstname to");
                                        setHasFirstNameErr(false)
                                        updateErrors(errors.filter(err => err.index === index && err.type !== "firstName"));
                                    }
                                }}/>
                </div>
                <div typeof="common-input">
                    <div className="error-msg">&nbsp;</div>
                    <InputText2 label="Отчество" value={pax.MiddleName}
                                setValue={(value) => {
                                    updatePaxHandler(value, "patronymic", index)
                                }}/>
                </div>
            </div>

            <div className="intercars-book-route-input-sub-container">
                <div typeof="common-input">
                    <div className="error-msg">
                        {hasBirthDateErr
                            ? paxErrors.find(err => err.type)?.message
                            : " "
                        }
                    </div>
                    <InputDate setDateHandler={(date: Date | undefined) => {
                        updatePaxHandler(convertDateForForm(date), "birthDate", index)
                        if (hasBirthDateErr) {
                            setHasBirthDateErr(false)
                            updateErrors(errors.filter(err => err.index === index && err.type !== "birthDate"));
                        }
                    }}/>
                </div>
                <div typeof="common-select">
                    <div className="error-msg">
                        {hasDocTypeErr
                            ? errors?.find(err => err.index === index && err.type === "docType")?.message
                            : " "
                        }
                    </div>
                    <select
                        defaultValue={"Тип документа"}
                        onChange={(e) => {
                            if (e.target.value !== "Тип документа") {
                                let doc = docTypes.find(doc => doc.Name === e.target.value)
                                updatePaxHandler(doc?.Id ?? "", "docType", index)
                                if (hasDocTypeErr) {
                                    setHasDocTypeErr(false)
                                    updateErrors(errors.filter(err => err.index === index && err.type !== "docType"));
                                }
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
                    <div className="error-msg">
                        {hasDocNumberErr
                            ? errors?.find(err => err.index === index && err.type === "docNumber")?.message
                            : " "
                        }
                    </div>
                    <InputText2 label="Номер документа" value={pax.DocumentNumber}
                                setValue={(value) => {
                                    updatePaxHandler(value, "docNumber", index)
                                    if (hasDocNumberErr) {
                                        setHasDocNumberErr(false)
                                        updateErrors(errors.filter(err => err.index === index && err.type !== "docNumber"));

                                    }
                                }}/>
                </div>
                {}
            </div>
            {(paxCount === index + 1) && <div style={{marginLeft: "auto", marginTop: "12px"}}>
                <Button title="+ Add passenger "
                        onClick={() => quantityPaxHandler("add", 0)}/>
            </div>}
        </div>

    </>)
}