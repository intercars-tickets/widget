import React, {useEffect, useState} from "react";
import "./style.scss";
import {DateService} from "../../services/DateService";


type InputDateProps = {
    inputDate?: string
    setDateHandler: (date: Date | undefined) => void;
    dateLabel?: string;
}

//get and return date in ISO string format
export function InputDate({inputDate, dateLabel, setDateHandler}: InputDateProps) {

    const {convertDateForForm} = DateService()
    const [textDate, setTextDate] = useState("");
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [showError, setShowError] = useState(false);

    const parseDateHandler = (inputDate: string) => {

        if (inputDate.length === 8) {
            const date = inputDate.substring(0, 2);
            const month = inputDate.substring(2, 4);
            const year = inputDate.substring(4, 8);
            let newDate = new Date(Number(year), Number(month) - 1, Number(date))
            setDateHandler(newDate);
        } else {
            alert('Неправильный формат даты');
        }
    }

    const regDateDefault = new RegExp("[0-9]{8}");
    const regDatePicker = new RegExp("[0-9]{2}(\\W)[0-9]{2}(\\W)[0-9]{4}");

    const setDateByKeyInput = (value: string) => {
        setTextDate(value);

        if (
            value.length === 8 && regDateDefault.test(value)
        ) {
            //// console.log("Date 8", value);
            const date = value.substring(0, 2);
            const month = value.substring(2, 4);
            const year = value.substring(4, 8);
            const newDate = new Date(Number(year), Number(month) - 1, Number(date));
            setDate(newDate);
            setTextDate(convertDateForForm(newDate));
            setDateHandler(newDate);
        }
        if (value.length === 10 && regDatePicker.test(value)) {
            const dateArr = value.split("-");
            const date = dateArr[0];
            const month = dateArr[1];
            const year = dateArr[2];
            const newDate = new Date(Number(year), Number(month) - 1, Number(date));
            setDate(newDate);
            setTextDate(convertDateForForm(newDate));
            setDateHandler(newDate);
        }
        if (value.length > 8) {
            setDate(undefined);
            setShowError(true);
        }
    }

    //The  date is presented in a DatePicker Format {YYYY-MM-DD}
    const setDateByDatePicker = (date: string) => {
        const regDate = new RegExp("[0-9]{4}(\\W)[0-9]{2}(\\W)[0-9]{2}");

        if (regDate.test(date)) {
            const dateArr = date.split('-');
            const newDate = new Date(Number(dateArr[0]), Number(dateArr[1]), Number(dateArr[2]));
            // setInputTextDate(newDate.toDateString());
            setDateHandler(newDate);
            //new
            setDate(new Date());
            setTextDate(convertDateForForm(newDate));
        }
    }

    const clearDate = () => {
        setDateHandler(undefined);
        setDate(undefined);
        setTextDate("")
    }
    useEffect(() => {

    }, [inputDate]);

    return (
        <div className='input-date-component-container'>

            <label>Дата рождения</label>
            {dateLabel && <label
            >  {dateLabel}&nbsp;&nbsp;050
            </label>}

            <div className="input-date-element">
                <input type="text"
                       typeof="input-text-date"
                       style={{border: "none"}}
                       placeholder={"ДДММГГГГ"}
                       value={textDate}
                       onChange={(e) => {
                           setDateByKeyInput(e.target.value)
                       }}
                       onKeyDown={(e) => {
                           if (e.key === "Enter") {
                               parseDateHandler(textDate)
                           }
                       }}
                />
                {date === undefined ? <input
                    type="date"
                    typeof="input-date-picker"
                    placeholder=""
                    style={{width: "18px", border: "none"}}
                    value={undefined}
                    onChange={(e) => {
                        setDateByDatePicker(e.target.value);
                    }}
                /> : <>
                    <div
                        style={{cursor: "pointer"}}
                        typeof="close-img"
                        onClick={() => {
                            clearDate();
                        }}>&#x2715;</div>
                    <input
                        type="date"
                        typeof="input-date-picker"
                        placeholder=""
                        style={{width: "18px", border: "none"}}
                        value={undefined}
                        onChange={(e) => {
                            setDateByDatePicker(e.target.value);
                        }}
                    />
                </>}

            </div>
        </div>
    )
}