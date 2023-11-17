import { useContext, useEffect  } from 'react';
import { UIContext } from '../../context/ui';
import styles from './SideMenu.module.css';

export const SideMenu = () => {
    const { isMenuOpen, toggleSideMenu } = useContext( UIContext );

    useEffect(() => {
        const handleEscapeKey = ( event: { key: string; } ) => {
            if ( event.key === 'Escape' && isMenuOpen ) {
                toggleSideMenu();
            }
        };
        window.addEventListener('keydown', handleEscapeKey);
        return () => {
            window.removeEventListener( 'keydown', handleEscapeKey );
        };
    }, [isMenuOpen, toggleSideMenu]);

    const wrapperClassName = isMenuOpen ? `${ styles.wrapper } ${ styles.isOpen }` : styles.wrapper;

    return (
        <div className={ wrapperClassName }>
            <div className={ styles.bg} onClick={ toggleSideMenu }></div>
            <div className={ styles.content}>
                <h3>Side Menu</h3>
            </div>
        </div>
    );
};
