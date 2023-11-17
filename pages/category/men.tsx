import { ShopLayout } from '../../layouts';
import { ProductList, Spinner } from '../../components';
import { useProducts } from '../../hooks';

const MenPage = () => {

	const { products, isLoading } = useProducts( '/products?gender=men' );

	return (
		<ShopLayout title={ 'Men | END.'} pageDescription={ 'Encuentra los mejores productos de Hombres aquí'}>
			<h1>Men</h1>
			{
				isLoading
					? <Spinner/>
					: <ProductList products={ products }/>
			}
			
		</ShopLayout>
	)
}

export default MenPage