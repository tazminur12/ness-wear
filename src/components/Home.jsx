import React from 'react';
import Hero from './Hero';
import ProductCard from './ProductCard';
import TrendingNow from './TrendingNow';
import NewArrivals from './NewArrivals';
import CategoriesGrid from './CategoriesGrid';

function Home() {
  

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Trending Now (from backend) */}
      <CategoriesGrid />
      
      {/* Trending Now (from backend) */}
      <TrendingNow limit={8} />

      {/* New Arrivals (from backend) */}
      <NewArrivals limit={6} />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose NESS WEAR</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes our streetwear collection stand out from the rest
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trending Designs</h3>
              <p className="text-gray-600">Stay ahead of the curve with our cutting-edge streetwear designs that define modern fashion.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Crafted with the finest materials and attention to detail for lasting comfort and style.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unique Style</h3>
              <p className="text-gray-600">Express your individuality with our exclusive designs that speak to your personal style.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
