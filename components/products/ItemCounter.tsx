import { FC } from "react"
import styles from './ItemCounter.module.css';
import { MinusIcon, PlusIcon } from "../Icons";

interface Props {
    currentValue: number;
    maxValue: number;
    onUpdatedQuantity: ( newValue: number ) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, onUpdatedQuantity }) => {

    const addOrRemove = ( value: number ) => {
        if ( value === -1 ){
            if ( currentValue === 1 ) return;
            return onUpdatedQuantity( currentValue - 1 );
        }

        if ( currentValue >= maxValue ) return;
        
        onUpdatedQuantity( currentValue + 1 );

    }

    return (
        <div className={ styles.content }>
            <button className={ styles.button } onClick={ () => addOrRemove(-1) }><MinusIcon height={ 8 } width={ 8 } /></button>
            <span className={ styles.counter }>{ currentValue }</span>
            <button className={ styles.button } onClick={ () => addOrRemove(+1) }><PlusIcon height={ 8 } width={ 8 } /></button>
        </div>
    )
}