import React from 'react';

const About = () => {
  return (
    <div className="bg-white text-blue-900 font-[montserrat] min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="/public/images/vecteezy_isometric-style-illustration-about-a-web-programmer-working_6552084.jpg"
            alt="About"
            className="rounded-2xl shadow-xl"
          />
        </div>
        <div>
          <h1 className="text-4xl font-[audiowide] text-red-600 mb-4">About Me</h1>
          <p className="text-blue-800 text-lg mb-4">
            I’m Hamza, a frontend developer passionate about crafting clean UIs and responsive designs using React, Tailwind, and modern tools.
          </p>
          <p className="text-blue-600 text-sm">I focus on performance, accessibility, and interactive design that works across devices.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
