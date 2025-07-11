import React, { useState } from 'react';
import { useAuth } from '../Store/auth';
import { toast } from 'react-toastify';

const Contact = () => {
  const [form, setForm] = useState({ userName: '', userEmail: '', message: '' });
  const [userData, setUserData] = useState(true);
  const { user, isLoggodIn, API } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoggodIn && user && userData) {
    setForm({
      userName: user.userName,
      userEmail: user.userEmail,
      message: ''
    });
    setUserData(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, userEmail, message } = form;
    if (!userName || !userEmail || !message) return toast.info('Please fill all the fields');
    try {
      const res = await fetch(`${API}/api/form/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Message sent successfully!');
        setForm({ userName: '', userEmail: '', message: '' });
      } else {
        toast.error('Contact submission failed');
      }
    } catch (error) {
      console.log('Server Error:', error.message);
    }
  };

  return (
    <section className="bg-blue-50 text-blue-900 font-[montserrat] px-6 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="hidden md:block">
          <img src="data:image/jpeg;base64,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" alt="Contact" className="rounded-2xl w-full shadow-xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-red-600 font-[audiowide] mb-6">Get in Touch</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              required
            />
            <input
              type="email"
              name="userEmail"
              value={form.userEmail}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              required
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded shadow-md hover:bg-red-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
