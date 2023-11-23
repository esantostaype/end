import { FC, useContext } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { useTheme } from 'next-themes'
import { Header, Footer, SideMenu, SideCart } from '../components';
import { BagIcon, CartIcon, InventoryIcon, LoginIcon, LogoutIcon, OrdersIcon, UserIcon } from '../components/Icons'
import { AuthContext } from '../context';

interface Props {
    title?: string;
    pageDescription: string;
    imageFullUrl?: string;
    size?: string;
    children?: React.ReactNode
}

export const MyAccountLayout:FC<Props> = ({ children, title, pageDescription, imageFullUrl, size="large" }) => {
    
    const { logout } = useContext( AuthContext );

    const onLogout = () => {
        logout();
    }

    return (
        <>
        <Head>
            <title>{ title }</title>
            <meta name="description" content={ pageDescription } />
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />
            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            }
        </Head>
        <Header/>
        <main className={ `main ${ size } fadeIn` }>
            <section className='main__content my-account'>
                <nav className='my-account__nav'>
                    <ul className='my-account__nav__list'>
                        <li className='my-account__nav__item'>
                            <NextLink href='/my-account'>
                                <UserIcon height={ 24 } width={ 24 } />
                                <span>Account Details</span>
                            </NextLink>
                        </li>
                        <li className='my-account__nav__item'>
                            <NextLink href='/my-account/orders'>
                                <BagIcon height={ 24 } width={ 24 } />
                                <span>Orders</span>
                            </NextLink>
                        </li>
                        <li className='my-account__nav__item'>
                            <NextLink href='/my-account/addresses'>
                                <CartIcon height={ 24 } width={ 24 } />
                                <span>Addresses</span>
                            </NextLink>
                        </li>
                        <li className='my-account__nav__item'>
                            <button onClick={ onLogout }>
                                <LogoutIcon height={ 24 } width={ 24 } />
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className='my-account__content'>
                    { children }
                </div>
            </section>
        </main>
        <Footer/>
        <SideMenu/>
        <SideCart/>
        </>
    )
}