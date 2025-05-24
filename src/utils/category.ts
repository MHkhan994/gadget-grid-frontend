import { TCategory, TTreeCategory } from '@/types/category.interface';

export const generateCategoryTree = (
    categories: TCategory[],
    parent_id: string | null = null,
): TTreeCategory[] => {
    const categoryTree: TTreeCategory[] = [];

    let filterCategories;

    if (parent_id === null) {
        filterCategories = categories.filter((cat) => cat.parent_id === null);
    } else {
        filterCategories = categories.filter(
            (cat) => cat.parent_id === parent_id,
        );
    }

    if (filterCategories.length !== 0) {
        for (const category of filterCategories) {
            categoryTree.push({
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parent_id: category.parent_id,
                product_details_categories: category.product_details_categories,
                subCategories: generateCategoryTree(categories, category._id),
                isDeleted: false,
                image: category?.image || '',
                isFeatured: category.isFeatured,
            });
        }
    }

    return categoryTree;
};
