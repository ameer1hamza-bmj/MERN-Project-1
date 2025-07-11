import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Pencil, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '../Store/auth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const { authorizationToken,API } = useAuth();

  const fetchUsers = async () => {
    const res = await fetch(`${API}/api/admin/users`, {
      headers: { Authorization: authorizationToken }
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  };

  const { data: adminUsers = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: fetchUsers,
  });

  const handleDelete = async (id) => {
    await fetch(`${API}/api/admin/users/delete/${id}`, {
      method: 'DELETE',
      headers: { Authorization: authorizationToken }
    });
    refetch();
  };

  const filtered = adminUsers
    .filter(u => u.userName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortAsc
        ? a.userName.localeCompare(b.userName)
        : b.userName.localeCompare(a.userName)
    );

  const current = filtered.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 text-blue-900">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-500 border-t-transparent" />
    </div>
  );

  if (isError) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-red-600">
      <p className="text-xl font-semibold mb-2">Oops, something went wrong.</p>
      <p className="text-center">{error?.message}</p>
    </div>
  );

  return (
    <div className="bg-blue-50 min-h-screen px-6 py-16 text-blue-900">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">User Management</h1>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-inner w-full sm:w-80">
            <Search size={18} className="text-blue-400 mr-2" />
            <input
              type="text"
              placeholder="Search users..."
              className="bg-transparent flex-grow outline-none"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
          >
            {sortAsc ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            Sort: {sortAsc ? 'A-Z' : 'Z-A'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-blue-100 text-blue-600 uppercase text-sm">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {current.length > 0 ? current.map((user, i) => (
                <motion.tr key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="even:bg-blue-50 hover:bg-blue-100 transition"
                >
                  <td className="py-3 px-6">{user.userName}</td>
                  <td className="py-3 px-6">{user.userEmail}</td>
                  <td className="py-3 px-6">{user.phone}</td>
                  <td className="py-3 px-6 text-center flex justify-center gap-4">
                    <Link to={`/admin/users/${user._id}/edit`} className="text-blue-500 hover:text-blue-700">
                      <Pencil size={18} />
                    </Link>
                    <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-blue-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6 gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded"
          >Prev</button>
          <span className="px-4 py-2">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded"
          >Next</button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminUsers;
