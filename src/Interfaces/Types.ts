import ICardProduct from "./IProducts";

export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export interface ILoginProps {
  email: string;
  password: string;
}

export interface IUserSession {
  token: string;
  user: {
    address: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    role: string;
    orders: [];
  };
}

export interface IOrder {
  id: number;
  status: string;
  date: Date;
  products: ICardProduct[];
  image: string;
}

// export interface SaveToken {
//     arg: string;
// }

export type SaveToken = (arg: string) => void;
