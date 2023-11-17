import { CartState } from '.';
import { ICartProduct } from '../../interfaces';

type CartActionType = 
| { type: '[Cart] - ToggleSideCart' }
| { type: '[Cart] - LoadCart from cookies | Storage', payload: ICartProduct[] }
| { type: '[Cart] - Update Products in Cart', payload: ICartProduct[] }
| { type: '[Cart] - Change Cart Quantity', payload: ICartProduct }
| { type: '[Cart] - Remove Product in Cart', payload: ICartProduct }
| {
    type: '[Cart] - Update Order Summary',
    payload: {
        numberOfItems: number,
        subTotal: number,
        tax: number,
        total: number,
    }
}

export const cartReducer = ( state: CartState, action: CartActionType ): CartState => {
    
    switch ( action.type ) {

        case '[Cart] - ToggleSideCart':
            return {
                ...state,
                isSideCartOpen: !state.isSideCartOpen
            }

        case '[Cart] - LoadCart from cookies | Storage':
            return {
                ...state,
                cart: action.payload
            }

        case '[Cart] - Update Products in Cart':
            return {
                ...state,
                cart: [ ...action.payload ]
            }

        case '[Cart] - Change Cart Quantity':
            return {
                ...state,
                cart: state.cart.map( product => {
                    if ( product._id !== action.payload._id ) return product;
                    if ( product.size !== action.payload.size ) return product;
                    return action.payload;
                } )
            }

        case '[Cart] - Remove Product in Cart':
            return {
                ...state,
                cart: state.cart.filter( product => {
                    if ( product._id === action.payload._id && product.size === action.payload.size ) {
                        return false;
                    }
                    return true;
                } )
            }

        case '[Cart] - Update Order Summary':
            return {
                ...state,
                ...action.payload
            }
        
        default:
            return state;
    }
    
}