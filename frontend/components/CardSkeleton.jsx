import React from 'react';

function CardSkeleton() {
    return (
        <div className="animate-pulse  rounded-lg shadow-md bg-white transition-shadow duration-300 md:min-h-96 min-w-60 md:min-w-80 overflow-hidden">
            {/* Skeleton Thumbnail */}
            <div className="h-52 bg-gray-300"></div>

            {/* Skeleton Card Body */}
            <div className="px-5 py-2">
                {/* Skeleton Title */}
                <div className="h-5 bg-gray-300 rounded-md mb-2 w-3/4"></div>

                {/* Skeleton Instructor */}
                <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-2"></div>

                {/* Skeleton Rating */}
                <div className="flex items-center mb-2">
                    <div className="h-4 bg-gray-300 rounded-md w-8 mr-2"></div>
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-5 w-5 bg-gray-300 rounded-full"></div>
                        ))}
                    </div>
                    <div className="ml-2 h-4 w-12 bg-gray-300 rounded-md"></div>
                </div>

                {/* Skeleton Price */}
                <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
            </div>
        </div>
    );
}

export default CardSkeleton;
