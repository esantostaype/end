import { FC, useContext } from "react"
import { CartContext } from "../../context/cart"
import { currency } from "../../utils";
import { IOrder } from "../../interfaces";
import styles from './OrderSummary.module.css';

interface Props {
    order?: IOrder;
}

export const OrderSummary: FC<Props> = ({ order }) => {

    const { numberOfItems, subTotal, tax, total } = useContext( CartContext );

    return (
        <div className={ styles.content }>
            {/* <div className={ styles.row }>
                <div className={ styles.col }>N° Products</div>
                <div className={ styles.col }>{ numberOfItems } { numberOfItems > 1 ? 'products' : 'product' }</div>
            </div> */}
            <div className={ styles.row }>
                <div className={ styles.col }><strong>Subtotal</strong></div>
                <div className={ styles.col }>{ order ? currency.format( order.subTotal ) : currency.format( subTotal ) }</div>
            </div>
            <div className={ styles.row }>
                <div className={ styles.col }><strong>Taxes ({ Number( process.env.NEXT_PUBLIC_TAX_RATE ) * 100}%)</strong></div>
                <div className={ styles.col }>{ order ? currency.format( order.tax ) : currency.format( tax ) }</div>
            </div>
            <div className={ `${ styles.row } ${ styles.total }` }>
                <div className={ styles.col }>Total</div>
                <div className={ styles.col }>{ order ? currency.format( order.total ) : currency.format( total ) }</div>
            </div>
        </div>
    )
}