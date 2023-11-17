import { createContext } from 'react';
import { IBillingAddress, ICartProduct, IShippingAddress } from '../../interfaces';

interface ContextProps {
    isSideCartOpen: boolean;
    toggleSideCart: () => void;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    addProductToCart: ( product: ICartProduct ) => void;
    updatedCartQuantity: ( product: ICartProduct ) => void;
    removeCartProduct: ( product: ICartProduct ) => void;

    createOrder: (
        email: string,
        firstName: string,
        lastName: string,
        phone: string,
        billinggAddress?: IBillingAddress,
        shippingAddress?: IShippingAddress
    ) => Promise<{ hasErrorOrder: boolean; messageOrder: string; }>;
}

export const CartContext = createContext( {} as ContextProps );