import React from 'react';

const About = () => {
    return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-12 md:py-14">
        <div className="absolute inset-0 bg-black opacity-15"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            About <span className="gradient-text">NESS WEAR</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto animate-fade-in-up">
            Expressing your unique style through carefully curated, sustainable, and empowering fashion
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">
                Founded in 2020, NESS WEAR began as a vision to make fashion more accessible, 
                sustainable, and empowering. We believe that everyone deserves to express their 
                unique style without compromising on quality or values.
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">
                What started as a small collection of carefully selected pieces has grown into 
                a comprehensive fashion brand that serves thousands of customers worldwide. 
                Our commitment to quality, sustainability, and customer satisfaction remains 
                at the heart of everything we do.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
        <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">Founded in 2020</h3>
                  <p className="text-gray-600 text-sm">Making fashion accessible for everyone</p>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-right">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop" 
                alt="Our team working together" 
                className="rounded-lg shadow-xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-12 md:py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to creating a positive impact through fashion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover-lift animate-fade-in-up">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                We carefully select every piece in our collection, ensuring premium materials 
                and craftsmanship that stand the test of time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover-lift animate-fade-in-up">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                We're committed to sustainable fashion practices, from eco-friendly materials 
                to ethical manufacturing processes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover-lift animate-fade-in-up">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                We believe in empowering our community through fashion, celebrating diversity 
                and individual expression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Impact</h2>
            <p className="text-lg text-purple-100">
              Numbers that tell our story
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in-up">
              <div className="text-4xl font-bold mb-1">10K+</div>
              <div className="text-purple-100 text-sm">Happy Customers</div>
            </div>
            <div className="text-center animate-fade-in-up">
              <div className="text-4xl font-bold mb-1">50+</div>
              <div className="text-purple-100 text-sm">Countries Served</div>
            </div>
            <div className="text-center animate-fade-in-up">
              <div className="text-4xl font-bold mb-1">500+</div>
              <div className="text-purple-100 text-sm">Products</div>
            </div>
            <div className="text-center animate-fade-in-up">
              <div className="text-4xl font-bold mb-1">4.8★</div>
              <div className="text-purple-100 text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 md:py-14 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the NESS WEAR Community
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Be part of a fashion movement that celebrates individuality, sustainability, 
            and quality. Discover your unique style with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/products" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-7 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover-lift"
            >
              Shop Now
            </a>
            <a 
              href="/contact" 
              className="border-2 border-purple-400 text-purple-400 px-7 py-3 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
        </div>
    );
};

export default About;