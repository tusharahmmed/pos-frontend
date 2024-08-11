import {USER_ROLE} from "@/constants/role";

export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
  statusCode: number;
  message: string;
};
export type IResponseSuccessUnwrap = ResponseSuccessType;

export type IResponseSuccess = {
  data: ResponseSuccessType;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface ICategory {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
}
export interface IBrand {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export interface IProduct {
  id: string;
  title: string;
  image: string;
  price: string;
  quantity: number;
  category_id: string;
  brand_id: string;
  store_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICartProduct extends IProduct {
  count: number;
}

export interface IUser {
  id: string;
  name: string;
  serName: string;
  phone: string;
  email: string;
  profileImage?: string;
  role: USER_ROLE;
  // permissions: USER_PERMISSION[];
  address: string;
  createdAt: string;
  updatedAt: string;
}

export type IQuote = {
  id: string;
  name: string;
  serName: string;
  phone: string;
  email: string;
  pickupZip: string;
  deliveryZip: string;
  totalPices: number;
  totalWeight: number;
  question: string;
  // status: STATUS;
  createdAt: string;
  updatedAt: string;
};
