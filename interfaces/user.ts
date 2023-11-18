export interface IUser {
    _id?: string;
    name: string;
    firstName: string;
    lastName: string;
    birthDay?: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    billingAddress?: IBillingAddress;
    shippingAddress?: IShippingAddress;
    createdAt?: string;
    updatedAt?: string;
}

export interface IBillingAddress {
    country: string;
    address: string;
    address2?: string;
    city: string;
    zipCode: string;
}

export interface IShippingAddress {
    country: string;
    address: string;
    address2?: string;
    city: string;
    zipCode: string;
}