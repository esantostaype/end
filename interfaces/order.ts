import { IBillingAddress, IShippingAddress, ISize, IUser } from "./";

export interface IOrder {
    _id?: string;
    user?: IUser | String;
    orderItems: IOrderItem[];
    email: String;
    firstName?: String;
    lastName?: String;
    phone?: String;
    billingAddress?: IBillingAddress;
    shippingAddress?: IShippingAddress;
    paymentResult?: string;
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    isPaid: boolean;
    paidAt?: string;
    createdAt?: string;
    orderId?: string | undefined;
    transactionId?: string
}

export interface IOrderItem {
    _id: string;
    title: string;
    size: ISize;
    quantity: number;
    slug: string;
    image: string;
    price: number;
    gender: string;
}