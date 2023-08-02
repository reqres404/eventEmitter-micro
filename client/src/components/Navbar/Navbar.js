import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { CgMenuRight as Hamburger } from "react-icons/cg";
import logoSvg from "../../assets/caketrackLogo.png";
import "./Navbar.css";
// import axios from 'axios'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  // const sendWishMails = async () => {
  //   axios.get("/api/birthdays/1days");
  //   axios.get("/api/anniversaries/1days")
  // };

  // useEffect(() => {
  //   // Run the function immediately on component mount
  //   sendWishMails();

  //   // Calculate the time until 12:01 AM
  //   const calculateTimeDiff = () => {
  //     const currentDate = new Date();
  //     const targetTime = new Date(
  //       currentDate.getFullYear(),
  //       currentDate.getMonth(),
  //       currentDate.getDate(),
  //       0, // Hours
  //       1, // Minutes
  //       0 // Seconds
  //     );

  //     let timeDiff = targetTime.getTime() - currentDate.getTime();
  //     if (timeDiff < 0) {
  //       timeDiff += 24 * 60 * 60 * 1000; // Add 24 hours
  //     }

  //     return timeDiff;
  //   };

  //   // Set an interval to run the function when the target time is reached
  //   const interval = setInterval(() => {
  //     const timeDiff = calculateTimeDiff();

  //     if (timeDiff <= 0) {
  //       sendWishMails();
  //     }
  //   }, 1000);

  //   // Clear the interval on component unmount
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const logout = () => {
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("user_id") !== null);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedIsLoggedIn = localStorage.getItem("user_id") !== null;
      setIsLoggedIn(updatedIsLoggedIn);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={logoSvg} alt="Logo" />
          </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/Home">Events</NavLink>
            </li>
            {isLoggedIn ? (
              <li onClick={logout}>
                <NavLink to="/Login">Logout</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/adminpanel">Admin Panel</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;