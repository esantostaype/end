import NextLink from 'next/link';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image'
import { HomeLayout } from '../layouts';
import { ProductList, Spinner } from '../components';
import { useProducts } from '../hooks';

const HomePage = () => {

	const { products, isLoading } = useProducts( '/products' );

	return (
		<HomeLayout title={ 'Style. Sneakers. Culture. Community. | END.'} pageDescription={ 'Encuentra los mejores productos aquí'}>
			<section className='hero'>
				<Splide
					options={ {
						autoplay: true,
						interval: 5000,
						pauseOnFocus: true,
						pauseOnHover: true,
						type: 'loop',
						arrowPath: 'M29.1,18.1 10.9,0 9.1,1.9 27.2,20 9.1,38.1 10.9,40 29.1,21.9 30.9,20z',
					} }
				>
					<SplideSlide>
						<div className='hero__caption'>
							<div className='hero__caption__content'>
								<h2 className='hero__title'>Norse Projects</h2>
								<p>The Latest Drop.</p>
							</div>
						</div>
						<Image
							src={ "/images/hero/hero-01.jpg" }
							alt={ "Hero 01" }
							width={ 1920 }
							height={ 1080 }
							loading = 'lazy'
						/>
					</SplideSlide>
					<SplideSlide>
						<div className='hero__caption'>
							<div className='hero__caption__content'>
								<h2 className='hero__title'>Sacai</h2>
								<p>New In.</p>
							</div>
						</div>
						<Image
							src={ "/images/hero/hero-02.jpg" }
							alt={ "Hero 02" }
							width={ 1920 }
							height={ 1080 }
							loading = 'lazy'
						/>
					</SplideSlide>
					<SplideSlide>
						<div className='hero__caption'>
							<div className='hero__caption__content'>
								<h2 className='hero__title'>And Waider X Maison Kitsumé</h2>
								<p>Just In.</p>
							</div>
						</div>
						<Image
							src={ "/images/hero/hero-03.jpg" }
							alt={ "Hero 03" }
							width={ 1920 }
							height={ 1080 }
							loading = 'lazy'
						/>
					</SplideSlide>
				</Splide>
			</section>
			<section className='home__content'>
				<section className='latest block-section'>
					<h3 className='block-section__title'>Latest Products</h3>
					{
						isLoading
							? <Spinner/>
							: <ProductList products={ products } limit={ 10 } />
					}
				</section>
				<section className='categories block-section'>
					<ul className='categories__list'>
						<li className='category__item'>
							<NextLink href='/category/men'>
								<figure>
									<Image
										src={ "/images/men.jpg" }
										alt={ "Men" }
										width={ 360 }
										height={ 360 }
										loading = 'lazy'
									/>
								</figure>
								<h2 className='category__item__title'>Men</h2>
							</NextLink>
						</li>
						<li className='category__item'>
							<NextLink href='/category/women'>
								<figure>
									<Image
										src={ "/images/women.jpg" }
										alt={ "Men" }
										width={ 360 }
										height={ 360 }
										loading = 'lazy'
									/>
								</figure>
								<h2 className='category__item__title'>Women</h2>
							</NextLink>
						</li>
						<li className='category__item'>
							<NextLink href='/category/kids'>
								<figure>
									<Image
										src={ "/images/kids.jpg" }
										alt={ "Men" }
										width={ 360 }
										height={ 360 }
										loading = 'lazy'
									/>
								</figure>
								<h2 className='category__item__title'>Kids</h2>
							</NextLink>
						</li>
						<li className='category__item'>
							<NextLink href='/category/unisex'>
								<figure>
									<Image
										src={ "/images/unisex.jpg" }
										alt={ "Men" }
										width={ 360 }
										height={ 360 }
										loading = 'lazy'
									/>
								</figure>
								<h2 className='category__item__title'>Unisex</h2>
							</NextLink>
						</li>
					</ul>
				</section>
			</section>
			
		</HomeLayout>
	)
}

export default HomePage