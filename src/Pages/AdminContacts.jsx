import React, { useEffect, useState } from 'react'
import { useAuth } from '../Store/auth'
import { motion } from 'framer-motion'
import { Trash2, Mail } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const AdminContacts = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const contactsPerPage = 5
  const { authorizationToken, API } = useAuth()

  const getAllContacts = async () => {
    const response = await fetch(`${API}/api/admin/contacts`, {
      headers: { Authorization: authorizationToken }
    })
    if (!response.ok) throw new Error('Failed to fetch contacts')
    return response.json()
  }

  const { data: contacts = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: getAllContacts
  })

  useEffect(() => {
    getAllContacts()
  }, [])

  const handleDelete = async (id) => {
    const res = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
      method: 'DELETE',
      headers: { Authorization: authorizationToken }
    })
    if (!res.ok) {
      toast.error('Failed to delete the contact')
      return
    }
    toast.success('Contact deleted successfully')
    await res.json()
    refetch()
  }

  const filteredContacts = contacts.filter(contact =>
    contact.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.userEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const indexOfLast = currentPage * contactsPerPage
  const indexOfFirst = indexOfLast - contactsPerPage
  const currentContacts = filteredContacts.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-blue-700">
        <div className="flex space-x-2">
          {[0, 0.1, 0.2, 0.3].map((delay, i) => (
            <span
              key={i}
              className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-red-600">
        <span className="text-2xl font-semibold mb-4">🚫 Something went wrong</span>
        <p className="text-sm text-center max-w-md">{error?.message || 'Failed to load data.'}</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-white min-h-screen px-6 py-20 text-blue-900 font-[montserrat]">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Heading */}
        <h1 className="text-4xl font-bold text-red-500 mb-8 text-center flex items-center justify-center gap-3 font-[audiowide]">
          <Mail className="w-7 h-7" /> Contact Messages
        </h1>

        {/* Search */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-5 py-2.5 rounded-xl bg-white text-blue-800 placeholder-blue-400 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-500 transition"
          />
        </div>

        {/* Contact Cards */}
        {currentContacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentContacts.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-blue-200 rounded-xl p-6 shadow-md hover:shadow-red-300/40 relative transition-transform duration-300 hover:scale-[1.015]"
              >
                <h3 className="text-xl font-bold mb-1 text-red-500 tracking-wide">{item.userName || 'No Name'}</h3>
                <p className="text-sm text-blue-500 mb-2 break-words">{item.userEmail || 'No Email'}</p>
                <p className="text-blue-800 text-sm mb-8 whitespace-pre-line break-words">
                  {item.message || 'No Message Provided'}
                </p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition"
                  title="Delete Contact"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-blue-400 mt-20 text-lg italic">No contact messages found.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 ${currentPage === index + 1
                  ? 'bg-red-600 text-white shadow-md shadow-red-400'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AdminContacts
