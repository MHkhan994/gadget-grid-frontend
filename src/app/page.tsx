import Banner from '@/components/homepage/Banner';
import FeaturedProducts from '@/components/homepage/FeaturedProducts';
import React from 'react';

const HomePage = () => {
    return (
        <div className='space-y-7'>
            <Banner />
            <FeaturedProducts />
        </div>
    );
};

export default HomePage;
