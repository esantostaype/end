import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { Formik, Form, FormikHelpers, Field } from 'formik';
import * as Yup from 'yup';
import { AuthLayout } from '../../layouts';
import { AuthContext } from '../../context';
import { Notification, TextField } from '../../components';

interface FormData {
	email: string;
	password: string;
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email( 'Invalid email' ).required( 'Field required' ),
    password: Yup.string().min( 6, 'Must be at least 6 characters' ).required( 'Field required' )
});

const LoginPage = () => {

	const router = useRouter();

	const { loginUser } = useContext( AuthContext );
	const [ showError, setShowError] = useState( false );

	const [ providers, setProviders ] = useState<any>({});

	useEffect(() => {
	  	getProviders().then( prov => {
			console.log( prov );
			setProviders( prov );
		})
	}, [])
	

	return (
		<AuthLayout title={ 'Login | END.'} pageDescription={ 'Log in and buy'}>
			<h1>Login</h1>
			<Formik autoComplete='off'
				initialValues={{
					email: '',
					password: ''
				}}
				validationSchema={ SignupSchema }
				onSubmit = {
					async(
						{ email, password }: FormData,
						{ setSubmitting }: FormikHelpers<FormData>
					) => {
						
						setShowError( false );

						await signIn( 'credentials', { email, password, redirect: false } );
						
						const isValidLogin = await loginUser( email, password );

						if( !isValidLogin ) {
							setShowError( true );
							return;
						}

						const destination = router.query.p?.toString() || '/';
						router.replace( destination );

						setSubmitting( false );
					}
				}
			>
				{({ errors, touched, values }) => (
					<Form className="form">
						{
							showError &&
							<Notification
								message="The email or password you entered doesn't match our records. Please double-check and try again."
								type="error"
							/>
						}
						<TextField
							label="Email"
							type="email"
							name="email"
							placeholder="Enter your Email"
							errors={ errors.email }
							touched={ touched.email }
							value={ values.email }
						/>
						<TextField
							label="Password"
							type="password"
							name="password"
							placeholder="Enter your Password"
							errors={ errors.password }
							touched={ touched.password }
							value={ values.password }
						/>
						<div className='form__item'>
							<button className='main-button' type='submit'>Login</button>
						</div>
						<div className='form__item'>
							<p>You still dont have an account? <NextLink href={ router.query.p ? `/register?p=${ router.query.p }` : "/register" } className='link'>Sign up</NextLink></p>
						</div>
						<div className='form__item'>
							{
								Object.values( providers ).map(( provider: any ) => {
									
									if ( provider.id === 'credentials' ) return ( <div key='credentials'></div> )

									return (
										<button className='main-button' key={ provider.id } onClick={ () => signIn( provider.id ) }>
											{ provider.name }
										</button>
									)
								})
							}
						</div>
					</Form>
				)}
			</Formik>
		</AuthLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

	const session = await getSession ({ req });

	const  { p = '/' } = query;

	if ( session ) {
		return {
			redirect: {
				destination: p.toString(),
				permanent: false
			}
		}
	}

	return {
		props: {}
	}

}

export default LoginPage