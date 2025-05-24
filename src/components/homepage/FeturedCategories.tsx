import { TCategory } from '@/types/category.interface';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import Link from 'next/link';

const FeturedCategories = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-featured`,
    );
    const data = await res.json();

    const categories: TCategory[] = data?.data || [];

    return (
        <div className='my-container'>
            <h2 className='text-2xl font-semibold text-black text-center pb-4'>
                Featured Categories
            </h2>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 3xl:grid-cols-10 gap-2'>
                {categories?.map((cat) => (
                    <Card
                        key={cat._id}
                        className='h-36 w-full bg-foreground hover:shadow-lg hover:bg-primary-light'
                    >
                        <Link href={cat.slug}>
                            <CardContent className='flex items-center justify-between pt-6 gap-2 flex-col h-full'>
                                <Image
                                    src={
                                        cat.image || '/category-placeholder.png'
                                    }
                                    alt={cat.name}
                                    height={60}
                                    width={60}
                                />
                                <h2 className='text-center text-sm font-medium text-black'>
                                    {cat.name}
                                </h2>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FeturedCategories;
