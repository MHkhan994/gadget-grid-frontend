'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TPFilter, TPFilterOption } from '@/types/product.interface';
import { Checkbox } from '../ui/checkbox';
import React from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const FilterCard = ({ filter }: { filter: TPFilter }) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Use filter-specific key to avoid conflicts
    const filterKey = `ff${filter.filterId}`;
    const selectedOptionIds =
        searchParams.get(filterKey)?.split(',').map(Number) || [];

    const handleChange = (checked: boolean, option: TPFilterOption) => {
        const params = new URLSearchParams(searchParams.toString());
        const key = `ff${filter.filterId}`;

        // Get current selections for THIS specific filter only
        const current =
            params.get(key)?.split(',').map(Number).filter(Boolean) || [];

        const updated = checked
            ? [...new Set([...current, option.optionId])] // Add option ID
            : current.filter((id) => id !== option.optionId); // Remove option ID

        if (updated.length) {
            params.set(key, updated.join(','));
        } else {
            params.delete(key);
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Collapsible defaultOpen className='group/collapsible'>
            <CollapsibleTrigger asChild>
                <h3 className='capitalize cursor-pointer font-semibold text-base flex items-center justify-between w-full'>
                    {filter?.title}
                    <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                </h3>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className='space-y-1 mt-2'>
                    {filter?.options?.map((option) => (
                        <div
                            className='flex justify-between items-center'
                            key={`${filter.filterId}-${option.optionId}`} // Make key unique across filters
                        >
                            <h5 className='text-sm'>{option.value}</h5>
                            <Checkbox
                                checked={selectedOptionIds.includes(
                                    option.optionId,
                                )}
                                onCheckedChange={(val) =>
                                    handleChange(Boolean(val), option)
                                }
                            />
                        </div>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default FilterCard;
