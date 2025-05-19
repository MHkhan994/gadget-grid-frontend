export interface TProductCategory {
    _id: string;
    name: string;
    fields: string[];
}

export interface TCategory {
    name: string;
    parent_id: string | null;
    product_details_categories: TProductCategory[];
    _id: string;
    isDeleted?: boolean;
    slug: string;
}

export interface TTreeCategory {
    name: string;
    parent_id: string | null;
    product_details_categories: TProductCategory[];
    _id: string;
    subCategories: TTreeCategory[];
    isDeleted?: boolean;
    slug: string;
}

export interface TCreateCategory {
    name: string;
    parent_id: string | null;
    product_details_categories: string[];
}

export interface TUpdateCategory {
    name: string;
    product_details_categories: string[];
}
