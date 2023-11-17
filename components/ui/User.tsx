import { useRef, useState, useEffect, useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import styles from './User.module.css';
import { BagIcon, CartIcon, InventoryIcon, LoginIcon, LogoutIcon, OrdersIcon, UserIcon } from "../Icons";
import { AuthContext } from '../../context';

export const User = () => {

    const router = useRouter();
    
    const { user, isLoggedIn, logout } = useContext( AuthContext )

    const [ isPopoverOpen, setIsPopoverOpen ] = useState( false );
    const popoverRef = useRef( null );

    const togglePopover = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleOutsideClick = (event: MouseEvent) => {
        if (popoverRef.current && event.target && !( popoverRef.current as Node ).contains( event.target as Node )) {
            closePopover();
        }
    };    

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleEscapeKey = ( event: KeyboardEvent ) => {
        if ( event.key === 'Escape' ) {
            closePopover();
        }
    };

    useEffect(() => {
        if (isPopoverOpen) {
            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('keydown', handleEscapeKey);
        } else {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [ handleEscapeKey, handleOutsideClick, isPopoverOpen ]);

    const onLogout = () => {
        logout();
    }

    const navigateTo = ( url: string ) => {
        router.push( url );
    }

    return (
        <div className={ styles.content } ref={ popoverRef }>
            <button className={ styles.button } onClick={ togglePopover }>
                <UserIcon height={ 24 } width={ 24 } />
            </button>
            <div className={`${ styles.popover } ${ isPopoverOpen ? styles.isOpen : '' }`}>
                {
                    isLoggedIn &&
                    <div className={ styles.popoverSection }>
                        <p>Welcome, { user?.name }</p>
                    </div>
                }
                <div className={ styles.popoverSection }>
                    <ul className={ styles.popoverList }>
                        {
                            isLoggedIn ?
                            (   <>
                                <li className={ styles.popoverItem }>
                                    <NextLink href='/profile'>
                                        <UserIcon height={ 16 } width={ 16 } />
                                        <span>Profile</span>
                                    </NextLink>
                                </li>
                                <li className={ styles.popoverItem }>
                                    <NextLink href='/orders'>
                                        <BagIcon height={ 16 } width={ 16 } />
                                        <span>My Orders</span>
                                    </NextLink>
                                </li>
                                <li className={ styles.popoverItem }>
                                    <NextLink href='/cart'>
                                        <CartIcon height={ 16 } width={ 16 } />
                                        <span>My Cart</span>
                                    </NextLink>
                                </li>
                                <li className={ styles.popoverItem }>
                                    <button onClick={ onLogout }>
                                        <LogoutIcon height={ 16 } width={ 16 } />
                                        <span>Logout</span>
                                    </button>
                                </li>
                                </>
                            ) : (
                                <>
                                <li className={ styles.popoverItem }>
                                    <button onClick={ () => navigateTo( `/login?p=${ router.asPath }` ) }>
                                        <LoginIcon height={ 16 } width={ 16 } />
                                        <span>Login</span>
                                    </button>
                                </li>
                                <li className={ styles.popoverItem }>
                                    <button onClick={ () => navigateTo( `/register?p=${ router.asPath }` ) }>
                                        <UserIcon height={ 16 } width={ 16 } />
                                        <span>Register</span>
                                    </button>
                                </li>
                                </>
                            )
                        }
                    </ul>
                </div>
                {
                    user?.role === 'admin' &&
                    (   <>
                        <div className={ styles.popoverSection }>
                            <h3 className={ styles.popoverTitle }>Admin Panel</h3>                
                            <ul className={ styles.popoverList }>
                                <li className={ styles.popoverItem }>
                                    <NextLink href='/admin/products'>
                                        <InventoryIcon height={ 16 } width={ 16 } />
                                        <span>Products</span>
                                    </NextLink>
                                </li>
                                <li className={ styles.popoverItem }>
                                    <NextLink href='/admin/orders'>
                                        <BagIcon height={ 16 } width={ 16 } />
                                        <span>Orders</span>
                                    </NextLink>
                                </li>
                                <li className={ styles.popoverItem }>
                                    <NextLink href='/admin/users'>
                                        <UserIcon height={ 16 } width={ 16 } />
                                        <span>Users</span>
                                    </NextLink>
                                </li>
                            </ul>
                        </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}