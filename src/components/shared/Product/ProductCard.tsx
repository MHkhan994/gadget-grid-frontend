import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftRight, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TProduct, TReview } from '@/types/product.interface';
import { Badge } from '@/components/ui/badge';
import { isValidUrl } from '@/utils/common';
import ProductCardActions from './ProductCardActions';

export const calculateRating = (reviews?: TReview[]) => {
    const totalRating =
        reviews?.reduce((prev, current, total) => {
            return total + current.rating;
        }, 0) || 0;

    const rating =
        reviews && reviews.length > 0
            ? ((((reviews?.length || 0) + 1 || 0) / totalRating) * 100).toFixed(
                  1,
              )
            : 0;

    return rating;
};

export const calculateDiscountPrice = (
    price: number,
    discount: TProduct['discount'],
) => {
    let discountPrice = price;
    if (!discount) {
        return discountPrice;
    }

    if (discount.type === 'flat') {
        discountPrice = Number(price) - Number(discount.value);
    }

    if (discount.type === 'percent') {
        discountPrice = price - price * (discount.value / 100);
    }

    return discountPrice;
};

export default function ProductCard({ product }: { product: TProduct }) {
    const rating = calculateRating(product.reviews);
    const discountPrice = calculateDiscountPrice(
        product.price || 0,
        product.discount,
    );

    return (
        <Card className='group relative overflow-hidden bg-foreground transition-all hover:shadow-md h-fit'>
            <div className='relative aspect-square overflow-hidden'>
                {product.discount && (
                    <Badge className='absolute right-2 top-2 z-10 bg-green-500 text-pure-white'>
                        Save {(product.price - discountPrice).toFixed(0)} Taka
                    </Badge>
                )}
                <Image
                    src={
                        isValidUrl(product.thumbnail)
                            ? product.thumbnail
                            : '/product-placeholder.jpg'
                    }
                    alt={product?.name}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                />
            </div>
            <CardContent className='p-3'>
                <div className='mb-2 flex items-center'>
                    <div className='flex items-center'>
                        <Star className='h-4 w-4 fill-primary text-primary' />
                        <span className='ml-1 text-sm font-medium'>
                            {rating}
                        </span>
                    </div>
                    <span className='mx-1 text-muted-foreground'>•</span>
                    <span className='text-xs text-muted-foreground'>
                        {product.reviews?.length || 0} reviews
                    </span>
                </div>
                <Link href={`/product/${product.slug}`} className='block'>
                    <h3 className='line-clamp-2 text-sm font-medium leading-tight hover:text-primary-white hover:underline'>
                        {product.name}
                    </h3>
                </Link>

                <div className='py-2'>
                    <span className='font-bold text-primary-white text-sm'>
                        ৳{discountPrice.toLocaleString()}
                    </span>
                    {product.discount && (
                        <span className='ml-2 text-sm text-muted-foreground line-through'>
                            ৳{product.price.toLocaleString()}
                        </span>
                    )}
                </div>

                <ProductCardActions product={product} />
            </CardContent>
        </Card>
    );
}
