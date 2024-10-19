import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
    const navigate = useNavigate()
    // jwt
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('Authorization')))
   
    useEffect(()=>{
        localStorage.setItem("Authorization",JSON.stringify(token))
    },[token])

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Error state for validation
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: "", // Clear error on input change
        });
    };

    // Validate form
    const validate = () => {
        let newErrors = {};
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        return newErrors;
    };

    const notify = (message, status) => {
        if (status == 200) toast.success(message)
        else toast.error(message)
    }
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set errors if validation fails
        } else {
            try {
                const response = await axios.post("http://localhost:3000/signin", formData)
                setToken(response.data.message)
                window.location.href='/'
            } catch (error) {
                notify(error.response.data.message, 400);
            }
        }

        setFormData({email:"",password:""})
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-3">

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm`}
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm`}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;

