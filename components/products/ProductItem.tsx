import { FC, useMemo, useState } from "react"
import NextLink from 'next/link';
import Image from 'next/image'
import { IProduct } from "../../interfaces";
import styles from './ProductItem.module.css';

interface Props {
    product: IProduct;
}

export const ProductItem: FC<Props> = ({ product }) => {

    const [ isHovered, setIsHovered ] = useState( false );

    const productImage = useMemo(() => {
        return isHovered
            ? `/products/${ product.images[1] }`
            : `/products/${ product.images[0] }`
    }, [ isHovered, product.images ])

    return (
        <li
            className={ styles.card }
            onMouseEnter={ () => setIsHovered( true ) }
            onMouseLeave={ () => setIsHovered( false ) }
        >
            <NextLink href={ `/product/${ product.slug }` } prefetch={ false }>
                {
                    ( product.inStock === 0 ) && (
                        <span className={ styles.outStock }>Out-Stock</span>
                    )
                }
                <figure className={ `${ styles.cardImage } fadeIn` }>
                    <Image
                        src={ productImage }
                        alt={ product.title }
                        loading = 'lazy'
                        width={ 240 }
                        height={ 280 }
                    />
                </figure>
                <h2 className={ styles.cardTitle }>{ product.title }</h2>
                <p>${ product.price }</p>
            </NextLink>
        </li>
    )
}