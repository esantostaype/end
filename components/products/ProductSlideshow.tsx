import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image'
import { FC } from 'react';

interface Props {
    images: string[];
    title: string;
}

export const ProductSlideshow: FC<Props> = ({ images, title }) => {
    return (
        <>
        <Splide
            options={ {
                autoplay: true,
                interval: 3000,
                pauseOnFocus: true,
                pauseOnHover: true,
                type: 'loop',
            } }
        >
            {
                images.map( ( image, index ) => {
                    return (
                        <SplideSlide key={ image }>
                            <Image
                                src={ `/products/${ image }` }
                                alt={ `${ title } ${ index + 1}` }
                                width={ 1080 }
                                height={ 1080 }
                                loading = 'lazy'
                            />
                        </SplideSlide>
                    )
                })
            }
        </Splide>
        </>
    )
}