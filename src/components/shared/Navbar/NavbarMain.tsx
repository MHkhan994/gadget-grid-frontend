import { generateCategoryTree } from '@/utils/category';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Topbar from './Topbar';

async function NavbarMain() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-all`,
    );
    const data = await res.json();

    const categoryTree = generateCategoryTree(data?.data || []);

    return (
        <div>
            <Topbar />
            <div className='flex px-2 py-1 gap-1 justify-between w-full'>
                {categoryTree.map((cat, i) => {
                    return (
                        <div
                            key={cat._id}
                            className='cursor-pointer group relative'
                        >
                            <Link
                                href={`/${cat.slug}`}
                                className='text-sm font-semibold text-dark-gray'
                            >
                                {cat.name}
                            </Link>
                            {cat.subCategories.length > 0 && (
                                <div className='w-40 border border-t-primary border-t-2 border-border min-h-52 shadow-sm absolute hidden group-hover:block'>
                                    {cat.subCategories.map((scat) => {
                                        return (
                                            <div
                                                key={scat._id}
                                                className='cursor-pointer w-full group/2 relative'
                                            >
                                                <Link
                                                    href={`/${scat.slug}`}
                                                    className='hover:bg-primary text-dark-gray w-full text-sm flex justify-between items-center px-2 py-1'
                                                >
                                                    {scat.name}{' '}
                                                    {scat.subCategories.length >
                                                        0 && (
                                                        <ChevronRight
                                                            size={16}
                                                        />
                                                    )}
                                                </Link>
                                                {scat.subCategories.length >
                                                    0 && (
                                                    <div
                                                        className={`w-40 border -top-[0px] border-t-2 border-t-primary border-forground-border min-h-52 hidden shadow-sm absolute group-hover/2:block ${categoryTree.length / 2 > i ? 'left-[calc(100%)]' : 'right-[calc(100%)]'}`}
                                                    >
                                                        {scat.subCategories.map(
                                                            (ssCat) => (
                                                                <Link
                                                                    key={
                                                                        ssCat._id
                                                                    }
                                                                    href={`/${ssCat.slug}`}
                                                                    className='hover:bg-primary hover:text-white w-full text-sm flex justify-between items-center px-2 py-1'
                                                                >
                                                                    {ssCat.name}
                                                                </Link>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default NavbarMain;
