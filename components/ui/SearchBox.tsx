import { useState } from "react"
import { useRouter } from "next/router";
import styles from './SearchBox.module.css';
import { SearchIcon } from "../Icons";

export const SearchBox = () => {

    const router = useRouter();
    
    const [ searchTerm, setSearchTerm ] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        navigateTo(`/search/${ searchTerm }`);
    }

    const navigateTo = ( url: string ) => {
        router.push( url );
    }

    return (
        <div className={ styles.wrapper }>
            <input
                value={ searchTerm }
                onChange={ (e) => setSearchTerm( e.target.value ) }
                onKeyDown={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                placeholder='Search'
                className={ styles.field }
            />
            <button className={ styles.button } onClick={ onSearchTerm } >
                <SearchIcon height={ 16 } width={ 16 } />
            </button>
        </div>
    )
}