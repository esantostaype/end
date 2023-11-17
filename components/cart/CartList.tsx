import { FC, useContext } from "react"
import NextLink from 'next/link';
import Image from 'next/image'
import { ItemCounterCart } from '../../components/cart'
import { CartContext } from "../../context/cart";
import { ICartProduct } from "../../interfaces";
import styles from './CartList.module.css';
import { DeleteIcon } from "../Icons";
import { currency } from "../../utils";

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart, updatedCartQuantity, removeCartProduct, toggleSideCart } = useContext( CartContext );

    const onNewCartQuantityValue = ( product: ICartProduct, newQuantityValue: number ) => {
        product.quantity = newQuantityValue;
        updatedCartQuantity( product );
    }

    return (
        <ul className={ styles.products }>
            {
                cart.map( ( product ) => (
                    <li className={ styles.item } key={ product.slug + product.size }>                                       
                        <figure className={ styles.image }>
                            {
                                !editable &&
                                <div className={ styles.quantity }>{ product.quantity }</div>
                            }
                            <NextLink href={ `/product/${ product.slug }` } prefetch={ false } onClick={ toggleSideCart }>
                                <Image
                                    src={ `/products/${ product.image }` }
                                    alt={ product.title }
                                    loading = 'lazy'
                                    width={ 128 }
                                    height={ 128 }
                                />
                            </NextLink>
                        </figure>
                        <div className={ styles.caption }>
                            <h2 className={ styles.title }>{ product.title }</h2>
                            <div className={ styles.size }>{ product.size }</div>
                            {
                                editable &&
                                <button onClick={ () => removeCartProduct( product ) } className={ styles.remove }>
                                    <DeleteIcon height={ 16 } width={ 16 } fill="var(--error)" />
                                </button>
                            }
                            <div className={ styles.quantityPrice }>
                                {
                                    editable 
                                    ?(
                                    <ItemCounterCart
                                            currentValue={ product.quantity }
                                            maxValue={ 10 }
                                            onUpdatedQuantity={( value ) => onNewCartQuantityValue( product, value )}
                                    />):
                                    <div></div>
                                }
                                <div className={ styles.price }>{ currency.format( product.price ) }</div>
                            </div>
                        </div>
                    </li>

                ) )
            }
        </ul>
    )
}