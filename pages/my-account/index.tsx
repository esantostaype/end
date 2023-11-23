import { useContext, useState } from 'react';
import { NextPage } from 'next';
import { MyAccountLayout } from '../../layouts'
import { GetServerSideProps } from 'next';
import { IUser } from '../../interfaces';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { getUserById } from '../../database/dbUsers';
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { AuthContext } from '../../context';
import { TextField, Notification } from '../../components';

interface Props {
    user: IUser;
}

interface FormData {
    email: string;
    name: string;
    firstName: string,
    lastName: string,
    birthDay: string;
    phone: string;
}

const SignupSchema = Yup.object().shape({
    name: Yup.string().min( 2, 'Must be at least 2 characters' ).required( 'Field required' ),
    firstName: Yup.string().min( 2, 'Must be at least 2 characters' ).required( 'Field required' ),
    lastName: Yup.string().min( 2, 'Must be at least 2 characters' ).required( 'Field required' ),
    email: Yup.string().email( 'Invalid email' ).required( 'Field required' ),
    phone: Yup.string().min( 9, 'Must be 9 digits' ).max( 9, 'Must be 9 digits' ).required( 'Field required' ),
    // password: Yup.string().min( 6, 'Must be at least 6 characters' ).required( 'Field required' ),
	// confirmPassword: Yup.string()
    // .oneOf([Yup.ref('password')], 'Passwords must match')
});

const MyAccountPage: NextPage<Props> = ({ user }) => {

	const { updateUser } = useContext( AuthContext );
	const [ showError, setShowError ] = useState( false );
	const [ isLoading, setIsLoading ] = useState( false );

    return (
        <MyAccountLayout title={ `My Account`} pageDescription={ `My Account`} size="large">
            <h1>Account Details</h1>
            <Formik
                initialValues={{
                    email: user?.email,
                    name: user?.name|| '',
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    birthDay: user?.birthDay || '',
                    phone: user?.phone
                }}
                validationSchema={ SignupSchema }
                onSubmit = {
                    async( values: FormData, { setSubmitting }: FormikHelpers<FormData> ) => {

                        const {
                            name,
                            firstName,
                            lastName,
                            birthDay,
                            phone,
                            email
                        } = values;

                        const { hasError, message } = await updateUser(
                            name,
                            firstName,
                            lastName,
                            birthDay,
                            phone,
                            email
                        );

                        if ( hasError ) {
                            setShowError( true );
                        } else {
                        }
                        
                        setSubmitting( false );
                    }
                }
            >
                {({ errors, touched, values }) => (
                    <Form className="form">
                        <div className="checkout-page">
                            <div className="checkout-page__main-content">
                                {
                                    showError &&
                                    <Notification
                                        message="The email is already in use, please try another."
                                        type="error"
                                    />
                                }
                                <div className="checkout-page__main-content__section">
                                    <div className='form__content'>
                                        <div className='form__field ff-6'>
                                            <TextField
                                                label="Username"
                                                type="text"
                                                name="name"
                                                placeholder="Enter your Username"
                                                errors={ errors.name }
                                                touched={ touched.name }
                                                value={ values.name }
                                            />
                                        </div>
                                        <div className='form__field ff-6'>
                                        </div>
                                        <div className='form__field ff-6'>
                                            <TextField
                                                label="First Name"
                                                type="text"
                                                name="firstName"
                                                placeholder="Enter your First Name"
                                                errors={ errors.firstName }
                                                touched={ touched.firstName }
                                                value={ values.firstName }
                                            />
                                        </div>
                                        <div className='form__field ff-6'>
                                            <TextField
                                                label="Last Name"
                                                type="text"
                                                name="lastName"
                                                placeholder="Enter your Last Name"
                                                errors={ errors.lastName }
                                                touched={ touched.lastName }
                                                value={ values.lastName }
                                            />
                                        </div>
                                        <div className='form__field ff-6'>
                                            <TextField
                                                label="Email Address"
                                                type="email"
                                                name="email"
                                                placeholder="Enter your Email Address"
                                                errors={ errors.email }
                                                touched={ touched.email }
                                                value={ values.email }
                                            />
                                        </div>
                                        <div className='form__field ff-6'>
                                            <TextField
                                                label="Phone"
                                                type="tel"
                                                name="phone"
                                                placeholder="Enter your Phone"
                                                errors={ errors.phone }
                                                touched={ touched.phone }
                                                value={ values.phone }
                                            />
                                        </div>
                                        <div className='form__field ff-6'>
                                            <TextField
                                                label="Birthday"
                                                type="text"
                                                name="birthDay"
                                                placeholder="Enter your Birthay"
                                                errors={ errors.birthDay }
                                                touched={ touched.birthDay }
                                                value={ values.birthDay }
                                            />
                                        </div>
                                        <div className='form__field ff-12'>
                                            { isLoading ? (
                                                <p>Loading...</p>
                                            ) : (
                                                <button className='main-button' type='submit'>Update</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </MyAccountLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    
    const session: any = await getServerSession( req, res, authOptions );

    if ( !session ) {
        return {
            redirect: {
                destination: `/login?p=/my-account`,
                permanent: false,
            }
        }
    }

    if ( session ) {
        const user = await getUserById( session.user._id );

        if ( user ) {
            return {
                props: {
                    user
                }
            };
        }
    }


    return {
        props: {}
    }
}

export default MyAccountPage;