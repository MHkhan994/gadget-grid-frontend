'use client';

import { useAppSelector } from '@/redux/hooks';
import { useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, X } from 'lucide-react';
import type { TProduct } from '@/types/product.interface';
import Markdown from 'react-markdown';

const ComparePage = () => {
    const { compareItems } = useAppSelector((s) => s.compare);

    // Combine all unique attributes from all products
    const combinedAttributes = useMemo(() => {
        const attributeMap = new Map<string, Set<string>>();

        compareItems.forEach((product) => {
            if (product.attributes) {
                product.attributes.forEach((attr) => {
                    if (!attributeMap.has(attr.name)) {
                        attributeMap.set(attr.name, new Set());
                    }
                    Object.keys(attr.fields).forEach((field) => {
                        attributeMap.get(attr.name)?.add(field);
                    });
                });
            }
        });

        // Convert to organized structure
        const organized: { [category: string]: string[] } = {};
        attributeMap.forEach((fields, category) => {
            organized[category] = Array.from(fields);
        });

        return organized;
    }, [compareItems]);

    const getAttributeValue = (
        product: TProduct,
        category: string,
        field: string,
    ): string => {
        const attribute = product.attributes?.find(
            (attr) => attr.name === category,
        );
        return attribute?.fields[field] || '-';
    };

    const calculateDiscountedPrice = (product: TProduct): number => {
        if (!product.discount) {
            return product.price;
        }

        if (product.discount.type === 'flat') {
            return product.price - product.discount.value;
        } else {
            return (
                product.price - (product.price * product.discount.value) / 100
            );
        }
    };

    const getAverageRating = (product: TProduct): number => {
        if (!product.reviews || product.reviews.length === 0) {
            return 0;
        }
        const sum = product.reviews.reduce(
            (acc, review) => acc + review.rating,
            0,
        );
        return sum / product.reviews.length;
    };

    if (compareItems.length === 0) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold mb-4'>
                        Product Comparison
                    </h1>
                    <p className='text-muted-foreground'>
                        No products selected for comparison.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-2xl font-bold'>Product Comparison</h1>
                <Badge variant='secondary'>
                    {compareItems.length} Products
                </Badge>
            </div>

            <div className='min-w-full'>
                <div
                    className='grid grid-cols-1 border sticky top-0 bg-background'
                    style={{
                        gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)`,
                    }}
                >
                    <div className='font-semibold text-lg flex items-center px-3'>
                        Products
                    </div>
                    {compareItems?.map((product) => (
                        <h2 className='border-r px-3 py-1' key={product._id}>
                            {product.name}
                        </h2>
                    ))}
                </div>

                <div>
                    <h2 className='text-lg font-semibold p-2 text-primary-white bg-primary-light'>
                        Product Information
                    </h2>
                    <div className='border overflow-hidden'>
                        {[
                            { label: 'Image', key: 'thumbnail' },
                            { label: 'Model', key: 'model' },
                            { label: 'Key Features', key: 'key_features' },
                            { label: 'Warranty', key: 'warranty' },
                            { label: 'Quantity Available', key: 'quantity' },
                            { label: 'Shipping', key: 'shipping' },
                            { label: 'Tax', key: 'tax' },
                        ].map((item, index) => (
                            <div
                                key={item.key}
                                className={`grid gap-4 ${index % 2 === 0 ? 'bg-foreground' : 'bg-background'}`}
                                style={{
                                    gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)`,
                                }}
                            >
                                <div className='p-3 font-medium text-sm border-r'>
                                    {item.label}
                                </div>
                                {compareItems.map((product) => (
                                    <div
                                        key={product._id}
                                        className='p-3 text-sm border-r last:border-r-0'
                                    >
                                        {item.key === 'warranty' ? (
                                            `${product.warranty.days} days${product.warranty.lifetime ? ' (Lifetime)' : ''}`
                                        ) : item.key === 'shipping' ? (
                                            product.shipping.free ? (
                                                'Free'
                                            ) : (
                                                `$${product.shipping.cost}`
                                            )
                                        ) : item.key === 'tax' ? (
                                            `${product.tax}%`
                                        ) : item.key === 'quantity' ? (
                                            `${product.quantity} in stock`
                                        ) : item.key === 'thumbnail' ? (
                                            <Image
                                                height={300}
                                                width={400}
                                                alt='image'
                                                src={(product as any)[item.key]}
                                            />
                                        ) : item.key === 'key_features' ? (
                                            <Markdown>
                                                {(product as any)[item.key]}
                                            </Markdown>
                                        ) : (
                                            (product as any)[item.key] || '-'
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Attributes Comparison Table */}
                {Object.entries(combinedAttributes).map(
                    ([category, fields]) => (
                        <div key={category} className=''>
                            <h2 className='text-lg p-2 font-semibold text-primary-white bg-primary-light capitalize'>
                                {category.replace(/([A-Z])/g, ' $1').trim()}
                            </h2>
                            <div className='border overflow-hidden'>
                                {fields.map((field, index) => (
                                    <div
                                        key={field}
                                        className={`grid gap-4 ${index % 2 === 0 ? 'bg-foreground' : 'bg-background'}`}
                                        style={{
                                            gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)`,
                                        }}
                                    >
                                        <div className='p-3 font-medium text-sm border-r'>
                                            {field
                                                .replace(/([A-Z])/g, ' $1')
                                                .trim()}
                                        </div>
                                        {compareItems.map((product) => (
                                            <div
                                                key={product._id}
                                                className='p-3 text-sm border-r last:border-r-0'
                                            >
                                                {getAttributeValue(
                                                    product,
                                                    category,
                                                    field,
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ),
                )}

                {/* Basic Product Info Section */}

                {/* Action Buttons */}
                <div
                    className='grid gap-4 mt-8'
                    style={{
                        gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)`,
                    }}
                >
                    <div></div>
                    {compareItems.map((product) => (
                        <div key={product._id} className='space-y-2'>
                            <Button className='w-full' size='sm'>
                                Add to Cart
                            </Button>
                            <Button
                                variant='outline'
                                className='w-full bg-transparent'
                                size='sm'
                            >
                                View Details
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComparePage;
