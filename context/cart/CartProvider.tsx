import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { CartContext, cartReducer } from '.';
import { ICartProduct, IOrder, IBillingAddress, IShippingAddress } from '../../interfaces';
import { enqueueSnackbar } from 'notistack';
import { endApi } from '../../api';
import axios from 'axios';

interface Props {
    children?: React.ReactNode
}

export interface CartState {
    isSideCartOpen: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

const CART_INITIAL_STATE: CartState = {
    isSideCartOpen: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0
}

export const CartProvider:FC<Props> = ({ children }) => {

    const [ state, dispatch ] = useReducer( cartReducer, CART_INITIAL_STATE );
    
    useEffect(() => {
        try {
            const cookieProducts = Cookie.get( 'cart' )
            ? JSON.parse( Cookie.get( 'cart' )! )
            : []
            dispatch({
                type: '[Cart] - LoadCart from cookies | Storage',
                payload: cookieProducts
            });
        } catch ( error ) {
            dispatch({
                type: '[Cart] - LoadCart from cookies | Storage',
                payload: []
            });
        }
    }, [])

    useEffect(() => {
        Cookie.set( 'cart', JSON.stringify( state.cart ) );
    }, [ state.cart ]);

    useEffect(() => {
        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 );
        const subTotal = state.cart.reduce( ( prev, current ) => (current.price * current.quantity) + prev, 0 );
        const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * ( taxRate + 1 )
        }

        dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary });
    }, [ state.cart ]);

    const toggleSideCart = () => {
        dispatch({ type: '[Cart] - ToggleSideCart' });
    }
    
    
    const addProductToCart = ( product: ICartProduct ) => {

        console.log( product );

        const productInCart = state.cart.some( p => p._id === product._id );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update Products in Cart', payload: [ ...state.cart, product ] });

        const productInCartButDiferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
        if ( !productInCartButDiferentSize ) return dispatch({ type: '[Cart] - Update Products in Cart', payload: [ ...state.cart, product ] });

        const updatedProducts = state.cart.map( p => {
            if ( p._id !== product._id ) return p;
            if ( p.size !== product.size ) return p;
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update Products in Cart', payload: updatedProducts });
    }

    const updatedCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Change Cart Quantity', payload: product });
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove Product in Cart', payload: product });
        
        enqueueSnackbar( `${ product.title } was deleted to cart`, {
            autoHideDuration: 3000,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
            }
        } );
    }

    const createOrder = async (
        email: string,
        firstName: string,
        lastName: string,
        phone: string,
        billingAddress?: IBillingAddress,
        shippingAddress?: IShippingAddress
    ):Promise<{ hasErrorOrder: boolean; messageOrder: string; }> => {

        const body: IOrder = {
            orderItems: state.cart.map( p => ({
                ...p,
                size: p.size!
            }) ),
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false,
            email,
            firstName,
            lastName,
            phone,
            billingAddress,
            shippingAddress,
        }
        
        try {
            const { data } = await endApi.post( '/orders', body );
            
            return {
                hasErrorOrder: false,
                messageOrder: data._id!
            }
        } catch ( error ) {
            if ( axios.isAxiosError( error ) ){
                return {
                    hasErrorOrder: true,
                    messageOrder: error.response?.data.messageOrder
                }
            }
            return {
                hasErrorOrder: true,
                messageOrder: 'Error no controlado, hable con el Administrador.'
            }
        }

    }

    return (
        <CartContext.Provider value={{
            ...state,
            toggleSideCart,
            addProductToCart,
            updatedCartQuantity,
            removeCartProduct,
            createOrder
        }}>
            { children }
        </CartContext.Provider>
    )
}