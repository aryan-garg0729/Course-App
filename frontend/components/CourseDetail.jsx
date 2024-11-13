import { StarIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReviewSection from './Reviews';

const CourseDetail = () => {
    const location = useLocation();
    const course = location.state.course || {};
    const [isModalOpen, setIsModalOpen] = useState(false);

    const useCart = () => {
        const [cart, setCart] = useState(() => {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        });

        useEffect(() => {
            localStorage.setItem('cart', JSON.stringify(cart));
        }, [cart]);

        return [cart, setCart];
    };

    const [cart, setCart] = useCart();
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
            if (existingItem) {
                return prevCart;
            }
            return [...prevCart, { ...item, totalPrice: item.totalPrice }];
        });
        notify('Course Added to Cart', 200);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-600" />
                ))}
                {halfStar && <StarIcon className="h-5 w-5 text-yellow-600" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-gray-300" />
                ))}
            </div>
        );
    };

    const notify = (message, status) => {
        if (status === 200) toast.success(message);
        else toast.error(message);
    };

    const initiateBuy = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/buy',
                { courseId: course._id },
                {
                    headers: {
                        Authorization: JSON.parse(localStorage.getItem('Authorization')),
                    },
                }
            );
            console.log(response);
            notify(response.data.message, 200);
        } catch (error) {
            console.log(error);
            notify(error.response.data.message, error.response.status);
        }
    };

    const handleConfirmBuy = () => {
        setIsModalOpen(false);
        initiateBuy();
    };

    return (
        <div className="container mx-auto p-6 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:space-x-10 gap-8">
                <div className="lg:w-2/3 space-y-4">
                    <h1 className="text-4xl font-bold">{course.title}</h1>
                    <p className="text-lg text-gray-800">{course.category}</p>
                    <div className="text-sm text-gray-800 flex space-x-2">
                        <p>Created by <span className="text-purple-500">{course.instructorName}</span></p>
                        <span>•</span>
                        <p>Last updated {new Date(course.lastUpdated).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="text-lg font-bold text-gray-600">{course.avgRating}</p>
                        {renderStars(course.avgRating)}
                        <span className="text-sm text-gray-400">({course.totalReviews} reviews)</span>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {course.description}
                    </p>
                    <div className="border-1 border-solid">
                        <h2 className="text-2xl font-bold mt-6 mb-4">What you'll learn</h2>
                        <ul className="grid grid-cols-2 gap-4 list-none">
                            {course.learnPoints.map((point, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="lg:w-5/12 max-w-96 mx-auto rounded-md shadow-lg space-y-6 overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-1/3 object-cover" />
                    <div className="px-6 pb-6 space-y-6">
                        <div>
                            <p className="text-3xl font-bold">₹{course.price}</p>
                            <p className="text-gray-500 text-lg line-through">₹3099</p>
                            <p className="text-red-500 font-semibold">86% off</p>
                        </div>
                        <div className="flex items-center text-red-500 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 00-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414l-2.707-2.707V6z" clipRule="evenodd" />
                            </svg>
                            <p>5 hours left at this price!</p>
                        </div>
                        <button onClick={() => addToCart(course)} className="bg-purple-500 hover:bg-purple-700 text-white text-lg font-semibold py-3 w-full rounded-md transition">
                            Add to cart
                        </button>
                        <button onClick={() => setIsModalOpen(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg font-semibold py-3 w-full rounded-md transition">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            <ReviewSection course_id={course._id} allowReviews={false} />

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Confirm Purchase</h2>
                        <p>Course Name: <span className="font-semibold">{course.title}</span></p>
                        <p>Price: <span className="font-semibold">₹{course.price}</span></p>
                        <div className="mt-6 flex space-x-4">
                            <button onClick={handleConfirmBuy} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                                Confirm
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetail;
