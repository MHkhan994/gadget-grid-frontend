'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Moon, ShoppingCart, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

const Topbar = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className='w-full px-2 py-1 flex justify-between items-center'>
            <h2 className='text-dark-gray'>Gadget Grid</h2>
            <div>
                <Input />
            </div>
            <div className='flex gap-2 items-center'>
                <Button variant={'secondary'}>
                    <ShoppingCart size={18} />
                </Button>
                <Button>
                    <User size={18} />
                </Button>
                <Button
                    onClick={() =>
                        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
                    }
                >
                    {theme === 'dark' ? <Moon /> : <Sun />}
                </Button>
            </div>
        </div>
    );
};

export default Topbar;
