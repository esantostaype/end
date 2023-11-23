import { useContext } from "react"
import { CartContext } from "../../context/cart"
import styles from './OrderSummary.module.css';
import { currency } from "../../utils";

export const CartSummary = () => {

    const { cart, numberOfItems } = useContext( CartContext );

    return (
        <div className={ styles.content }>
            <div className={ styles.row }>
                <div className={ styles.col }><strong>Product</strong></div>
                <div className={ styles.col }><strong>Subtotal</strong></div>
            </div>
            {
                cart.map( ( product ) => (                    
                    <div className={ styles.row } key={ product.slug + product.size }>
                        <div className={ styles.col }>{ product.title } <span className={ styles.quantity }>x { product.quantity }</span></div>
                        <div className={ styles.col }>{ currency.format( product.price * product.quantity ) }</div>
                    </div>

                ) )
            }
        </div>
    )
}