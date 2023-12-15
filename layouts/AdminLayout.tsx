import { FC } from 'react';
import Head from 'next/head';
import { useTheme } from 'next-themes'
import { HeaderAdmin } from '../components';
import useSWR from 'swr';

interface Props {
    title?: string;
    children?: React.ReactNode
}

export const AdminLayout:FC<Props> = ({ children, title }) => {

    const { theme, setTheme } = useTheme()

    return (
        <>
        <Head>
            <title>{ title }</title>
            <meta name="og:title" content={ title } />
        </Head>
        <HeaderAdmin/>
        <main className="admin fadeIn">
            <div className='admin__content'>
                { children }
            </div>
        </main>
        </>
    )
}