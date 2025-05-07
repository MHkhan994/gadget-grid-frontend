import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { TCategory, TTreeCategory } from '@/types/category.interface';
import { generateCategoryTree } from '@/utils/category';
import Link from 'next/link';
import React from 'react';

const NavMenu = ({ categories }: { categories: TCategory[] }) => {
    const categoryTree = generateCategoryTree(categories);

    const renderCategory = (cat: TTreeCategory) => {
        return (
            <div key={cat._id} className='relative group'>
                <Popover defaultOpen>
                    <PopoverTrigger asChild>
                        <Link href={cat.name}>{cat.name}</Link>
                    </PopoverTrigger>
                    <PopoverContent>
                        {cat.subCategories && (
                            <div className='ab'>
                                {cat?.subCategories?.map((c) =>
                                    renderCategory(c),
                                )}
                            </div>
                        )}
                    </PopoverContent>
                </Popover>
            </div>
        );
    };

    return (
        <div className='flex gap-2 justify-between'>
            {categoryTree.map((cat) => renderCategory(cat))}
        </div>
    );
};

export default NavMenu;
