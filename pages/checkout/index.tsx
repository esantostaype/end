import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, CartContext } from '../../context';
import { ShopLayout } from "../../layouts"
import { CartList, OrderSummary, TextField, Notification, CartSummary } from '../../components';
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps, NextPage } from 'next';
import { IUser } from '../../interfaces';
import { dbUsers } from '../../database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { getUserById } from '../../database/dbUsers';

interface Props {
    user: IUser;
}

interface FormData {
    email: string;
    name: string;
    password: string;
    firstName: string,
    lastName: string,
    birthDay: string;
    phone: string;
    billingAddress: {
        country: string;
        address: string;
        address2?: string;
        city: string;
        zipCode: string;
    };
    shippingAddress: {
        country: string;
        address: string;
        address2?: string;
        city: string;
        zipCode: string;
    }
}

const SignupSchema = Yup.object().shape({
});

const countryOptions = [
    { value: '', label: '' },
    { value: 'usa', label: 'United States of America' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
];

const CheckoutPage: NextPage<Props> = ({ user }) => {

    console.log({user});

	const router = useRouter();

	const { isLoggedIn, registerUser } = useContext( AuthContext );
	const [ showError, setShowError ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState('');
    const [ createAccount, setCreateAccount ] = useState( false );
    const [ shipDifferentAddress, setShippingEqualBilling ] = useState( false );

	const { createOrder } = useContext( CartContext );

    const [ isPosting, setIsPosting] =useState( false );
    
    return (
        <ShopLayout title={ 'Checkout | END.'} pageDescription={ 'Encuentra los mejores productos aquí'} size="large">
            <h1>Checkout</h1>
            <Formik
                initialValues={{
                    email: user?.email || '',
                    name: user?.name|| '',
                    password: '',
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || '',
                    birthDay: user?.birthDay || '',
                    phone: user?.phone || '',
                    billingAddress: user?.billingAddress || {
                        country: '',
                        address: '',
                        address2: '',
                        city: '',
                        zipCode: ''
                    },
                    shippingAddress: user?.shippingAddress || {
                        country: '',
                        address: '',
                        address2: '',
                        city: '',
                        zipCode: ''
                    }
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
                            email,
                            password,
                            billingAddress,
                            shippingAddress
                        } = values;

                        if ( createAccount ) {
            
                            if ( shipDifferentAddress ) {
                                values.shippingAddress = {
                                    country: '',
                                    address: '',
                                    address2: '',
                                    city: '',
                                    zipCode: '',
                                };
                
                                values.shippingAddress.country = shippingAddress.country;
                                values.shippingAddress.address = shippingAddress.address;
                                values.shippingAddress.address2 = shippingAddress.address2;
                                values.shippingAddress.city = shippingAddress.city;
                                values.shippingAddress.zipCode = shippingAddress.zipCode;
                            } else {
                                values.shippingAddress.country = values.billingAddress.country;
                                values.shippingAddress.address = values.billingAddress.address;
                                values.shippingAddress.address2 = values.billingAddress.address2;
                                values.shippingAddress.city = values.billingAddress.city;
                                values.shippingAddress.zipCode = values.billingAddress.zipCode;
                            }

                            const { hasError, message } = await registerUser(
                                name,
                                firstName,
                                lastName,
                                birthDay,
                                phone,
                                email,
                                password,
                                billingAddress,
                                values.shippingAddress
                            );
            
                            if (hasError) {
                                setShowError(true);
                                setErrorMessage(message!);
                                throw new Error('Error registering user');
                            }
            
                            await signIn( 'credentials', { email, password, redirect: false } );

                            const { hasErrorOrder, messageOrder } = await createOrder(
                                email,
                                firstName,
                                lastName,
                                phone,
                                billingAddress,
                                values.shippingAddress
                            );

                            if ( hasErrorOrder ) {
                                setIsPosting( false );
                                setErrorMessage( messageOrder );
                                return;
                            }
                        
                            setIsPosting( true );

                            router.replace( `/orders/${ messageOrder }` );
                        } else {
            
                            if ( shipDifferentAddress ) {
                                values.shippingAddress = {
                                    country: '',
                                    address: '',
                                    address2: '',
                                    city: '',
                                    zipCode: '',
                                };
                
                                values.shippingAddress.country = shippingAddress.country;
                                values.shippingAddress.address = shippingAddress.address;
                                values.shippingAddress.address2 = shippingAddress.address2;
                                values.shippingAddress.city = shippingAddress.city;
                                values.shippingAddress.zipCode = shippingAddress.zipCode;
                            } else {
                                values.shippingAddress.country = values.billingAddress.country;
                                values.shippingAddress.address = values.billingAddress.address;
                                values.shippingAddress.address2 = values.billingAddress.address2;
                                values.shippingAddress.city = values.billingAddress.city;
                                values.shippingAddress.zipCode = values.billingAddress.zipCode;
                            }
                            
                            setIsPosting( true );

                            const { hasErrorOrder, messageOrder } = await createOrder(
                                email,
                                firstName,
                                lastName,
                                phone,
                                billingAddress,
                                values.shippingAddress
                            );

                            if ( hasErrorOrder ) {
                                setIsPosting( false );
                                setErrorMessage( messageOrder );
                                return;
                            }

                            router.replace( `/orders/${ messageOrder }` );
                            
                            setSubmitting(false);
                        }
                    }
                }
            >
                {({ errors, touched, values }) => (
                    <Form className="form">
                        <div className="checkout-page">
                            <div className="checkout-page__info">
                                {
                                    showError &&
                                    <Notification
                                        message="The email is already in use, please try another."
                                        type="error"
                                    />
                                }
                                <div className="checkout-page__info__section">
                                    <div className='checkout-page__info__header'>
                                        <h3 className="checkout-page__title">Billing Details</h3>
                                    </div>
                                    <div className='form__content'>
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
                                        <div className='form__field ff-12'>
                                            <TextField
                                                as="select"
                                                label="Country"
                                                type="country"
                                                name="billingAddress.country"
                                                options={ countryOptions }
                                                errors={ errors.billingAddress?.country }
                                                touched={ touched.billingAddress?.country }
                                                value={ values.billingAddress?.country }
                                            />
                                        </div>
                                        <div className='form__field ff-12'>
                                            <TextField
                                                label="Address"
                                                type="text"
                                                name="billingAddress.address"
                                                placeholder="Enter your Address"
                                                errors={ errors.billingAddress?.address }
                                                touched={ touched.billingAddress?.address }
                                                value={ values.billingAddress?.address }
                                            />
                                        </div>
                                        <div className='form__field ff-12'>
                                            <TextField
                                                label="Address 2 (optional)"
                                                type="text"
                                                name="billingAddress.address2"
                                                placeholder="Enter your Address 2"
                                                errors={ errors.billingAddress?.address2 }
                                                touched={ touched.billingAddress?.address2 }
                                                value={ values.billingAddress?.address2 }
                                            />
                                        </div>
                                        <div className='form__field ff-6'>
                                            <TextField
                                                label="Town/City"
                                                type="text"
                                                name="billingAddress.city"
                                                placeholder="Enter your Town/City"
                                                errors={ errors.billingAddress?.city }
                                                touched={ touched.billingAddress?.city }
                                                value={ values.billingAddress?.city }
                                            />
                                        </div>
                                        <div className='form__field ff-6'>
                                            <TextField
                                                label="Zip Code"
                                                type="text"
                                                name="billingAddress.zipCode"
                                                placeholder="Enter your Zip Code"
                                                errors={ errors.billingAddress?.zipCode }
                                                touched={ touched.billingAddress?.zipCode }
                                                value={ values.billingAddress?.zipCode }
                                            />
                                        </div>
                                        {
                                            !isLoggedIn &&
                                            <div className='form__field ff-12'>
                                                <div className='checkbox'>
                                                    <input
                                                        id="createAccount"
                                                        type="checkbox"
                                                        checked={ createAccount }
                                                        onChange={() => setCreateAccount( !createAccount )}
                                                    />
                                                    <label htmlFor="createAccount">Create account</label>
                                                </div>
                                            </div>
                                        }                                        
                                        {
                                            createAccount &&
                                            <>
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
                                                    <TextField
                                                        label="Password"
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter your Password"
                                                        errors={ errors.password }
                                                        touched={ touched.password }
                                                        value={ values.password }
                                                    />
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="checkout-page__info__section">
                                    <div className='checkout-page__info__header'>
                                        <h3 className="checkout-page__title">Shipping Details</h3>
                                    </div>
                                    <div className='form__content'>
                                        <div className='form__field ff-12'>
                                            <div className='checkbox'>
                                                <input
                                                    id="shipDifferentAddress"
                                                    type="checkbox"
                                                    checked={ shipDifferentAddress }
                                                    onChange={() => setShippingEqualBilling( !shipDifferentAddress )}
                                                />
                                                <label htmlFor="shipDifferentAddress">Ship to a different address?</label>
                                            </div>
                                        </div>
                                        { shipDifferentAddress &&
                                        <>
                                            <div className='form__field ff-12'>
                                                <TextField
                                                    as="select"
                                                    label="Country"
                                                    type="country"
                                                    name="shippingAddress.country"
                                                    options={ countryOptions }
                                                    errors={ errors.shippingAddress?.country }
                                                    touched={ touched.shippingAddress?.country }
                                                    value={ values.shippingAddress?.country }
                                                />
                                            </div>
                                            <div className='form__field ff-12'>
                                                <TextField
                                                    label="Address"
                                                    type="text"
                                                    name="shippingAddress.address"
                                                    placeholder="Enter your Address"
                                                    errors={ errors.shippingAddress?.address }
                                                    touched={ touched.shippingAddress?.address }
                                                    value={ values.shippingAddress?.address }
                                                />
                                            </div>
                                            <div className='form__field ff-12'>
                                                <TextField
                                                    label="Address 2 (optional)"
                                                    type="text"
                                                    name="shippingAddress.address2"
                                                    placeholder="Enter your Address 2"
                                                    errors={ errors.shippingAddress?.address2 }
                                                    touched={ touched.shippingAddress?.address2 }
                                                    value={ values.shippingAddress?.address2 }
                                                />
                                            </div>
                                            <div className='form__field ff-6'>
                                                <TextField
                                                    label="Town/City"
                                                    type="text"
                                                    name="shippingAddress.city"
                                                    placeholder="Enter your Town/City"
                                                    errors={ errors.shippingAddress?.city }
                                                    touched={ touched.shippingAddress?.city }
                                                    value={ values.shippingAddress?.city }
                                                />
                                            </div>
                                            <div className='form__field ff-6'>
                                                <TextField
                                                    label="Zip Code"
                                                    type="text"
                                                    name="shippingAddress.zipCode"
                                                    placeholder="Enter your Zip Code"
                                                    errors={ errors.shippingAddress?.zipCode }
                                                    touched={ touched.shippingAddress?.zipCode }
                                                    value={ values.shippingAddress?.zipCode }
                                                />
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </div>
                            <div className='checkout-page__summary'>
                                <h3 className='checkout-page__title'>Summary</h3>
                                <CartSummary/>
                                <OrderSummary/>
                                <button className='main-button' type='submit' disabled={ isPosting }>Place Order</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
		</ShopLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    
    const session: any = await getServerSession(req, res, authOptions);

    if ( session ) {
        const user = await getUserById(session.user._id);

        if ( user ) {
            return {
                props: {
                    user
                },
            };
        }
    }

    return {
        props: {}
    }
}

export default CheckoutPage