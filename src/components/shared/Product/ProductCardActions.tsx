'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCompare } from '@/redux/reducers/compareReducer';
import { TProduct } from '@/types/product.interface';
import { ArrowLeftRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

const ProductCardActions = ({ product }: { product: TProduct }) => {
    const { compareItems } = useAppSelector((s) => s.compare);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const handleAddToCompare = () => {
        if (compareItems.length >= 4) {
            toast.warning(
                'You already have 4 products in compare. Please remove some to add new',
            );
        } else {
            dispatch(addToCompare(product));
            setOpen(true);
        }
    };

    return (
        <div className='w-full flex justify-between'>
            <Button tooltip='Add to Cart' variant='primary_light'>
                <ShoppingCart className='h-4 w-4' />
                <span>Buy Now</span>
            </Button>
            <Button
                onClick={handleAddToCompare}
                tooltip='Add to Compare'
                size='sm'
                variant='outline'
                className='size-9 p-0'
            >
                <ArrowLeftRight className='h-4 w-4' />
                <span className='sr-only'>Add to compare</span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='max-w-sm'>
                    <h2>
                        Successfully added{' '}
                        <span className='italic text-primary-white'>
                            {product.name}
                        </span>{' '}
                        to compare
                    </h2>
                    <Link href={'/compare'}>
                        <Button>Go to Compare</Button>
                    </Link>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductCardActions;
