import { useContext } from "react";
import NextLink from 'next/link';
import { ShopLayout } from "../../layouts"
import { CartContext } from "../../context";
import { CartList, OrderSummary } from '../../components';
import { BagIcon } from "../../components/Icons";

export const CartPage = () => {

    const { cart } = useContext( CartContext );
    
    return (
        <ShopLayout title={ 'Cart | END.'} pageDescription={ 'Encuentra los mejores productos aquí'} size="medium">
            { cart.length > 0 ? (
                <>
                <h1>Cart</h1>
                <div className="cart-page">
                    <div className="cart-page__products-list">
                        <CartList editable={ true }/>
                    </div>
                    <div className='cart-page__summary'>
                        <h3 className='cart-page__title'>Order</h3>
                        <OrderSummary/>
                        <NextLink href="/checkout" className='main-button'>Checkout</NextLink>
                    </div>
                </div>
                </>
                ) : (
                    <div className='cart-page__empty'>
                        <div className="cart-page__empty__content">
                            <div className='cart-page__empty__icon'>
                                <BagIcon height={ 128 } width={ 128 } fill="var(--lightgray2)" />
                            </div>
                            <h3 className='cart-page__empty__title'>You have no items in your cart</h3>
                            <NextLink href="/men" className='link'>View Latest</NextLink>
                        </div>
                    </div>
            )}
		</ShopLayout>
    )
}

export default CartPage