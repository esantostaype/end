import { ShopLayout } from '../../layouts';
import { ProductList, Spinner } from '../../components';
import { useProducts } from '../../hooks';

const UnisexPage = () => {

	const { products, isLoading } = useProducts( '/products?gender=unisex' );

	return (
		<ShopLayout title={ 'Unisex | END.'} pageDescription={ 'Encuentra los mejores productos Unisex aquí'}>
			<h1>Unisex</h1>
			{
				isLoading
					? <Spinner/>
					: <ProductList products={ products }/>
			}
			
		</ShopLayout>
	)
}

export default UnisexPage