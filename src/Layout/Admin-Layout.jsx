import React, { useState } from 'react';
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Users, Mail, Home, Menu, X } from 'lucide-react';
import { useAuth } from '../Store/auth';

const AdminLayout = () => {
  const location = useLocation();
  const isDashboardRoot = location.pathname === '/admin';
  const [showSidebar, setShowSidebar] = useState(false);
  const { user, isLoading } = useAuth();

  if (isLoading) return <h1 className="text-gray-700 text-center mt-10">Loading...</h1>;
  if (!user.isAdmin) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-[montserrat] flex flex-col md:flex-row">

      {/* ✅ Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md md:hidden px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-red-500">Admin Panel</h2>
        <button onClick={() => setShowSidebar(true)} className="text-gray-800 hover:text-blue-600 transition">
          <Menu size={26} />
        </button>
      </header>

      {/* ✅ Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-100 w-[80%] max-w-xs p-6 shadow-2xl rounded-r-2xl transform transition-transform duration-300 ease-in-out
        ${showSidebar ? 'translate-x-0 z-50' : '-translate-x-full z-50'}
        md:static md:translate-x-0 md:flex md:w-72 md:flex-col md:z-0`}
      >
        {/* Sidebar Header for Mobile */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-red-500">Admin Panel</h2>
          <button onClick={() => setShowSidebar(false)} className="text-gray-800 hover:text-red-500">
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="space-y-3 mt-4 md:mt-0">
          <NavLink
            to="users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition duration-200 ${
                isActive
                  ? 'bg-blue-100 text-blue-600 shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`
            }
            onClick={() => setShowSidebar(false)}
          >
            <Users size={20} /> Users
          </NavLink>

          <NavLink
            to="contacts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition duration-200 ${
                isActive
                  ? 'bg-blue-100 text-blue-600 shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`
            }
            onClick={() => setShowSidebar(false)}
          >
            <Mail size={20} /> Contacts
          </NavLink>

          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-500 transition duration-200"
            onClick={() => setShowSidebar(false)}
          >
            <Home size={20} /> Back to Home
          </NavLink>
        </nav>

        {/* Sidebar Footer */}
        <p className="text-xs text-gray-400 mt-10 hidden md:block text-center">
          © 2025 Admin Dashboard
        </p>
      </aside>

      {/* ✅ Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* ✅ Main Content */}
      <main className="flex-1 pt-24 md:pt-10 px-4 md:px-6 pb-10">
        {isDashboardRoot ? (
          <div className="text-center mt-20 text-gray-500 text-xl animate-pulse">
            👋 Welcome to the Admin Panel!<br />Select an option from the sidebar.
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default AdminLayout;
