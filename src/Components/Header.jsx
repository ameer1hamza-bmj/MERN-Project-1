import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Store/auth';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { isLoggodIn, user } = useAuth();

  return (
    <>
      <header className="bg-white text-gray-900 shadow-md fixed top-0 left-0 w-full z-50 font-[montserrat]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-red-500">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Hi! {isLoggodIn && user?.userName ? user.userName : 'Guest'}
            </NavLink>
          </div>

          {/* Hamburger */}
          <div className="lg:hidden text-2xl cursor-pointer text-red-500" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-6 items-center text-sm font-medium">
            <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
            <NavLink to="/about" className="hover:text-blue-600">About</NavLink>
            <NavLink to="/contact" className="hover:text-blue-600">Contact</NavLink>
            <NavLink to="/services" className="hover:text-blue-600">Services</NavLink>

            {isLoggodIn && user?.isAdmin && (
              <NavLink to="/admin" className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 transition">
                Admin Panel
              </NavLink>
            )}

            {isLoggodIn ? (
              <NavLink to="/logout" className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 transition">
                Logout
              </NavLink>
            ) : (
              <>
                <NavLink to="/login" className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 transition">
                  Login
                </NavLink>
                <NavLink to="/register" className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 transition">
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white px-4 pb-4 shadow-md text-gray-900"
            >
              <ul className="flex flex-col gap-4 pt-4">
                <li><NavLink to="/" onClick={toggleMenu} className="hover:text-blue-600">Home</NavLink></li>
                <li><NavLink to="/about" onClick={toggleMenu} className="hover:text-blue-600">About</NavLink></li>
                <li><NavLink to="/contact" onClick={toggleMenu} className="hover:text-blue-600">Contact</NavLink></li>
                <li><NavLink to="/services" onClick={toggleMenu} className="hover:text-blue-600">Services</NavLink></li>

                {isLoggodIn && user?.isAdmin && (
                  <li>
                    <NavLink to="/admin" onClick={toggleMenu} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 transition">
                      Admin Panel
                    </NavLink>
                  </li>
                )}

                {isLoggodIn ? (
                  <li>
                    <NavLink to="/logout" onClick={toggleMenu} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 transition">
                      Logout
                    </NavLink>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink to="/login" onClick={toggleMenu} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 transition">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register" onClick={toggleMenu} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 transition">
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;
