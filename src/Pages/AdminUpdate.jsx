import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import { toast } from 'react-toastify';

const AdminUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken,API } = useAuth();
  const [user, setUser] = useState({ userName: '', userEmail: '', phone: '' });

  useEffect(() => {
    fetch(`${API}/api/admin/users/${id}`, {
      headers: { Authorization: authorizationToken },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then((data) =>
        setUser({
          userName: data.userName,
          userEmail: data.userEmail,
          phone: data.phone,
        })
      )
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, userEmail, phone } = user;

    if (!userName || !userEmail || !phone) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(`${API}/api/admin/users/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.modifiedCount ? 'User updated!' : 'No changes made');
        navigate('/admin/users');
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-12 font-[montserrat]">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-xl p-8">
        <h1 className="text-2xl md:text-3xl text-center font-bold text-red-500 font-[audiowide] mb-6">
          Update User Info
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields */}
          {['userName', 'userEmail', 'phone'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-semibold mb-1 capitalize text-gray-700">
                {field === 'userEmail' ? 'Email' : field}
              </label>
              <input
                type={field === 'phone' ? 'number' : 'text'}
                id={field}
                name={field}
                value={user[field]}
                onChange={(e) => setUser((prev) => ({ ...prev, [field]: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50"
                required
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-400 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminUpdate;
