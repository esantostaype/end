import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { IOrder } from '../../../interfaces'
import { AdminLayout } from '../../../layouts'
import { currency } from '../../../utils';
import useSWR from 'swr';
import { dbOrders } from '../../../database';
import { CartList, OrderSummary } from '../../../components';

interface Props {
    order: IOrder;
}

const OrderDetail: NextPage<Props> = ({ order }) => {

	return (
		<AdminLayout  title={ `Order N° ${ order.orderId } | END.`}>
			<h1>Order N°: { order.orderId }</h1>
            <div className="checkout-page">
                <div className="checkout-page__main-content">
                    <CartList products={ order.orderItems } />
                </div>
                <div className='checkout-page__sidebar'>
                    <h3 className='checkout-page__sidebar__title'>Order Totals</h3>
                    <OrderSummary order={ order } />
                    <h3 className='checkout-page__sidebar__title'>Billing Details</h3>
                    <div className='checkout-page__sidebar__address'>
                        <p><strong>Full Name: </strong>{ order.firstName } { order.lastName }</p>
                        <p><strong>Email: </strong>{ order.email }</p>
                        <p><strong>Phone: </strong>{ order.phone }</p>
                        <p><strong>Address:</strong> { order.billingAddress?.country }, { order.billingAddress?.address }<br/>
                        { order.billingAddress?.address2
                            ?<>
                            { order.billingAddress?.address2 }<br/>
                            </>
                            : ''
                        }
                        { order.billingAddress?.city }, { ` ${order.billingAddress?.zipCode}` }
                        </p>
                    </div>
                    <h3 className='checkout-page__sidebar__title'>Shipping Address</h3>
                    <div className='checkout-page__sidebar__address'>
                        <p>{ order.shippingAddress?.country }, { order.shippingAddress?.address }<br/>
                        { order.shippingAddress?.address2
                            ?<>
                            { order.shippingAddress?.address2 }<br/>
                            </>
                            : ''
                        }
                        { order.shippingAddress?.city }, { ` ${order.shippingAddress?.zipCode}` }
                        </p>
                    </div>
                </div>
            </div>
		</AdminLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;

    const order = await dbOrders.getOrderById( id.toString() );

    if ( !order ) {
        return {
            redirect: {
                destination: '/admin/orders',
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

export default OrderDetail;