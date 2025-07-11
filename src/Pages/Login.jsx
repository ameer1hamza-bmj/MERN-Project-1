import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ userEmail: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { storeTokenInLocalStorage, API } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userEmail, password } = formData;

    if (!userEmail || !password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        storeTokenInLocalStorage(data.token);
        navigate('/');
        setFormData({ userEmail: '', password: '' });
      } else {
        toast.error(data.extraDetails || data.message);
      }

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Try again.");
    }
  };

  return (
    <section className="bg-white text-gray-800 min-h-screen flex items-center justify-center px-4 font-[montserrat]">
      <main className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-2xl border border-blue-200">

        {/* Left Image */}
        <div className="hidden md:block">
          <img
            src="data:image/jpeg;base64,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"
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-8 text-center font-[audiowide]">Login</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label htmlFor="userEmail" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="Enter your Email"
                required
                className="w-full px-4 py-2 bg-white border border-blue-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.userEmail}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 pr-10 bg-white border border-blue-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-400 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </section>

  );
};

export default Login;
