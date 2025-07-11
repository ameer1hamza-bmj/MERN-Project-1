import React, { useEffect, useState } from 'react';
import {
  FaCode,
  FaMobileAlt,
  FaBolt,
  FaCogs,
  FaCloud,
  FaDatabase,
} from 'react-icons/fa';
import { useAuth } from '../Store/auth';

const iconMap = {
  FaCode: FaCode,
  FaMobileAlt: FaMobileAlt,
  FaBolt: FaBolt,
  FaCogs: FaCogs,
  FaCloud: FaCloud,
  FaDatabase: FaDatabase,
};

const Services = () => {
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const { API } = useAuth()

  const servicesData = async () => {
    try {
      const response = await fetch(`${API}/api/services`);
      if (!response.ok) {
        alert('No services found');
        setLoading(false);
        return;
      }

      const data = await response.json();
      setService(data.responce);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    servicesData();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-blue-600 font-[montserrat]">
        <div className="flex space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce" />
        </div>
        <p className="mt-4 text-sm text-gray-500">Loading services...</p>
      </div>
    );
  }

  return (
    <section className="bg-white text-gray-900 font-[montserrat] min-h-screen px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-[audiowide] text-red-500 mb-4">My Services</h1>
        <p className="text-gray-600 text-sm md:text-base">
          From frontend magic to secure backend systems — I handle it all.
        </p>
        <div className="h-1 w-24 bg-red-500 mx-auto mt-4 rounded-full animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {service.map((item, index) => {
          const IconComponent = iconMap[item.icon] || FaCode;
          return (
            <div
              key={index}
              className="bg-blue-50 hover:bg-blue-100 text-gray-800 p-6 rounded-xl shadow-md hover:shadow-blue-200 transition transform hover:-translate-y-2"
            >
              <IconComponent className="text-4xl text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
