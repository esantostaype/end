import { GetServerSideProps, NextPage } from 'next';
import { dbOrders } from '../../database';
import { IOrder } from "../../interfaces";
import { ShopLayout } from '../../layouts';
import { getSession } from 'next-auth/react';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    console.log({ order })

    return (
        <ShopLayout title={ `Order N° ${ order._id } | END.`} pageDescription={ `Order N° ${ order._id } Details`} size="medium">
            <h1>Order N°: { order._id }</h1>
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;
    const session:any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: `/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );

    if ( !order ) {
        return {
            redirect: {
                destination: '/orders',
                permanent: false,
            }
        }
    }

    if ( order.user !== session.user._id ) {
        return {
            redirect: {
                destination: '/orders',
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}


export default OrderPage;