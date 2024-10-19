import React from 'react'
import { StarIcon } from '@heroicons/react/16/solid'; // Import the star rating component

function Card({ course }) {
    // Function to render stars dynamically
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars-halfStar;

        return (
            <div className="flex items-center">
                {/* Full Stars */}
                {[...Array(fullStars)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-600" />
                ))}
                {/* Half Star */}
                {halfStar && <StarIcon className="h-5 w-5 text-yellow-600" />}
                {/* Empty Stars */}
                {[...Array(emptyStars)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-gray-300" />
                ))}
            </div>
        );
    };
    return (
        <div className="  rounded-lg  shadow-md bg-white hover:shadow-lg transition-shadow duration-300 md:min-h-96 max-w-60 md:max-w-80 overflow-hidden">
            {/* Course Thumbnail */}
            <div className="h-52">
                <img
                    className="w-full h-full object-cover"
                    src={course.thumbnail}
                    alt={course.title}
                />
            </div>

            {/* Card Body */}
            <div className="px-5 py-2">
                {/* Course Title */}
                <h3 className="mb-1 line-clamp-2  text-lg capitalize font-bold text-gray-800 leading-tight ">
                    {course.title}
                </h3>

                {/* Instructor */}
                <p className="w-full h-7 truncate text-md text-gray-600 ">{course.instructorName}</p>

                {/* Rating */}
                <div className="flex items-center ">
                    <span className="mr-1 font-bold text-md text-gray-600">{course.avgRating}</span>
                    {renderStars(course.avgRating)}

                    <span className="ml-1 text-md text-gray-500">({course.totalReviews})</span>
                </div>

                {!course.bought?(
                    // price
                    <div className="text-xl font-bold text-gray-800">₹{course.price}</div>
                ):(<></>)}
                
            </div>
        </div>
    );
};

export default Card