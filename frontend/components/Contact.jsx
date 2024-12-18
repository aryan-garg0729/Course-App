import React, { useState } from 'react';
import axios from 'axios';
const Contact = () => {
  const [formData, setFormData] = useState({
    to: "test@gmail.com",
    subject: '',
    text: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({
        ...errors,
        [e.target.name]: "", // Clear error on input change
      });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.text) newErrors.text = 'Message is required';

    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
      // Handle form submission logic here (e.g., sending data to a backend)
      const response = await axios.post("https://email-microservice-two.vercel.app/send-email",formData)
      setFormData({to: "test@gmail.com",subject:'',text:''})
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit}>           
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
