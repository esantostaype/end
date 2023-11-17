import { ShopLayout } from '../../layouts';
import { ProductList, Spinner } from '../../components';
import { useProducts } from '../../hooks';

const WomenPage = () => {

	const { products, isLoading } = useProducts( '/products?gender=women' );

	return (
		<ShopLayout title={ 'Women | END.'} pageDescription={ 'Encuentra los mejores productos de Mujeres aquí'}>
			<h1>Women</h1>
			{
				isLoading
					? <Spinner/>
					: <ProductList products={ products }/>
			}
			
		</ShopLayout>
	)
}

export default WomenPage