import ProductCard from '@/components/shared/Product/ProductCard';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { TPFilter, TProduct } from '@/types/product.interface';
import React from 'react';

const ProductByCategoryPage = async ({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | undefined }>;
}) => {
    const { slug } = await params;
    const query = await searchParams;
    const sort = query?.sort;
    // const filter =

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/by-category/${slug}`,
    );
    const data = await res.json();

    const filters: TPFilter[] = data?.data?.filters || [];
    const products: TProduct[] = data?.data?.products || [];

    return (
        <div className='grid grid-cols-5 gap-4 mt-2 my-container'>
            <div className='space-y-2'>
                {filters?.map((f) => (
                    <Card key={f?._id} className='rounded-md'>
                        <CardContent className='pt-3 p-3'>
                            <div>
                                <h3 className='capitalize font-semibold text-base pb-2'>
                                    {f?.title}
                                </h3>
                                <div className='space-y-1'>
                                    {f?.options?.map((op) => (
                                        <div
                                            className='flex justify-between items-center'
                                            key={op.optionId}
                                        >
                                            <h5 className='text-sm'>
                                                {op.value}
                                            </h5>
                                            <Checkbox />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className='grid xl:grid-cols-4 gap-4 col-span-4'>
                {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                ))}
            </div>
        </div>
    );
};

export default ProductByCategoryPage;
