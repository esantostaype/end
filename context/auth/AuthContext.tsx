import { createContext } from 'react';
import { IBillingAddress, IShippingAddress, IUser } from '../../interfaces';

interface ContextProps {

    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (
        email: string,
        password: string
    ) => Promise<boolean>;

    registerUser: (
        name: string,
        firstName: string,
        lastName: string,
        birthDay: string,
        phone: string,
        email: string,
        password: string,
        billinggAddress?: IBillingAddress,
        shippingAddress?: IShippingAddress
    ) => Promise<{ hasError: boolean; message?: string }>;

    logout: () => void;
    
}

export const AuthContext = createContext( {} as ContextProps );