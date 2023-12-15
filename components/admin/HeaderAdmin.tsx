import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { InventoryIcon, Logo, LogoutIcon, UserIcon } from '../Icons';
import styles from './HeaderAdmin.module.css';
import { Cart, SearchBox, User } from '../ui';

export const HeaderAdmin = () => {

    const { asPath } = useRouter();

    return (
        <>
        <header className={ styles.header }>
            <div className={ styles.header__content }>
                <h2 className={ styles.header__title }>Admin</h2>
            </div>
            <User/>
        </header>
        <aside className={ styles.sidebar }>
            <div className={ styles.logo }>
                <NextLink href='/'><Logo height={ 22 } width={ 62 } fill='#fff' /></NextLink>
            </div>
            <nav className={ styles.nav }>
                <ul className={ styles.navList }>
                    <li className={ asPath === '/admin' ? `${styles.navItem} ${styles.active}` : `${styles.navItem}` }>
                        <NextLink href='/admin'>
                            <InventoryIcon height={ 16 } width={ 16 } fill='#fff' />
                            <span>Dashboard</span>
                        </NextLink>
                    </li>
                    <li className={ asPath === '/admin/users' ? `${styles.navItem} ${styles.active}` : `${styles.navItem}` }>
                        <NextLink href='/admin/users'>
                            <UserIcon height={ 16 } width={ 16 } fill='#fff' />
                            <span>Users</span>
                        </NextLink>
                    </li>
                    <li className={ asPath === '/admin/orders' ? `${styles.navItem} ${styles.active}` : `${styles.navItem}` }>
                        <NextLink href='/admin/orders'>
                            <InventoryIcon height={ 16 } width={ 16 } fill='#fff' />
                            <span>Orders</span>
                        </NextLink>
                    </li>
                </ul>
            </nav>
        </aside>
        </>
    )
}