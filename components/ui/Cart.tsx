import { useContext } from "react"
import { CartContext } from "../../context";
import styles from './Cart.module.css';
import { BagIcon } from "../Icons";

export const Cart = () => {

    const { toggleSideCart, numberOfItems } = useContext( CartContext );

    return (
        <button className={ styles.button } onClick={ toggleSideCart }>
            <BagIcon height={ 24 } width={ 24 } />
            { numberOfItems > 0
                ? <span className={ styles.counter }>{ numberOfItems > 9 ? '+9' : numberOfItems }</span>
                : ''
            }
        </button>
    )
}