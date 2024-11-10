import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

  // Simulate login status for demonstration
  useEffect(() => {
    // Here you can check if a user token exists (e.g., in localStorage)
    const token =  JSON.parse(localStorage.getItem('Authorization')); // Example token check
    
    if (token && token!="") {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Perform logout logic, like removing token from localStorage
    localStorage.removeItem("Authorization")
    setIsLoggedIn(false);
    window.location.reload(); // Refresh or redirect as needed
  };

  const commonMobileClasses = "block px-3 py-2 text-gray-800 hover:text-purple-600"
  const commonDesktopClasses = "text-gray-800 hover:text-purple-600 font-semibold"
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to='/'><h1 className="text-2xl font-bold text-gray-800">CourseApp</h1></NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block space-x-8">
            <NavLink to="/" className={({isActive})=>`${commonDesktopClasses} ${isActive?'text-purple-600':''}`}>Home</NavLink>
            <NavLink to="/contact" className={({isActive})=>`${commonDesktopClasses} ${isActive?'text-purple-600':''}`}>Contact</NavLink>
            <NavLink to="/cart" className={({isActive})=>`${commonDesktopClasses} ${isActive?'text-purple-600':''}`}>Cart</NavLink>
            
            {/* Show this section only if user is logged in */}
            {isLoggedIn ? (
              <>
                <NavLink to="/my-courses" className={({isActive})=>`${commonDesktopClasses} ${isActive?'text-purple-600':''}`}>My Courses</NavLink>
                <NavLink to="/profile" className={({isActive})=>`${commonDesktopClasses} ${isActive?'text-purple-600':''}`}>Profile</NavLink>
                <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg font-semibold">
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-semibold">
                Login / Sign Up
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-2">
          <NavLink to="/" className={({isActive})=>`${commonMobileClasses} ${isActive?'text-purple-600':''}`}>Home</NavLink>
          <NavLink to="/contact" className={({isActive})=>`${commonMobileClasses} ${isActive?'text-purple-600':''}`}>Contact</NavLink>
          <NavLink to="/cart" className={({isActive})=>`${commonMobileClasses} ${isActive?'text-purple-600':''}`}>Cart</NavLink>

          {/* Mobile menu - Show based on login status */}
          {isLoggedIn ? (
            <>
              <NavLink to="/my-courses" className={({isActive})=>`${commonMobileClasses} ${isActive?'text-purple-600':''}`}>My Courses</NavLink>
              <NavLink to="/profile" className={({isActive})=>`${commonMobileClasses} ${isActive?'text-purple-600':''}`}>Profile</NavLink>
              <button onClick={handleLogout} className="block w-full text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="block px-3 py-2 text-white bg-purple-600 hover:bg-purple-500 rounded-lg">
              Login / Sign Up
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
