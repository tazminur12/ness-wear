import React from 'react';

const Hero = () => {
  const heroImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=600&fit=crop&bg=white";

  return (
    <section className="relative overflow-hidden">
      <div className="w-full h-56 md:h-72 lg:h-80">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
