import { TProduct } from '@/types/product.interface';
import React from 'react';
import ProductCard from '../shared/Product/ProductCard';

const FeaturedProducts = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-featured`,
    );
    const data = await res.json();

    const products: TProduct[] = data?.data || [];

    return (
        <div className='my-container'>
            <h2 className='text-2xl font-semibold text-black text-center pb-4'>
                Featured Products
            </h2>
            <div className='grid xl:grid-cols-6 gap-4'>
                {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;
