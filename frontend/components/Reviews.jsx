import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/16/solid';
import axios from 'axios';

const ReviewSection = ({course_id,allowReviews}) => {
    // State to hold reviews
    const [reviews, setReviews] = useState([]);
    // State for new review inputs
    const [newReview, setNewReview] = useState({course:course_id, rating: "", comment: "" });
    // State to manage how many reviews to show initially
    const [visibleReviews, setVisibleReviews] = useState(2);
    useEffect(() => {
        axios.get(`http://localhost:3000/review`, {
            params: { course_id: course_id }
        })
            .then((response) => {
                // console.log(response.data)
                setReviews(response.data.reviews)
            })
            .catch((error) => console.error(error));
    }, []);
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/newReview',{review:newReview},
                {headers: {
                    Authorization: JSON.parse(localStorage.getItem('Authorization'))
                }}
            )
        } catch (error) {
            console.log(error)
        }

        // Reset the form inputs
        // Add the new review to the list
        setNewReview({course:course_id, rating: "", comment: "" });
    };

    // Function to load more reviews
    const handleLoadMore = () => {
        setVisibleReviews(prevVisibleReviews => prevVisibleReviews + 4);
    };

    // Function to render stars dynamically
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-600" />
                ))}
                {[...Array(emptyStars)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-gray-300" />
                ))}
            </div>
        );
    };

    return (
        <div className="reviews-section p-4">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {/* Add New Review Form */}
            {allowReviews?<div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Add Your Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Rating</label>
                        <select
                            name="rating"
                            value={newReview.rating}
                            onChange={handleChange}
                            required
                            className="border rounded w-full p-2"
                        >
                            <option value="">Select Rating</option>
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Very Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Poor</option>
                            <option value="1">1 - Terrible</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1">Comment</label>
                        <textarea
                            name="comment"
                            value={newReview.comment}
                            onChange={handleChange}
                            required
                            className="border rounded w-full p-2"
                        />
                    </div>

                    <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded">
                        Submit Review
                    </button>
                </form>
            </div>:<></>}

            {/* Display Reviews */}
            {reviews.length>0?<ul className="space-y-1">
                {reviews.slice(0, visibleReviews).map((review, index) => (
                    <li key={index} className="p-4 border-b-1 border-gray-800">
                        <div className="flex flex-col justify-start">
                            <h3 className="text-lg font-semibold">{review.user.name}</h3>
                            <div className="text-yellow-500">{renderStars(review.rating)}</div>
                        </div>
                        <p>{review.comment}</p>
                    </li>
                ))}
            </ul>:<div className='text-center text-blue-900 font-semibold'> No reviews for this course yet</div>}

            {/* Load More Button */}
            {visibleReviews < reviews.length && (
                <div className="mt-4 text-center">
                    <button
                        onClick={handleLoadMore}
                        className=" py-2 px-4 w-1/2 hover:bg-gray-200 font-bold border border-solid border-black"
                    >
                        See More Reviews
                    </button>
                </div>
            )}

            
        </div>
    );
};

export default ReviewSection;
