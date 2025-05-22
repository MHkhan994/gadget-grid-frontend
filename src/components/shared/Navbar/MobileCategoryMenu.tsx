import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { TTreeCategory } from '@/types/category.interface';
import { generateCategoryTree } from '@/utils/category';
import { ChevronDown, ChevronRight, PanelRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CategoryItemProps {
    category: TTreeCategory;
    level?: number;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, level = 0 }) => {
    const hasSubCategories =
        category.subCategories && category.subCategories.length > 0;
    const paddingLeft = level * 16; // 16px per level for indentation

    if (!hasSubCategories) {
        return (
            <Link
                href={`/${category.slug}`}
                className='py-2 px-3 block hover:bg-primary-light cursor-pointer rounded-md transition-colors'
                style={{ paddingLeft: `${paddingLeft + 12}px` }}
            >
                <span className='text-sm text-dark-gray'>{category.name}</span>
            </Link>
        );
    }

    return (
        <details className='group'>
            <summary
                className='flex items-center justify-between w-full py-2 px-3 hover:bg-primary-light cursor-pointer rounded-md transition-colors list-none'
                style={{ paddingLeft: `${paddingLeft + 12}px` }}
            >
                <Link
                    href={`/${category.slug}`}
                    className='text-sm block text-dark-gray font-medium'
                >
                    {category.name}
                </Link>
                <ChevronRight className='h-4 w-4 text-dark-gray transition-transform group-open:rotate-90' />
            </summary>
            <div className='space-y-1 mt-1'>
                {category.subCategories.map((subCategory) => (
                    <CategoryItem
                        key={subCategory._id}
                        category={subCategory}
                        level={level + 1}
                    />
                ))}
            </div>
        </details>
    );
};

const MobileCategoryMenu = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-all`,
    );
    const data = await res.json();

    const categoryTree = generateCategoryTree(data?.data || []);

    return (
        <Sheet>
            <SheetTrigger className='xl:hidden text-dark-gray'>
                <PanelRight />
            </SheetTrigger>
            <SheetContent side={'left'} className='p-3'>
                {/* <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader> */}
                <ScrollArea className='space-y-2 h-[calc(100vh-30px)]'>
                    {categoryTree.map((category) => (
                        <CategoryItem key={category._id} category={category} />
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default MobileCategoryMenu;
