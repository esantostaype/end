import '../styles/globals.css'
import '@splidejs/react-splide/css';
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { ThemeProvider } from 'next-themes'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { SessionProvider } from "next-auth/react"
import { AuthProvider, CartProvider, UIProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<SessionProvider>
			<SWRConfig
				value={{
					fetcher: ( resource, init ) => fetch( resource, init ).then( res => res.json() )
				}}
			>
				<SnackbarProvider>
					<AuthProvider>
						<CartProvider>
							<UIProvider>
								<Component {...pageProps} />
							</UIProvider>
						</CartProvider>
					</AuthProvider>
				</SnackbarProvider>
			</SWRConfig>
		</SessionProvider>
	)
}

export default MyApp