import { useContext, useEffect  } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cart';
import styles from './SideCart.module.css';
import { CartList, OrderSummary } from './';
import { BagIcon } from '../Icons';

export const SideCart = () => {

    const router = useRouter();

    const { isSideCartOpen, toggleSideCart, cart } = useContext( CartContext );

    useEffect(() => {
        const handleEscapeKey = ( event: { key: string; } ) => {
            if ( event.key === 'Escape' && isSideCartOpen ) {
                toggleSideCart();
            }
        };
        window.addEventListener('keydown', handleEscapeKey);
        return () => {
            window.removeEventListener( 'keydown', handleEscapeKey );
        };
    }, [isSideCartOpen, toggleSideCart]);

    const wrapperClassName = isSideCartOpen ? `${ styles.wrapper } ${ styles.isOpen }` : styles.wrapper;

    const navigateTo = ( url: string ) => {
        toggleSideCart();
        router.push(url);
    }

    return (
        <div className={ wrapperClassName }>
            <div className={ styles.bg} onClick={ toggleSideCart }></div>
            <div className={ styles.content}>
                <div className={ styles.header }>
                    <h3 className={ styles.title}>Your Cart</h3>
                </div>
                { cart.length > 0 ? (
                    <>
                        <div className={ styles.list }>
                            <CartList editable={ true } sideCart={ true } />
                        </div>
                        <div className={ styles.summary }>
                            <OrderSummary />
                            <button onClick={ () => navigateTo('/cart') } className={`${ styles.viewCart } ghost-button`}>View Cart</button>
                            <button onClick={ () => navigateTo('/checkout') } className='main-button'>Checkout</button>
                        </div>
                    </>
                    ) : (
                    <div className={ styles.cartEmpty }>
                        <div className={ styles.cartEmptyIcon }>
                            <BagIcon height={ 72 } width={ 72 } fill="var(--lightgray2)" />
                        </div>
                        <h3 className={ styles.cartEmptyTitle }>You have no items in your cart</h3>
                        <NextLink href="/men" className='link'>View Latest</NextLink>
                    </div>
                )}
            </div>
        </div>
    );
};
