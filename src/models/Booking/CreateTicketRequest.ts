export interface CreateTicketRequest {
    //paySystem:"alphaBy"|"alphaRu"
    orderId: string,
    itemId: string,
    userId: string,
    lang: "RUS"|"ENG"
}