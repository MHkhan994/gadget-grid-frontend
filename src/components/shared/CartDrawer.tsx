'use client';
import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { ShoppingCart, Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import {
    setCartOpen,
    updateQuantity,
    removeFromCart,
} from '@/redux/reducers/cartReducer';

export type CartProduct = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
    slug: string;
    shipping: number;
    tax: number;
};

const CartDrawer = () => {
    const { cartItems, cartOpen } = useAppSelector((s) => s.cart);
    const dispatch = useDispatch();

    // Calculate totals
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const totalShipping = cartItems.reduce(
        (sum, item) => sum + item.shipping,
        0,
    );
    const totalTax = cartItems.reduce((sum, item) => sum + item.tax || 0, 0);
    const total = subtotal + totalShipping + totalTax;

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const totalItems = cartItems.length;

    return (
        <Sheet
            open={cartOpen}
            onOpenChange={(val) => dispatch(setCartOpen(val))}
        >
            <SheetTrigger asChild>
                <Button variant={'plain'} size='sm' className='relative'>
                    <ShoppingCart size={20} />
                    {totalItems > 0 && (
                        <Badge
                            variant='destructive'
                            className='absolute -top-1 right-0 size-4 rounded-full p-0 flex items-center justify-center text-xs'
                        >
                            {totalItems}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col p-0 w-full sm:max-w-sm'>
                <SheetHeader className='p-3 border-b'>
                    <SheetTitle className='flex items-center gap-2'>
                        <ShoppingCart size={20} />
                        My Cart ({totalItems}{' '}
                        {totalItems === 1 ? 'item' : 'items'})
                    </SheetTitle>
                </SheetHeader>

                {cartItems.length === 0 ? (
                    <div className='flex-1 flex flex-col items-center justify-center p-6 text-center'>
                        <div className='w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4'>
                            <ShoppingBag
                                size={32}
                                className='text-muted-foreground'
                            />
                        </div>
                        <h3 className='text-lg font-semibold mb-2'>
                            Your cart is empty
                        </h3>
                        <p className='text-muted-foreground mb-4'>
                            Add some products to get started
                        </p>
                        <Button onClick={() => dispatch(setCartOpen(false))}>
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className='flex-1 px-3'>
                            <div className='space-y-2'>
                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className='flex gap-4 p-2 border bg-foreground rounded-lg'
                                    >
                                        <div className='relative w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0'>
                                            <Image
                                                src={
                                                    item.thumbnail ||
                                                    '/placeholder.svg?height=64&width=64'
                                                }
                                                alt={item.name}
                                                fill
                                                className='object-cover'
                                            />
                                        </div>

                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-start justify-between gap-2'>
                                                <div className='flex-1 min-w-0'>
                                                    <h4 className='font-medium text-sm leading-tight line-clamp-2'>
                                                        {item.name}
                                                    </h4>
                                                    <p className='text-sm font-semibold text-primary mt-1'>
                                                        ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant='ghost'
                                                    size='sm'
                                                    className='h-8 w-8 p-0 text-muted-foreground hover:text-destructive'
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            item._id,
                                                        )
                                                    }
                                                >
                                                    <X size={14} />
                                                </Button>
                                            </div>

                                            <div className='flex items-center justify-between mt-2'>
                                                <div className='flex items-center border rounded-md'>
                                                    <Button
                                                        variant='ghost'
                                                        size='sm'
                                                        className='h-8 w-8 p-0'
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item._id,
                                                                item.quantity -
                                                                    1,
                                                            )
                                                        }
                                                    >
                                                        <Minus size={14} />
                                                    </Button>
                                                    <span className='px-3 py-1 text-sm font-medium min-w-[2rem] text-center'>
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant='ghost'
                                                        size='sm'
                                                        className='h-8 w-8 p-0'
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item._id,
                                                                item.quantity +
                                                                    1,
                                                            )
                                                        }
                                                    >
                                                        <Plus size={14} />
                                                    </Button>
                                                </div>
                                                <p className='text-sm font-semibold'>
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className='border-t bg-background p-3 space-y-2'>
                            <div className='space-y-2'>
                                <div className='flex justify-between text-sm'>
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between text-sm'>
                                    <span>Shipping</span>
                                    <span>${totalShipping.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between text-sm'>
                                    <span>Tax</span>
                                    <span>${totalTax.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className='flex justify-between font-semibold'>
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                className='w-full'
                                size='lg'
                                onClick={() => {
                                    // Handle checkout logic here
                                    console.log('Proceeding to checkout...');
                                }}
                            >
                                Proceed to Checkout
                            </Button>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default CartDrawer;
