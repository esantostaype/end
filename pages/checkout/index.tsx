import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, CartContext } from '../../context';
import { ShopLayout } from "../../layouts"
import { CartList, OrderSummary, TextField, Notification } from '../../components';
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';

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
        address2: string;
        city: string;
        zipCode: string;
    };
    shippingAddress: {
        country: string;
        address: string;
        address2: string;
        city: string;
        zipCode: string;
    };
    shipDifferentAddress: boolean;
}

const SignupSchema = Yup.object().shape({
});

const countryOptions = [
    { value: '', label: '' },
    { value: 'usa', label: 'United States of America' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
];

export const CheckoutPage = () => {

	const router = useRouter();

	const { isLoggedIn, registerUser } = useContext( AuthContext );
	const [ showError, setShowError ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState('');
    const [ createAccount, setCreateAccount ] = useState( false );
    const [ shipDifferentAddress, setShippingEqualBilling ] = useState( false );

	const { createOrder } = useContext( CartContext );

    const [ isPosting, setIsPosting] =useState( false );

    const navigateTo = ( url: string ) => {
        router.push( url );
    }
    
    return (
        <ShopLayout title={ 'Checkout | END.'} pageDescription={ 'Encuentra los mejores productos aquí'} size="medium">
            <div className="checkout-page">
                <div className="checkout-page__info">
                    <Formik
                        initialValues={{
                            email: '',
                            name: '',
                            password: '',
                            firstName: '',
                            lastName: '',
                            birthDay: '',
                            phone: '',
                            billingAddress: {
                                country: '',
                                address: '',
                                address2: '',
                                city: '',
                                zipCode: ''
                            },
                            shippingAddress: {
                                country: '',
                                address: '',
                                address2: '',
                                city: '',
                                zipCode: ''
                            },
                            shipDifferentAddress: true
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

                                if (createAccount) {
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
                    
                                    console.log(values);
                                
                                    setIsPosting( true );

                                    const { hasErrorOrder, messageOrder } = await createOrder(
                                        email,
                                        firstName,
                                        lastName,
                                        phone,
                                        billingAddress,
                                        values.shippingAddress
                                    );
    
                                    if ( hasError ) {
                                        setIsPosting( false );
                                        setErrorMessage( messageOrder );
                                        return;
                                    }
                    
                                    const destination = router.query.p?.toString() || '/';
                                    router.replace(destination);
                                }
                    
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
                                <div className="checkout-page__info__section">
                                    <div className='checkout-page__info__header'>
                                        <h3 className="checkout-page__info__title">Billing Details</h3>
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
                                            />
                                        </div>
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
                                                    />
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="checkout-page__info__section">
                                    <div className='checkout-page__info__header'>
                                        <h3 className="checkout-page__info__title">Shipping Details</h3>
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
                                                />
                                            </div>
                                        </>}
                                    </div>
                                </div>
                                <button className='main-button' type='submit' disabled={ isPosting }>Pay now</button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='checkout-page__summary'>
                    <h3 className='checkout-page__title'>Summary</h3>
                    <CartList/>
                    <h3 className='checkout-page__title'>Summary</h3>
                    <OrderSummary/>
                </div>
            </div>
		</ShopLayout>
    )
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken( token );
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }

//     if ( !isValidToken ) {
//         return {
//             redirect: {
//                 destination: '/login?p=/checkout',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {

//         }
//     }
// }

export default CheckoutPage