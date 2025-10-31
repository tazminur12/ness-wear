import React from 'react';

const Hero = () => {
  const heroImage = "/hero.jpeg";

  return (
    <section className="relative overflow-hidden">
      <div className="w-full h-56 md:h-90 lg:h-130">
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
