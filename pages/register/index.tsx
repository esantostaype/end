import { FC, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { AuthLayout } from '../../layouts';
import { AuthContext } from '../../context';
import { Notification, TextField } from '../../components';

interface FormData {
	name: string,
    firstName: string,
    lastName: string,
    birthDay: string,
	phone: string,
    email: string,
    password: string,
	confirmPassword : string
}

const SignupSchema = Yup.object().shape({
    name: Yup.string().min( 2, 'Must be at least 2 characters' ).required( 'Field required' ),
    firstName: Yup.string().min( 2, 'Must be at least 2 characters' ).required( 'Field required' ),
    lastName: Yup.string().min( 2, 'Must be at least 2 characters' ).required( 'Field required' ),
    birthDay: Yup.string().matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Invalid date format').required('Field required'),
    email: Yup.string().email( 'Invalid email' ).required( 'Field required' ),
    password: Yup.string().min( 6, 'Must be at least 6 characters' ).required( 'Field required' ),
	confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Field required'),
});

const countryOptions = [
    { value: '', label: '' },
    { value: 'usa', label: 'United States of America' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
];

const RegisterPage = () => {

	const router = useRouter();

	const { registerUser } = useContext( AuthContext );
	const [ showError, setShowError] = useState( false );
	const [ errorMessage, setErrorMessage] = useState('');
	const [ isLoading, setIsLoading ] = useState( false );


	return (
		<AuthLayout title={ 'Register | END.'} pageDescription={ 'Register and buy'}>
			<h1>Register</h1>
			<Formik
				initialValues={{ 
					name: '',
					firstName: '',
					lastName: '',
					birthDay: '',
					phone: '',
					email: '',
					password: '',
					confirmPassword: ''
				}}
				validationSchema={ SignupSchema }
				onSubmit = {
					async( values: FormData, { setSubmitting }: FormikHelpers<FormData> ) => {

						setIsLoading( true );
						setShowError( false );

						const { name, firstName, lastName, email, birthDay, phone, password  } = values;
						
						const { hasError, message } = await registerUser(
							name,
							firstName,
							lastName,
							birthDay,
							phone,
							email,
							password
						);

						console.log(values);

						setIsLoading(false);

						if ( hasError ) {
							setShowError( true );
							setErrorMessage( message! );
							return;
						}
						setSubmitting( false );

						//await signIn( 'credentials', { email, password } );

						const destination = router.query.p?.toString() || '/';
						router.replace( destination );
					}
				}
			>
				{({ errors, touched }) => (
					<Form className="form">
						{
							showError &&
							<Notification
								message="The email is already in use, please try another."
								type="error"
							/>
						}
						<TextField
							label="Username"
							type="text"
							name="name"
							placeholder="Enter your Username"
							errors={ errors.name }
							touched={ touched.name }
						/>
						<TextField
							label="First Name"
							type="text"
							name="firstName"
							placeholder="Enter your First Name"
							errors={ errors.firstName }
							touched={ touched.firstName }
						/>
						<TextField
							label="Last Name"
							type="text"
							name="lastName"
							placeholder="Enter your Last Name"
							errors={ errors.lastName }
							touched={ touched.lastName }
						/>
						<TextField
							label="Email"
							type="email"
							name="email"
							placeholder="Enter your Email"
							errors={ errors.email }
							touched={ touched.email }
						/>
						<TextField
							label="Phone"
							type="tel"
							name="phone"
							placeholder="Enter your Phone"
							errors={ errors.phone }
							touched={ touched.phone }
						/>
						<TextField
							label="Birthday"
							type="text"
							name="birthDay"
							placeholder="(MM/DD/YYYY)"
							errors={ errors.birthDay }
							touched={ touched.birthDay }
						/>
						<TextField
							label="Password"
							type="password"
							name="password"
							placeholder="Enter your Password"
							errors={ errors.password }
							touched={ touched.password }
						/>
						<TextField
							label="Confirm Password"
							type="password"
							name="confirmPassword"
							placeholder="Confirm your Password"
							errors={ errors.confirmPassword }
							touched={ touched.confirmPassword }
						/>
						{ isLoading ? (
							<p>Loading...</p>
						) : (
							<button className='main-button' type='submit'>Register</button>
						)}
						<div className='form__item'>
							<p>Do you already have an account? <NextLink href={ router.query.p ? `/login?p=${ router.query.p }` : "/login" } className='link'>Log in</NextLink></p>
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

export default RegisterPage