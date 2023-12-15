import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';
import { IUser } from '../../interfaces'
import { AdminLayout } from '../../layouts'
import useSWR from 'swr';
import { Formik, Form, FormikHelpers, Field } from 'formik';
import { TextField } from '../../components';
import { endApi } from '../../api';

interface FormData {
	role: string;
}

const UsersPage = () => {

    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'super-admin', label: 'Super Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'client', label: 'Client' }
    ];

    const { data, error } = useSWR<IUser[]>( '/api/admin/users' );

	if ( !error && !data ) {
		return <></>
	}

	if ( error ) {
		console.log( error );
		return <h1>Error al cargar la información</h1>
	}

	return (
		<AdminLayout title={ 'Users | Admin - END.'}>
			<h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Birthday</th>
                        <th>Created At</th>
                        <th className='table__actions'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data!.map( ( user ) => (
                            <tr key={ user._id }>
                                <td>{ user.name }</td>
                                <td>
                                    <Formik autoComplete='off'
                                        initialValues={{
                                            role: user.role
                                        }}
                                        onSubmit = {
                                            async(
                                                { role }: FormData,
                                                { setSubmitting }: FormikHelpers<FormData>
                                            ) => {

                                                console.log({role})
                                                
                                                try {
                                                    await endApi.put('/admin/users', {
                                                        userId: user._id,
                                                        role
                                                    });
                                                } catch (error) {
                                                    
                                                }
                                                
                                                setSubmitting( false );
                                            }
                                        }
                                    >
                                        {({ values, handleChange, submitForm }) => (
                                            <Form className="form">
                                                <Field
                                                    name="role"
                                                    as="select"
                                                    value={ values.role }
                                                    onChange={(e: { target: { value: string; }; }) => {
                                                        handleChange(e);
                                                        if ( e.target.value !== values.role ) {
                                                            submitForm();
                                                        }
                                                    }}
                                                >
                                                    {[{ value: '', label: '' }, ...roleOptions ].map(( option ) => (
                                                        <option key={ option.value } value={ option.value }>
                                                            { option.label }
                                                        </option>
                                                    ))}
                                                </Field>
                                            </Form>
                                        )}
                                    </Formik>
                                </td>
                                <td>{ user.firstName }</td>
                                <td>{ user.lastName }</td>
                                <td>{ user.email }</td>
                                <td>{ user.phone }</td>
                                <td>{ user.birthDay }</td>
                                <td>{ user.createdAt }</td>
                                <td className='table__actions'><NextLink href={`/admin/users/${ user._id }`} className='ghost-button small'>View User</NextLink></td>
                            </tr>
                        ) )
                    }
                </tbody>
            </table>
		</AdminLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session:any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: `/login?p=/admin/users`,
                permanent: false,
            }
        }
    }

	const validRoles = ['admin','super-user','SEO'];

    if ( !validRoles.includes( session.user.role ) ) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
        }
    }
}

export default UsersPage;