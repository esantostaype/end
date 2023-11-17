import { NextPage, GetServerSideProps } from 'next';
import { ShopLayout } from '../../layouts';
import { ProductList } from '../../components';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
    products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {

	return (
		<ShopLayout title={ 'Style. Sneakers. Culture. Community. | END.'} pageDescription={ 'Encuentra los mejores productos aquí'}>
			<h1>Resultados de búsqueda</h1>
			<ProductList products={ products }/>			
		</ShopLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string };

    if( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm( query );

    return {
        props: {
            products
        }
    }
}

export default SearchPage