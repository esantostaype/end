import '../styles/globals.css'
import '@splidejs/react-splide/css';
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { ThemeProvider } from 'next-themes'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { SessionProvider } from "next-auth/react"
import { AuthProvider, CartProvider, UIProvider } from '../context';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<SessionProvider>
			<PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
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
			</PayPalScriptProvider>
		</SessionProvider>
	)
}

export default MyApp