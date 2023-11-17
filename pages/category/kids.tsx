import { ShopLayout } from '../../layouts';
import { ProductList, Spinner } from '../../components';
import { useProducts } from '../../hooks';

const KidsPage = () => {

	const { products, isLoading } = useProducts( '/products?gender=kid' );

	return (
		<ShopLayout title={ 'Kids | END.'} pageDescription={ 'Encuentra los mejores productos de Niños aquí'}>
			<h1>Kids</h1>
			{
				isLoading
					? <Spinner/>
					: <ProductList products={ products }/>
			}
			
		</ShopLayout>
	)
}

export default KidsPage