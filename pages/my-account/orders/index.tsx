import { NextPage } from 'next';
import NextLink from 'next/link';
import { MyAccountLayout } from '../../../layouts'
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { currency } from '../../../utils';

interface Props {
    orders: IOrder[]
}

const OrdersPage: NextPage<Props> = ({ orders }) => {

    return (
        <MyAccountLayout title={ `My Orders`} pageDescription={ `My Orders`} size="large">
            <h1>My Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th className='table__actions'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map( ( order ) => (
                            <tr key={ order.orderId }>
                                <td>{ `# ${ order.orderId }` }</td>
                                <td>{ order.createdAt }</td>
                                <td>
                                    { order.isPaid ? 'Orden Pagada' : 'Orden sin Pagar' }
                                </td>
                                <td><strong>{ currency.format( order.total ) }</strong> for { order.numberOfItems } { order.numberOfItems > 1 ? 'products' : 'product' }</td>
                                <td className='table__actions'><NextLink href={`/my-account/orders/${ order._id }`} className='ghost-button small'>View Order</NextLink></td>
                            </tr>
                        ) )
                    }
                </tbody>
            </table>
        </MyAccountLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session:any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: `/login?p=/my-account/orders`,
                permanent: false,
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser( session.user._id );

    return {
        props: {
            orders
        }
    }
}

export default OrdersPage;