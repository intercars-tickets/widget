import {ObjPrice} from "./ObjPrice";

export interface TariffPrice{
    CurrencyName: string,
    CurrencyId: number,
    Value: number,
    ServiceTax: number,
    BasePrice: number
}

export interface Tariff {
    Name: string,
    ShortName: string,
    Value: number,
    Selected: boolean,
    PercentSales: number,
    Prices: TariffPrice[
    ],
    IdString: string
}