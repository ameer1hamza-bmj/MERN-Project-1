import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import { toast } from 'react-toastify';

const Register = () => {
  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    phone: '',
    password: ''
  });

  const { storeTokenInLocalStorage, API } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, userEmail, phone, password } = user;

    if (!userName || !userEmail || !phone || !password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/registration`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
      console.log(res);
      console.log('API:', API);

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful!');
        storeTokenInLocalStorage(data.token);
        navigate('/');
      } else {
        toast.error(data.extraDetails || data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Try again later.');
    }
  };

  return (
    <section className="bg-white text-gray-800 min-h-screen flex items-center justify-center px-4 font-[montserrat]">
      <main className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-2xl border border-blue-200">

        {/* Left Image */}
        <div className="hidden md:block">
          <img
            src="data:image/png;base64,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"
            alt="register"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-8 text-center font-[audiowide]">Register</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {[
              { name: 'userName', placeholder: 'Username', type: 'text' },
              { name: 'userEmail', placeholder: 'Email', type: 'email' },
              { name: 'phone', placeholder: 'Phone', type: 'number' },
              { name: 'password', placeholder: 'Password', type: 'password' },
            ].map(({ name, placeholder, type }) => (
              <input
                key={name}
                type={type}
                name={name}
                placeholder={placeholder}
                value={user[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white border border-blue-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}

            <button
              type="submit"
              className="w-full py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-400 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </main>
    </section>

  );
};

export default Register;
