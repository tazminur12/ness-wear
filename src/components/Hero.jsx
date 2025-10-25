import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Style That",
      subtitle: "Speaks Volumes",
      description: "Discover the latest in contemporary streetwear. Designed for those who dare to stand out.",
      buttonText: "Shop New Arrivals",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&bg=white",
      bgColor: "bg-gray-50"
    },
    {
      id: 2,
      title: "Pure",
      subtitle: "White Collection",
      description: "Clean, minimalist designs that define modern streetwear. Essential pieces for every wardrobe.",
      buttonText: "Explore White Tees",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=600&fit=crop&bg=white",
      bgColor: "bg-white"
    },
    {
      id: 3,
      title: "Trending",
      subtitle: "Now",
      description: "Stay ahead of the curve with our most popular pieces. Fresh styles that everyone's talking about.",
      buttonText: "View Trending",
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&h=600&fit=crop&bg=white",
      bgColor: "bg-gray-100"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative overflow-hidden pt-20">
      {/* Slider Container */}
      <div className="relative h-[70vh] lg:h-[80vh]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <div className={`h-full ${slide.bgColor}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                  {/* Text Content */}
                  <div className="space-y-8 py-12 lg:py-20">
                    <div className="space-y-6">
                      <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
                        {slide.title}
                        <span className="block text-cyan-500">
                          {slide.subtitle}
                        </span>
                      </h1>
                      <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                        {slide.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/products"
                        className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        {slide.buttonText}
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Image Content */}
                  <div className="relative h-full flex items-center justify-center">
                    <div className="relative w-full max-w-lg">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                      />
                      {/* Floating Badge */}
                      <div className="absolute -top-4 -right-4 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200">
                        <span className="text-sm font-bold">NEW</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-cyan-500 scale-125' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
