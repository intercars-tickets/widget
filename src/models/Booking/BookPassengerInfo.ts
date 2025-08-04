export interface BookPassengerInfo {
    FirstName: string,
    LastName: string,
    MiddleName: string,
    Citizenship: string,
    Birthdate: Date|null,
    Gender: "M"|"F",
    DocumentId: string,
    DocumentNumber: string,
    HasBonus: boolean,
    TarifId: number,
    PlaceNumber: number
}