import { useContext, useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ItemCounter, ProductSlideshow, SizeSelector } from '../../components';
import { CartContext } from '../../context';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { ShopLayout } from '../../layouts'
import { dbProducts } from '../../database';
import { enqueueSnackbar } from 'notistack';

interface Props {
    product: IProduct
}

const ProductPage:NextPage<Props> = ({ product }) => {

    const router = useRouter();

    const { addProductToCart, toggleSideCart } = useContext( CartContext );

    const [ isSizeSelected, setIsSizeSelected ] = useState( true );    

    const [ tempCartProduct, setTempCartProduct ] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        inStock: product.inStock,
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    })

    const selectedSize = ( size: ISize ) => {
        setTempCartProduct( currentProduct => ({
            ...currentProduct,
            size
        }));
        setIsSizeSelected( true );
    }

    const updatedQuantity = ( quantity: number ) => {
        setTempCartProduct( currentProduct => ({
            ...currentProduct,
            quantity
        }));
    }

    const onAddProduct = () => {
        if ( !tempCartProduct.size ) {
            setIsSizeSelected( false );
        } else {
            setIsSizeSelected( true );
            addProductToCart( tempCartProduct );
            toggleSideCart();
            setTempCartProduct(( currentProduct ) => ({
                ...currentProduct,
                size: undefined,
                quantity: 1,
            }));

        }
    }

    // const { products: product, isLoading } = useProducts(`/products/${ router.query.slug }`);

    return (
		<ShopLayout title={ product.title } pageDescription={ product.description }>
            <div className="product__content">
                <div className="product__image fadeIn">
                    <ProductSlideshow images={ product.images } title={ product.title } />
                </div>
                <div className="product__caption">
                    <h1 className="product__title">{ product.title }</h1>
                    <h2 className="product__price">Price: ${ product.price }</h2>
                    <div className="product__quantity">
                        <h4 className="product__subtitle">Quantity</h4>
                        <ItemCounter
                            currentValue={ tempCartProduct.quantity }
                            onUpdatedQuantity={ updatedQuantity }
                            maxValue={ product.inStock > 10 ? 10: product.inStock }
                        />
                    </div>
                    <div className="product__sizes">
                        <h4 className="product__subtitle">Select Size</h4>
                        <SizeSelector
                            selectedSize={ tempCartProduct.size }
                            sizes={ product.sizes }
                            onSelectedSize={ selectedSize }
                        />
                        {!isSizeSelected && (
                            <p className="message error">Please select a size before adding to cart.</p>
                        )}
                    </div>
                    <div className="product__addCart">
                    {
                        ( product.inStock === 0 )
                        ? (
                            <span className="main-button product__outStock">Out-Stock</span>
                        )
                        : (
                            <button className="main-button" onClick={ onAddProduct }>Add to Cart</button>
                        )
                    } 
                    </div>                   
                    <div className="product__description">
                        <h4 className="product__subtitle">Description</h4>
                        { product.description }
                    </div>
                </div>
            </div>
		</ShopLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async( ctx ) => {
    
    const productsSlugs = await dbProducts.getAllProductSlugs();

    return {
        paths: productsSlugs.map( ({ slug }) => ({
            params: {
                slug
            }
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async({ params }) => {
    
    const { slug = '' } = params as { slug: string };
    const product = await dbProducts.getProductBySlug( slug );

    if( !product ){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24
    }
}

// export const getServerSideProps: GetServerSideProps = async({ params }) => {
    
//     const { slug } = params as { slug: string };

//     const product = await dbProducts.getProductBySlug( slug );

//     if( !product ){
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
//             product
//         }
//     }
// }

export default ProductPage