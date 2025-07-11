import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaShieldAlt, FaUsers } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-white text-blue-900 font-[montserrat]">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-red-600 mb-6 font-[audiowide]">Welcome to Hamza's World</h1>
            <p className="text-lg text-blue-700 mb-6">
              I build modern web experiences with clean code and responsive design.
            </p>
            <Link to="/services" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition">
              Explore Services
            </Link>
          </div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb1KjLAwYWEis_Ntmo3agsXpgCs1OSE77k4c6bHE7lsHxjV5VkERpM3xN81OvhAOQ8I2Y&usqp=CAU" alt="Hero" className="rounded-2xl shadow-xl w-[600px]" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-blue-100 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-red-500 font-[audiowide]">What I Offer</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          <div className="bg-white p-6 rounded-xl text-center shadow-md hover:scale-105 transition">
            <FaRocket className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Performance</h3>
            <p className="text-sm text-blue-700">Fast and optimized frontend solutions using React.</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center shadow-md hover:scale-105 transition">
            <FaShieldAlt className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Security</h3>
            <p className="text-sm text-blue-700">Modern code practices that ensure safe applications.</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center shadow-md hover:scale-105 transition">
            <FaUsers className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Focused</h3>
            <p className="text-sm text-blue-700">UIs that look good and feel right on all devices.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
