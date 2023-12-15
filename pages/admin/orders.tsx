import NextLink from 'next/link';
import { IOrder } from '../../interfaces'
import { AdminLayout } from '../../layouts'
import { currency } from '../../utils';
import useSWR from 'swr';

const OrdersPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if ( !data && !error ) return (<></>);

	return (
		<AdminLayout title={ 'Orders | Admin - END.'}>
			<h1>Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th className='table__actions'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data!.map( ( order ) => (
                            <tr key={ order.orderId }>
                                <td>{ `# ${ order.orderId }` }</td>
                                <td>{ order.firstName } { order.lastName }</td>
                                <td>
                                    { order.isPaid ? 'Orden Pagada' : 'Orden sin Pagar' }
                                </td>
                                <td><strong>{ currency.format( order.total ) }</strong> for { order.numberOfItems } { order.numberOfItems > 1 ? 'products' : 'product' }</td>
                                <td>{ order.createdAt }</td>
                                <td className='table__actions'><NextLink href={`/admin/orders/${ order._id }`} className='ghost-button small'>View Order</NextLink></td>
                            </tr>
                        ) )
                    }
                </tbody>
            </table>
		</AdminLayout>
	)
}

export default OrdersPage;