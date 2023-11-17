import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Logo } from '../Icons';
import styles from './Header.module.css';
import { Cart, SearchBox, User } from '../ui';

export const Header = () => {

    const { asPath } = useRouter();

    return (
        <>
        <header className={ styles.header }>
            <div className={ styles.logo }>
                <NextLink href='/'><Logo height={ 22 } width={ 62 } /></NextLink>
            </div>
            <nav className={ styles.nav }>
                <ul className={ styles.navList }>
                    <li className={ asPath === '/' ? `${styles.navItem} ${styles.active}` : `${styles.navItem}` }>
                        <NextLink href='/'>Home</NextLink>
                    </li>
                    <li className={ asPath === '/category/men' ? `${styles.navItem} ${styles.active}` : `${styles.navItem}` }>
                        <NextLink href='/category/men'>Men</NextLink>
                    </li>
                    <li className={ asPath === '/category/women' ? `${styles.navItem} ${styles.active}` : `${styles.navItem}` }>
                        <NextLink href='/category/women'>Women</NextLink>
                    </li>
                    <li className={ asPath === '/category/kids' ? `${styles.navItem} ${styles.active}` : `${styles.navItem}` }>
                        <NextLink href='/category/kids'>Kids</NextLink>
                    </li>
                    <li className={ asPath === '/category/unisex' ? `${styles.navItem} ${styles.active}` : `${styles.navItem}` }>
                        <NextLink href='/category/unisex'>Unisex</NextLink>
                    </li>
                </ul>
            </nav>
            <div className={ styles.headerRight }>
                <SearchBox/>
                <Cart/>
                <User/>
            </div>
        </header>        
        </>
    )
}