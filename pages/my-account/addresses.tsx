import { NextPage } from 'next';
import NextLink from 'next/link';
import { MyAccountLayout } from '../../layouts'
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IUser } from '../../interfaces';
import { getUserById } from '../../database/dbUsers';
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { TextField } from '../../components';
import { useContext } from 'react';
import { AuthContext } from '../../context';

interface Props {
    user: IUser[]
}

interface FormData {
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
    billingAddress: Yup.object().shape({
        country: Yup.string().required('Field required'),
        address: Yup.string().required('Field required'),
        address2: Yup.string(),
        city: Yup.string().required('Field required'),
        zipCode: Yup.string().required('Field required'),
    }),
    shippingAddress: Yup.object().shape({
        country: Yup.string().required('Field required'),
        address: Yup.string().required('Field required'),
        address2: Yup.string(),
        city: Yup.string().required('Field required'),
        zipCode: Yup.string().required('Field required'),
    })
});

const countryOptions = [
    { value: '', label: '' },
    { value: 'usa', label: 'United States of America' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
];

const AddressesPage: NextPage<Props> = ({ user }) => {

	const { updateAddresses } = useContext( AuthContext );

    return (
        <MyAccountLayout title={ `My Addresses`} pageDescription={ `My Addresses`} size="large">
            <h1>My Addresses</h1>
            
            <Formik
                initialValues={{
                    billingAddress: user?.billingAddress,
                    shippingAddress: user?.shippingAddress
                }}
                validationSchema={ SignupSchema }
                onSubmit = {
                    async( values: FormData, { setSubmitting }: FormikHelpers<FormData> ) => {

                        const {
                            billingAddress,
                            shippingAddress
                        } = values;

                        const { hasError, message } = await updateAddresses(
                            billingAddress,
                            shippingAddress
                        );
                    }
                }
            >
                {({ errors, touched, values }) => (
                    <Form className="form">
                        <div className="checkout-page">
                            <div className="checkout-page__main-content">
                                <div className="checkout-page__main-content__section">
                                    <div className='checkout-page__main-content__header'>
                                        <h3 className="checkout-page__title">Billing Address</h3>
                                    </div>
                                    <div className='form__content'>
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
                                    </div>
                                </div>
                                <div className="checkout-page__main-content__section">
                                    <div className='checkout-page__main-content__header'>
                                        <h3 className="checkout-page__title">Shipping Address</h3>
                                    </div>
                                    <div className='form__content'>
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
                                        <div className='form__field ff-12'>
                                            <button className='main-button' type='submit' >Update Addresses</button>
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session:any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: `/login?p=/my-account/addresses`,
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

export default AddressesPage;