import { FC } from 'react';
import Head from 'next/head';
import Image from 'next/image'

interface Props {
    title?: string;
    pageDescription: string;
    children?: React.ReactNode
}

export const AuthLayout:FC<Props> = ({ children, title, pageDescription }) => {
    return (
        <>
        <Head>
            <title>{ title }</title>
            <meta name="description" content={ pageDescription } />
        </Head>
        <main className='auth fadeIn'>
            <div className='auth__image'>
                <Image
                    src={ "/images/hero/hero-01.jpg" }
                    alt={ "Hero 01" }
                    width={ 960 }
                    height={ 1080 }
                    loading = 'lazy'
                />
            </div>
            <div className='auth__content'>
                { children }
            </div>
        </main>
        </>
    )
}