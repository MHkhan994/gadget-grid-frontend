import {
    calculateDiscountPrice,
    calculateRating,
} from '@/components/shared/Product/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TProduct } from '@/types/product.interface';
import { ChevronRight, Heart, ShoppingCart, Star, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Markdown from 'react-markdown';

const ProductPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-single/${slug}`,
    );
    const data = await res.json();

    const product: TProduct = data?.data;

    const rating = calculateRating(product.reviews);
    const discountPrice = calculateDiscountPrice(
        product.price || 0,
        product.discount,
    );

    return (
        <div className='my-container my-3'>
            {/* Breadcrumbs */}
            <nav className='mb-4 flex items-center text-sm text-muted-foreground'>
                <Link href='/' className='hover:text-foreground'>
                    Home
                </Link>
                <ChevronRight className='mx-1 h-4 w-4' />
                <Link href='/components' className='hover:text-foreground'>
                    Components
                </Link>
                <ChevronRight className='mx-1 h-4 w-4' />
                <Link
                    href='/components/processors'
                    className='hover:text-foreground'
                >
                    Processors
                </Link>
                <ChevronRight className='mx-1 h-4 w-4' />
                <span className='text-foreground'>{product.name}</span>
            </nav>

            {/* Product Details */}
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-2'>
                {/* Product Images */}
                <div className=''>
                    <div className='grid gap-4 md:grid-cols-2'>
                        <div className='order-last flex gap-2 overflow-x-auto md:order-first md:flex-col'>
                            {product.gallery?.map((image, index) => (
                                <div
                                    key={index}
                                    className='relative aspect-square h-20 w-20 cursor-pointer overflow-hidden rounded-md border bg-muted hover:bg-muted/80'
                                >
                                    <Image
                                        src={image || '/placeholder.svg'}
                                        alt={`${product.name} - Image ${index + 1}`}
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                            ))}
                        </div>
                        <div className=''>
                            <div className='relative aspect-square overflow-hidden rounded-lg bg-muted'>
                                <Image
                                    src={
                                        product.thumbnail ||
                                        '/product-placeholder.jpg'
                                    }
                                    alt={product.name}
                                    fill
                                    className='object-contain'
                                />
                                {/* {product.discount > 0 && (
                                    <Badge className="absolute right-2 top-2" variant="destructive">
                                        -{product.discount}%
                                    </Badge>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className='flex flex-col gap-4'>
                    <div>
                        <h1 className='text-2xl font-bold md:text-3xl'>
                            {product.name}
                        </h1>
                        <div className='mt-2 flex items-center gap-2'>
                            <div className='flex'>
                                {product.reviews?.map((review, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < Math.floor(review.rating)
                                                ? 'fill-primary text-primary'
                                                : 'fill-muted text-muted'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className='text-sm font-medium'>
                                {rating}
                            </span>
                            <span className='text-sm text-muted-foreground'>
                                ({product?.reviews?.length} reviews)
                            </span>
                        </div>
                    </div>

                    <div className='flex items-baseline gap-2'>
                        <span className='text-3xl font-bold'>
                            ৳{discountPrice}
                        </span>
                        {product.discount && (
                            <span className='text-lg text-muted-foreground line-through'>
                                ৳{product.price.toLocaleString()}
                            </span>
                        )}
                    </div>

                    <Separator />

                    <div className='space-y-4'>
                        <div className='flex items-center gap-2 text-sm'>
                            <div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                >
                                    <polyline points='20 6 9 17 4 12' />
                                </svg>
                            </div>
                            <span className='font-medium text-green-700'>
                                In Stock
                            </span>
                            <span className='text-muted-foreground'>
                                ({product.quantity} available)
                            </span>
                        </div>

                        <div className='flex items-center gap-2 text-sm'>
                            <Truck className='h-4 w-4 text-muted-foreground' />
                            <span>Free shipping on orders over ৳10,000</span>
                        </div>

                        <div className='grid gap-2'>
                            <label htmlFor='quantity'>Quantity</label>
                            <div className='flex w-32 items-center'>
                                <Button
                                    variant='outline'
                                    size='icon'
                                    className='h-8 w-8 rounded-r-none'
                                >
                                    <span>-</span>
                                    <span className='sr-only'>
                                        Decrease quantity
                                    </span>
                                </Button>
                                <Input
                                    id='quantity'
                                    type='number'
                                    min='1'
                                    max={product.quantity}
                                    defaultValue='1'
                                    className='h-8 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                                />
                                <Button
                                    variant='outline'
                                    size='icon'
                                    className='h-8 w-8 rounded-l-none'
                                >
                                    <span>+</span>
                                    <span className='sr-only'>
                                        Increase quantity
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 sm:flex-row'>
                            <Button className='flex-1' size='lg'>
                                <ShoppingCart className='mr-2 h-4 w-4' />
                                Add to Cart
                            </Button>
                            <Button variant='outline' size='lg'>
                                <Heart className='mr-2 h-4 w-4' />
                                Add to Wishlist
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    <div className='space-y-2'>
                        <h3 className='font-medium'>Key Features</h3>
                        <Markdown>{product.key_features}</Markdown>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className='mt-10'>
                <Tabs defaultValue='specifications'>
                    <TabsList className='w-full justify-start'>
                        <TabsTrigger value='specifications'>
                            Specifications
                        </TabsTrigger>
                        <TabsTrigger value='description'>
                            Description
                        </TabsTrigger>
                        <TabsTrigger value='reviews'>Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value='specifications'
                        className='mt-4 bg-foreground'
                    >
                        <div className='rounded-lg border space-y-2 p-2'>
                            {product.attributes?.map((attr, i) => (
                                <div key={i}>
                                    <h2 className='py-1 px-2 rounded-md bg-primary-light font-semibold text-lg'>
                                        {attr?.name}
                                    </h2>
                                    <div className='space-y-2 mt-2 px-2'>
                                        {Object.entries(attr.fields).map(
                                            ([key, value], i) => (
                                                <div
                                                    key={i}
                                                    className='grid items-center grid-cols-[2fr_4fr] gap-3'
                                                >
                                                    <div className='flex justify-between w-full text-sm text-dark-gray'>
                                                        <h2>{key}</h2> :
                                                    </div>
                                                    <h2 className='text-gray text-sm'>
                                                        {value || 'N/A'}
                                                    </h2>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value='description' className='mt-4'>
                        <div className='prose max-w-none'>
                            <Markdown>{product?.description}</Markdown>
                        </div>
                    </TabsContent>
                    <TabsContent value='reviews' className='mt-4'>
                        <div className='flex flex-col gap-6'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h3 className='text-lg font-medium'>
                                        Customer Reviews
                                    </h3>
                                    <div className='flex items-center gap-2'>
                                        <div className='flex'>
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${
                                                            i < Number(rating)
                                                                ? 'fill-primary text-primary'
                                                                : 'fill-muted text-muted'
                                                        }`}
                                                    />
                                                ),
                                            )}
                                        </div>
                                        <span className='text-sm font-medium'>
                                            Based on {product?.reviews?.length}{' '}
                                            reviews
                                        </span>
                                    </div>
                                </div>
                                <Button>Write a Review</Button>
                            </div>

                            <div className='grid gap-4'>
                                {/* Sample reviews - in a real app, these would be fetched from a database */}
                                <div className='rounded-lg border p-4'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <div className='h-10 w-10 rounded-full bg-muted'></div>
                                            <div>
                                                <div className='font-medium'>
                                                    John Doe
                                                </div>
                                                <div className='text-xs text-muted-foreground'>
                                                    Verified Purchase
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${i < 5 ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <h4 className='text-sm font-medium'>
                                            Excellent processor for the price
                                        </h4>
                                        <p className='mt-1 text-sm text-muted-foreground'>
                                            I&apos;ve been using this processor
                                            for a month now and I&apos;m very
                                            impressed with its performance. It
                                            handles all my gaming needs without
                                            any issues and the integrated
                                            graphics are surprisingly good.
                                        </p>
                                    </div>
                                    <div className='mt-2 text-xs text-muted-foreground'>
                                        Posted on May 10, 2025
                                    </div>
                                </div>

                                <div className='rounded-lg border p-4'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <div className='h-10 w-10 rounded-full bg-muted'></div>
                                            <div>
                                                <div className='font-medium'>
                                                    Jane Smith
                                                </div>
                                                <div className='text-xs text-muted-foreground'>
                                                    Verified Purchase
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${i < 4 ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <h4 className='text-sm font-medium'>
                                            Great value for money
                                        </h4>
                                        <p className='mt-1 text-sm text-muted-foreground'>
                                            This processor offers excellent
                                            performance for its price point. The
                                            integrated graphics are good enough
                                            for casual gaming, and it handles
                                            productivity tasks with ease. Highly
                                            recommended for budget builds.
                                        </p>
                                    </div>
                                    <div className='mt-2 text-xs text-muted-foreground'>
                                        Posted on April 28, 2025
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Related Products */}
            <section className='mt-12'>
                <h2 className='mb-6 text-2xl font-bold'>Related Products</h2>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'></div>
            </section>
        </div>
    );
};

export default ProductPage;
