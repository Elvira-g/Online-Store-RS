export interface IFilters {
    [key: string]: string[] | number[];
    years: string [];
    manufacturer: string [];
    size: string [];
    gender: string [];
    color: string [];
    price: string [];
    priceNum: number[]

}

export interface ICard {
    [key: string]: string | number | boolean;
    id: string;
    name: string;
    manufacturer: string;
    price: string;
    size: string;
    count: string;
    year: string;
    priceNum: number;
    popular: boolean;
}