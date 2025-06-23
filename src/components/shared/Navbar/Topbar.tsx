import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ArrowRightLeft,
    Computer,
    Moon,
    Search,
    ShoppingCart,
    Sun,
    User,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import MobileCategoryMenu from './MobileCategoryMenu';
import ThemeButton from './ThemeButton';

const Topbar = () => {
    return (
        <div className='w-full max-w-[1920px] mx-auto px-2 py-3 bg-background flex justify-between items-center'>
            <MobileCategoryMenu />
            <h2 className='text-dark-gray'>Gadget Grid</h2>
            <div className='text-dark-gray  w-full max-w-96 ps-2 gap-2 xl:flex hidden border border-forground-border rounded-md'>
                <Input
                    className='border-none w-full p-0'
                    placeholder='Search Product/Category/Brand'
                />
                <Button className='rounded-none rounded-r-md'>
                    <Search size={20} />
                </Button>
            </div>
            <div className='flex items-center'>
                <Button variant={'primary_light'} className='mr-2'>
                    <Link
                        href={'/pc-builder'}
                        className='flex gap-1 items-center'
                    >
                        <Computer size={18} />
                        PC Builder
                    </Link>
                </Button>
                <Button
                    tooltip='Compare'
                    variant={'plain'}
                    className='text-dark-gray'
                >
                    <ArrowRightLeft size={20} />
                </Button>
                <Button
                    variant={'plain'}
                    tooltip='My Cart'
                    className='text-dark-gray'
                >
                    <ShoppingCart size={20} />
                </Button>
                <Button
                    variant={'plain'}
                    tooltip='My Profile'
                    className='text-dark-gray'
                >
                    <User size={20} />
                </Button>
                <ThemeButton />
            </div>
        </div>
    );
};

export default Topbar;
