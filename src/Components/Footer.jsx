import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 font-[montserrat]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-[audiowide] text-red-500 mb-3">Hamza Dev</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            I craft high-performance, beautifully designed web experiences with React, Tailwind, and modern frontend tech.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><NavLink to="/" className="hover:text-blue-600 transition">Home</NavLink></li>
            <li><NavLink to="/services" className="hover:text-blue-600 transition">Services</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-blue-600 transition">Contact</NavLink></li>
            <li><NavLink to="/login" className="hover:text-blue-600 transition">Login</NavLink></li>
            <li><NavLink to="/register" className="hover:text-blue-600 transition">Register</NavLink></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Follow Me</h3>
          <div className="flex items-center gap-4 text-gray-500 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="text-center text-sm text-gray-500 py-5 border-t border-gray-200">
        © {new Date().getFullYear()} Hamza Dev — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
