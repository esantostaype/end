import { FC } from "react"
import { IProduct } from "../../interfaces";
import { ProductItem } from '.';
import styles from './ProductList.module.css';

interface Props {
    products: IProduct[];
    limit?: number
}

export const ProductList: FC<Props> = ({ products, limit = 999 }) => {
    return (
        <ul className={ styles.grid }>
            {
                products.map(( product, index ) => index < limit && (
                    <ProductItem key={ product.slug } product={ product } />
                ) )
            }
        </ul>
    )
}