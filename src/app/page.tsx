import Banner from '@/components/homepage/Banner';
import FeaturedProducts from '@/components/homepage/FeaturedProducts';
import FeturedCategories from '@/components/homepage/FeturedCategories';
import React from 'react';

const HomePage = () => {
    return (
        <div className='space-y-7'>
            <Banner />
            <FeturedCategories />
            <FeaturedProducts />
        </div>
    );
};

export default HomePage;
