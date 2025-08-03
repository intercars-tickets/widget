export interface BookTicketResponse {
    Error:string|null
    Result:{
        PaymentUrl:string|null
        ExternalUrl:string|null
        result:{
            Error:string|null
            ErrorType:number
            Response:string|null
            Success:boolean
            Url:string|null
        }
    }
}