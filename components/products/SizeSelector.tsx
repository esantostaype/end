import { FC } from "react"
import styles from './SizeSelector.module.css';
import { ISize } from "../../interfaces";

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];

    onSelectedSize: ( size: ISize ) => void;
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
    return (
        <ul className={ styles.list }>
            {
                sizes.map( size => (
                    <li
                        key={ size }
                        className={ `${ selectedSize === size ? styles.selected  : ''}` }
                        onClick={ () => onSelectedSize( size ) }
                    >
                        <button className={ styles.size }>
                            { size }
                        </button>
                    </li>
                ) )
            }
        </ul>
    )
}