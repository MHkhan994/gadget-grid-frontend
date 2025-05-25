import FilterCard from '@/components/category/FilterCard';
import ProductCard from '@/components/shared/Product/ProductCard';
import { Card, CardContent } from '@/components/ui/card';
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

    // Extract filter parameters
    const extractFilters = (searchParams: {
        [key: string]: string | undefined;
    }) => {
        const filters: { [key: string]: number[] } = {};

        Object.entries(searchParams).forEach(([key, value]) => {
            // Check if key starts with 'ff' (filter parameter)
            if (key.startsWith('ff') && value) {
                const filterId = key.substring(2); // Remove 'ff' prefix
                const optionIds = value.split(',').map(Number).filter(Boolean);
                if (optionIds.length > 0) {
                    filters[filterId] = optionIds;
                }
            }
        });

        return filters;
    };

    const activeFilters = extractFilters(query || {});

    // Build API URL with filters
    const buildApiUrl = (
        slug: string,
        filters: { [key: string]: number[] },
        sort?: string,
    ) => {
        const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/by-category/${slug}`;
        const params = new URLSearchParams();

        // Add filters to query params - this will create the array format your backend expects
        Object.entries(filters).forEach(([filterId, optionIds]) => {
            params.append('filter', `${filterId}:${optionIds.join(',')}`);
        });

        // Add sort if present
        if (sort) {
            params.append('sort', sort);
        }

        return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    };

    const apiUrl = buildApiUrl(slug, activeFilters, sort);

    const res = await fetch(apiUrl);
    const data = await res.json();

    const filters: TPFilter[] = data?.data?.filters || [];
    const products: TProduct[] = data?.data?.products || [];

    return (
        <div className='grid grid-cols-5 gap-4 mt-2 my-container'>
            <div className='space-y-2'>
                {filters?.map((f) => (
                    <Card key={f?._id} className='rounded-md'>
                        <CardContent className='pt-3 p-3'>
                            <FilterCard filter={f} />
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
