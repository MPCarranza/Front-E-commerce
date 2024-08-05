import ICardProduct from "./IProducts";

interface ICategory {
    name: string;
    id: number,
    products: ICardProduct[]
}

export default ICategory;