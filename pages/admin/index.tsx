import useSWR from 'swr'
import { AdminLayout } from '../../layouts'
import { DashboardSummaryResponse } from '../../interfaces'
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000
	});

	if ( !error && !data ) {
		return <></>
	}

	if ( error ) {
		console.log( error );
		return <h1>Error al cargar la información</h1>
	}

	const {
		numberOfOrders,
		paidOrders,
		notPaidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithoutInventory,
		productsWithLowInventory,
	} = data!;

	return (
		<AdminLayout title={ 'Dashboard | Admin - END.'}>
			<h1>Dashboard</h1>
			<div className='cards'>
				<div className='card dashboard-summary'>
					<h2 className='dashboard-summary__count'>{ numberOfOrders }</h2>
					<h3 className='dashboard-summary__title'>Number of Orders</h3>
				</div>
				<div className='card dashboard-summary'>
					<h2 className='dashboard-summary__count'>{ paidOrders }</h2>
					<h3 className='dashboard-summary__title'>Paid Orders</h3>
				</div>
				<div className='card dashboard-summary'>
					<h2 className='dashboard-summary__count'>{ notPaidOrders }</h2>
					<h3 className='dashboard-summary__title'>Not Paid Orders</h3>
				</div>
				<div className='card dashboard-summary'>
					<h2 className='dashboard-summary__count'>{ numberOfClients }</h2>
					<h3 className='dashboard-summary__title'>Clients</h3>
				</div>
				<div className='card dashboard-summary'>
					<h2 className='dashboard-summary__count'>{ numberOfProducts }</h2>
					<h3 className='dashboard-summary__title'>Products</h3>
				</div>
				<div className='card dashboard-summary'>
					<h2 className='dashboard-summary__count'>{ productsWithoutInventory }</h2>
					<h3 className='dashboard-summary__title'>Without Inventory</h3>
				</div>
				<div className='card dashboard-summary'>
					<h2 className='dashboard-summary__count'>{ productsWithLowInventory }</h2>
					<h3 className='dashboard-summary__title'>Low Inventory</h3>
				</div>
			</div>
		</AdminLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session:any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: `/login?p=/admin`,
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

export default DashboardPage