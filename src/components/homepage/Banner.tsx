import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

type TBanner = {
    id: 'gridSlider';
    active: boolean;
    data: {
        sliders: {
            content: string;
            link: string;
        }[];
        right_top: {
            content: string;
            link: string;
        };
        right_bottom: {
            content: string;
            link: string;
        };
    };
};

const Banner = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/banner/get-banner/gridSlider`,
    );
    const data = await res.json();
    const banner: TBanner = data?.data;
    return (
        <div className='lg:grid grid-cols-[5fr_2fr] gap-2 mt-2 my-container'>
            <div>
                <Carousel className='w-full'>
                    <CarouselContent>
                        {banner?.data?.sliders?.map((slider, index) => (
                            <CarouselItem key={index}>
                                <div className='p-1'>
                                    <Link href={slider?.link}>
                                        <Image
                                            height={500}
                                            width={700}
                                            src={slider?.content}
                                            alt={slider.link}
                                            className='w-full h-full max-h-[550px]'
                                        />
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className='flex flex-col gap-2 max-h-[550px]'>
                <Link href={banner?.data?.right_top?.link} className='h-full'>
                    <Image
                        height={500}
                        width={700}
                        src={banner?.data?.right_top?.content}
                        alt={banner?.data?.right_top?.link}
                        className='h-full w-full object-cover'
                    />
                </Link>
                <Link
                    href={banner?.data?.right_bottom?.link}
                    className='h-full'
                >
                    <Image
                        height={500}
                        width={700}
                        src={banner?.data?.right_bottom?.content}
                        alt={banner?.data?.right_bottom?.link}
                        className='h-full w-full object-cover'
                    />
                </Link>
            </div>
        </div>
    );
};

export default Banner;
