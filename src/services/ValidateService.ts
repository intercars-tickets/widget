import {BookTicketRequest} from "../models/Booking/BookTicketRequest";
import {WidgetError} from "../models/WidgetError";
import {BookPassengerInfo} from "../models/Booking/BookPassengerInfo";

export function ValidateService() {

    const minNameLength = 2;


    const validateEmail = (email: string) => {

        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validateName = (name: string) => {
        return name.length >= minNameLength;
    }

    const validatePaxes = (paxes: BookPassengerInfo[]): WidgetError[] => {
        let errors: WidgetError[] = []

        paxes.forEach((p, i) => {
            if (p.FirstName === "" || p.FirstName === undefined) {
                let msg = "Имя не заполнено";
                errors.push({
                    index: i, message: msg, type: "firstName"
                })
            }

            if (p.LastName === "" || p.LastName === undefined) {
                let msg = "Фамилия не заполнена";
                errors.push({
                    index: i, message: msg, type: "lastName"
                })
            }
            if (p.Citizenship === "" || p.Citizenship === undefined) {
                let msg = "Выберите гражданство";
                errors.push({
                    index: i, message: msg, type: "citizenship"
                })
            }

            if (p.Birthdate === undefined || p.Birthdate === null) {
                let msg = "Данные не заполнены";
                errors.push({
                    index: i, message: msg, type: "birthdate"
                })
            }

            if (p.DocumentId === "" || p.DocumentId === undefined) {
                let msg = "Выберите документ";
                errors.push({
                    index: i, message: msg, type: "docType"
                })
            }

            if (p.DocumentNumber === "" || p.DocumentNumber === undefined) {
                let msg = "Заполните № документа";
                errors.push({
                    index: i, message: msg, type: "documentNumber"
                })
            }

            if (p.TarifId === 0) {
                let msg = "Выберите тариф";
                errors.push({
                    index: i, message: msg, type: "tariffId"
                })
            }

        })

        return errors;
    }

    const validateBookRequest = (request: BookTicketRequest): WidgetError[] => {
        let errors: WidgetError[] = []

        //Email
        if (request.email === "" || request.email === undefined) {
            errors.push({
                message: "Вы не указали Email.", type: "email", index: -1
            });
        } else {
            let isValidEmail = validateEmail(request.email);
            if (!isValidEmail) {
                errors.push({message: "Введенный емайл не соответствует синтаксису.", type: "email", index: -1});
            }
        }

        //phoneNumber
        if (request.phone === "" || request.email === undefined) {
            errors.push({
                message: "Вы не указали номер телефона.", type: "phone", index: -1
            });
        }
        //let paxErrors =validatePaxes(request.passengers)
        errors.push(...validatePaxes(request.passengers))

        return errors;
    }

    function checkError(errors: WidgetError[], type: string, index: number = -1): boolean {

        if (errors === undefined || errors === null || errors.length === 0) {
            return false
        }
        if (type === "email") {
            return errors.some(err=>err.type==="email")
        }
        if (type === "phone") {
            return errors.some(err=>err.type==="phone")
        }
        if (type === "firstName") {
            return errors.some(err=>err.type==="firstName" && err.index ===index)
        }
        if (type === "lastName") {
            return errors.some(err=>err.type==="lastName" && err.index ===index)
        }
        if (type === "citizenship") {
            return errors.some(err=>err.type==="citizenship" && err.index ===index)
        }
        if (type === "birthdate") {
            return errors.some(err=>err.type==="birthdate" && err.index ===index)
        }
        if (type === "documentId") {
            return errors.some(err=>err.type==="documentId" && err.index ===index)
        }
        if (type === "documentNumber") {
            return errors.some(err=>err.type==="documentNumber" && err.index ===index)
        }
        if (type === "tariffId") {
            return errors.some(err=>err.type==="tariffId" && err.index ===index)
        }

        return false;
    };

    return {validateEmail, validateBookRequest, checkError};
}