import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const notify = (message, status) => {
    if (status == 200) toast.success(message)
    else toast.error(message)
}
const AllCourses = () => {
    const [coursesData, setCourseData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/courses', {
            // headers: {
            //     Authorization: JSON.parse(localStorage.getItem('Authorization'))
            // }
        }).then((res) => {
            setCourseData(()=>res.data);
        }).catch((error) => { notify(error.response.data.message,400); })
    }, [])

    const [filteredCourses, setFilteredCourses] = useState(coursesData);
    const [filters, setFilters] = useState({
        category: "All",
        difficulty: "All",
    });

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Filter courses based on selected filters
    const filterCourses = () => {
        let filtered = coursesData;
        if (filters.category !== "All") {
            filtered = filtered.filter((course) => course.category === filters.category);
        }
        if (filters.difficulty !== "All") {
            filtered = filtered.filter((course) => course.difficulty === filters.difficulty);
        }

        setFilteredCourses(filtered);
    };

    // Update filtered courses when filters change
    useEffect(() => {
        filterCourses();
    }, [filters, coursesData]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">All Courses</h1>

            {/* Filter Section */}
            <div className="flex justify-center space-x-4 mb-8">
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded-md"
                >
                    <option value="All">All Categories</option>
                    <option value="web development">Web Development</option>
                    <option value="Programming">Programming</option>
                    <option value="Data Science">Data Science</option>
                    <option value="AI & ML">AI & ML</option>
                </select>

                <select
                    name="difficulty"
                    value={filters.difficulty}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded-md"
                >
                    <option value="All">All Difficulty Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8">
                {
                    filteredCourses.map((course) => (
                        <Link key={course._id} to={`/course/${course._id}`} state={{course:course}}> <Card  course={course} /> </Link>
                    ))
                }
            </div> : (
                <p className="text-center text-gray-500">No courses found matching the selected filters.</p>
            )}

        </div>
    );
};

export default AllCourses;
