'use client';
import { CartProduct, TProduct } from '@/types/product.interface';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/reducers/cartReducer';

const ProductActions = ({
    product,
    discountPrice,
}: {
    product: TProduct;
    discountPrice: number;
}) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useAppDispatch();

    const handleQuantity = (type: 'minus' | 'plus') => {
        if (type === 'minus' && quantity !== 1) {
            setQuantity((prev) => prev - 1);
        } else if (type === 'plus' && quantity < product.quantity) {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleAddToCart = () => {
        const cartProduct: CartProduct = {
            _id: product?._id,
            name: product?.name,
            price: discountPrice,
            slug: product?.slug,
            quantity: quantity,
            shipping: product?.shipping?.free ? 0 : product.shipping.cost,
            thumbnail: product?.thumbnail,
            tax: product?.tax,
        };

        dispatch(addToCart({ item: cartProduct, openCart: true }));
    };

    return (
        <div className='space-y-4'>
            <div className='grid gap-2'>
                <label htmlFor='quantity'>Quantity</label>
                <div className='flex w-32 items-center rounded-md bg-foreground'>
                    <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8 rounded-r-none'
                        onClick={() => handleQuantity('minus')}
                        disabled={quantity <= 1 || product.quantity === 0}
                    >
                        <span>-</span>
                        <span className='sr-only'>Decrease quantity</span>
                    </Button>
                    <Input
                        id='quantity'
                        type='number'
                        min='1'
                        max={quantity}
                        defaultValue='1'
                        value={quantity}
                        className='h-8 rounded-none text-primary-white border-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                    />
                    <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8 rounded-l-none'
                        onClick={() => handleQuantity('plus')}
                        disabled={
                            quantity >= product.quantity ||
                            product.quantity === 0
                        }
                    >
                        <span>+</span>
                        <span className='sr-only'>Increase quantity</span>
                    </Button>
                </div>
            </div>

            <div className='flex flex-col gap-2 sm:flex-row'>
                {product.quantity !== 0 && (
                    <Button
                        onClick={handleAddToCart}
                        className='md:flex-1'
                        size='lg'
                    >
                        <ShoppingCart className='mr-2 h-4 w-4' />
                        Add to Cart
                    </Button>
                )}
                <Button variant='outline' size='lg'>
                    <Heart className='mr-2 h-4 w-4' />
                    Add to Wishlist
                </Button>
            </div>
        </div>
    );
};

export default ProductActions;
