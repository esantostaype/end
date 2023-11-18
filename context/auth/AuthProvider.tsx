import { FC, useEffect, useReducer } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { AuthContext, authReducer } from '.';
import { IBillingAddress, IShippingAddress, IUser } from '../../interfaces';
import { endApi } from '../../api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
    children?: React.ReactNode
}

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

export const AuthProvider:FC<Props> = ({ children }) => {

    const [ state, dispatch ] = useReducer( authReducer, AUTH_INITIAL_STATE );

    const { data, status } = useSession();

    const router = useRouter();

    useEffect(() => {
        if ( status === 'authenticated' ) {
            console.log({user: data?.user})
            dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
        }
    }, [ status, data ]);

    // useEffect(() => {
    //     checkToken();
    // }, []);

    const checkToken = async() => {
        if (!Cookies.get( 'token' )){
            return;
        }
        try {
            const { data } = await endApi.get( 'users/validate-token' );
            const { token, user } = data;
            Cookies.set( 'token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove( 'token' );
        }
    }
    

    const loginUser = async( email: string, password: string ): Promise<boolean> => {
        try {
            const { data } = await endApi.post( '/users/login', { email, password } );
            const { token, user } = data;
            Cookies.set( 'token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }
    }

    const registerUser = async(
        name: string,
        firstName: string,
        lastName: string,
        birthDay: string,
        phone: string,
        email: string,
        password: string,
        billingAddress?: IBillingAddress,
        shippingAddress?: IShippingAddress,
    ): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await endApi.post( 'users/register', {
                name,
                firstName,
                lastName,
                birthDay,
                phone,
                email,
                password,
                billingAddress,
                shippingAddress
            } );
            const { token, user } = data;
            Cookies.set( 'token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }
        } catch (error) {
            if ( axios.isAxiosError( error ) ){
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: "Could not create user, try again."
            }
        }
    }

    const logout = () => {
        signOut();
        // Cookies.remove( 'cart' );
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            registerUser,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}