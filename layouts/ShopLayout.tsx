import { FC } from 'react';
import Head from 'next/head';
import { useTheme } from 'next-themes'
import { Header, Footer, SideMenu, SideCart } from '../components';

interface Props {
    title?: string;
    pageDescription: string;
    imageFullUrl?: string;
    size?: string;
    children?: React.ReactNode
}

export const ShopLayout:FC<Props> = ({ children, title, pageDescription, imageFullUrl, size="large" }) => {

    const { theme, setTheme } = useTheme()

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
        <main className={ `main ${ size }` }>
            <section className='main__content'>
                { children }
            </section>
        </main>
        <Footer/>
        <SideMenu/>
        <SideCart/>
        </>
    )
}