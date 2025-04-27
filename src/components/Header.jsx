import { IoMdArrowDropdown } from "react-icons/io";
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Notyf } from "notyf";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import notification from "./SimpleNotification";

const Header = ({ theme = "light" }) => {
  initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  var notyf = new Notyf();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [ridesDropdownVisible, setRidesDropdownVisible] = useState(false);
  const [ridesDropdownClicked, setRidesDropdownClicked] = useState(false);
  const ridesDropdownRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("currLoggedInUser");
    if (storedUser) {
      setUserDetails(storedUser);
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle outside click for rides dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ridesDropdownRef.current && !ridesDropdownRef.current.contains(event.target)) {
        setRidesDropdownVisible(false);
        setRidesDropdownClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle rides dropdown on click
  const toggleRidesDropdown = () => {
    setRidesDropdownClicked(!ridesDropdownClicked);
    setRidesDropdownVisible(!ridesDropdownVisible);
  };

  // Handle mouse enter on rides dropdown
  const handleRidesMouseEnter = () => {
    setRidesDropdownVisible(true);
  };

  // Handle mouse leave on rides dropdown
  const handleRidesMouseLeave = () => {
    if (!ridesDropdownClicked) {
      setRidesDropdownVisible(false);
    }
  };

  // Determine text color based on theme and scroll state
  const getTextColor = () => {
    if (theme === "dark") {
      return "text-slate-800";
    } else {
      return isScrolled ? "text-slate-800" : "text-white";
    }
  };

  const textColor = getTextColor();
  const bgColor = theme === "dark" ? "bg-transparent" : isScrolled ? "bg-white/80" : "bg-transparent";
  const mobileMenuBg = theme === "dark" ? "bg-white" : "bg-[#f8efe4]";
  
  // Hamburger icon color
  const hamburgerColor = mobileMenuOpen ? "text-slate-800" : isScrolled ? "text-slate-800" : "text-white";

  const navLinkClasses = `${textColor} font-poppins px-2 py-3 text-[16px] cursor-pointer relative group transition-all duration-300 ease-in-out`;

  // Mobile menu variants for animation
  const menuVariants = {
    open: { 
      opacity: 1, 
      height: "100vh",
      display: "flex",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    closed: { 
      opacity: 0, 
      height: 0,
      transitionEnd: {
        display: "none"
      },
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  // Mobile menu item variants
  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${bgColor} ${isScrolled ? 'shadow-md backdrop-blur-sm' : ''}`}>
      <div className="w-full sm:px-6 md:px-16 lg:px-28 px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-1 flex items-center">
            <div 
              onClick={() => navigate("/")}
              className={`${textColor} font-poppins font-bold text-2xl flex items-center cursor-pointer`}
            >
              RideShare
            </div>
          </div>
          
          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-center gap-4">
            <button 
              onClick={() => navigate("/")} 
              className={navLinkClasses}
            >
              <span>Home</span>
              <span className="absolute bottom-3 left-1/2 w-0 h-0.5 bg-[#d92626] group-hover:w-1/2 transition-all duration-300 ease-in-out origin-left"></span>
              <span className="absolute bottom-3 right-1/2 w-0 h-0.5 bg-[#d92626] group-hover:w-1/2 transition-all duration-300 ease-in-out origin-right"></span>
            </button>
            <button 
              onClick={() => navigate("/about")} 
              className={navLinkClasses}
            >
              <span>About</span>
              <span className="absolute bottom-3 left-1/2 w-0 h-0.5 bg-[#d92626] group-hover:w-1/2 transition-all duration-300 ease-in-out origin-left"></span>
              <span className="absolute bottom-3 right-1/2 w-0 h-0.5 bg-[#d92626] group-hover:w-1/2 transition-all duration-300 ease-in-out origin-right"></span>
            </button>
            <button 
              onClick={() => navigate("/help")} 
              className={navLinkClasses}
            >
              <span>Help Desk</span>
              <span className="absolute bottom-3 left-1/2 w-0 h-0.5 bg-[#d92626] group-hover:w-1/2 transition-all duration-300 ease-in-out origin-left"></span>
              <span className="absolute bottom-3 right-1/2 w-0 h-0.5 bg-[#d92626] group-hover:w-1/2 transition-all duration-300 ease-in-out origin-right"></span>
            </button>
            
            {/* Rides Dropdown */}
            <div 
              ref={ridesDropdownRef}
              className="relative"
              onMouseEnter={handleRidesMouseEnter}
              onMouseLeave={handleRidesMouseLeave}
            >
              <button 
                onClick={toggleRidesDropdown}
                className={`${navLinkClasses} flex items-center`}
              >
                <span>Rides</span>
                <IoMdArrowDropdown className={`ml-1 transform transition-transform ${ridesDropdownVisible ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-3 left-1/2 w-0 h-0.5 bg-[#d92626] group-hover:w-1/2 transition-all duration-300 ease-in-out origin-left"></span>
                <span className="absolute bottom-3 right-1/2 w-0 h-0.5 bg-[#d92626] group-hover:w-1/2 transition-all duration-300 ease-in-out origin-right"></span>
              </button>
              
              {ridesDropdownVisible && (
                <div className="absolute left-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 transform transition-all duration-200 ease-in-out">
                  <button
                    onClick={() => {
                      navigate("/publish");
                      setRidesDropdownVisible(false);
                      setRidesDropdownClicked(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#d92626] transition-colors"
                  >
                    Publish Ride
                  </button>
                  <button
                    onClick={() => {
                      navigate("/joined");
                      setRidesDropdownVisible(false);
                      setRidesDropdownClicked(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#d92626] transition-colors"
                  >
                    Joined Rides
                  </button>
                  <button
                    onClick={() => {
                      navigate("/available");
                      setRidesDropdownVisible(false);
                      setRidesDropdownClicked(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#d92626] transition-colors"
                  >
                    Available Rides
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Auth Buttons - Hidden on mobile */}
          <div className="hidden md:flex justify-end items-center pl-6">
            {userDetails ? (
              <div
                className="relative"
                onMouseEnter={() => setDropdownVisible(true)}
                onMouseLeave={() => setDropdownVisible(false)}
              >
                <div className={`${textColor} font-poppins flex items-center space-x-1 cursor-pointer px-4 py-2`}>
                  <span>{userDetails}</span>
                  <IoMdArrowDropdown />
                </div>
                
                {dropdownVisible && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        localStorage.removeItem("currLoggedInUser");
                        setUserDetails(null);
                        notyf.success("Logged out Successfully!");
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className={`${
                  theme === "dark" 
                    ? "bg-[#d92626] text-white hover:bg-[#c31e1e]" 
                    : isScrolled 
                      ? "bg-[#d92626] text-white hover:bg-[#c31e1e]" 
                      : "text-white bg-white/20 hover:bg-white/30 border border-white/50"
                } text-sm font-poppins text-[16px] px-4 py-2 rounded transition-all duration-200`}
                onClick={() => {
                  signInWithPopup(auth, provider)
                    .then((result) => {
                      const user = result.user;
                      if (user.email.endsWith("@nitj.ac.in")) {
                        notyf.success("Login Successful");
                      } else {
                        notyf.error("Login Failed, Please use NITJ email");
                        return;
                      }
                      localStorage.setItem(
                        "currLoggedInUser",
                        user.displayName
                      );
                      setUserDetails(user.displayName);
                    })
                    .catch((error) =>
                      console.error("Google Sign-In Error:", error)
                    );
                }}
              >
                Login
              </button>
            )}
          </div>
          
          {/* Mobile Hamburger Menu Button - Visible only on mobile */}
          <div className="md:hidden flex items-center z-[1000]">
            <button
              className={`flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none ${hamburgerColor}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span 
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'rotate-45 top-2 bg-slate-800' : 'rotate-0 top-0'
                  } ${isScrolled ? 'bg-slate-800' : hamburgerColor === 'text-white' ? 'bg-white' : 'bg-slate-800'}`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  } top-2 ${isScrolled ? 'bg-slate-800' : hamburgerColor === 'text-white' ? 'bg-white' : 'bg-slate-800'}`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-6 transform transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? '-rotate-45 top-2 bg-slate-800' : 'rotate-0 top-4'
                  } ${isScrolled ? 'bg-slate-800' : hamburgerColor === 'text-white' ? 'bg-white' : 'bg-slate-800'}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Full screen overlay */}
      <motion.div 
        className={`fixed inset-0 ${mobileMenuBg} z-[998] md:hidden flex flex-col`}
        initial="closed"
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="pt-20 px-6 pb-8 h-full overflow-y-auto">
          <motion.div className="flex flex-col space-y-4" variants={itemVariants}>
            <motion.button 
              variants={itemVariants}
              onClick={() => {
                navigate("/"); 
                setMobileMenuOpen(false);
              }}
              className="py-3 border-b border-gray-200 text-slate-800 font-medium text-left text-lg"
            >
              Home
            </motion.button>
            
            <motion.button 
              variants={itemVariants}
              onClick={() => {
                navigate("/about"); 
                setMobileMenuOpen(false);
              }}
              className="py-3 border-b border-gray-200 text-slate-800 font-medium text-left text-lg"
            >
              About
            </motion.button>
            
            <motion.button 
              variants={itemVariants}
              onClick={() => {
                navigate("/help"); 
                setMobileMenuOpen(false);
              }}
              className="py-3 border-b border-gray-200 text-slate-800 font-medium text-left text-lg"
            >
              Help Desk
            </motion.button>
            
            <motion.div variants={itemVariants} className="py-3 border-b border-gray-200">
              <div className="text-slate-800 font-medium text-lg mb-2">Rides</div>
              <div className="ml-4 space-y-2">
                <motion.button 
                  variants={itemVariants}
                  onClick={() => {
                    navigate("/publish"); 
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-slate-700 text-left w-full"
                >
                  Publish Ride
                </motion.button>
                <motion.button 
                  variants={itemVariants}
                  onClick={() => {
                    navigate("/joined"); 
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-slate-700 text-left w-full"
                >
                  Joined Rides
                </motion.button>
                <motion.button 
                  variants={itemVariants}
                  onClick={() => {
                    navigate("/available"); 
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-slate-700 text-left w-full"
                >
                  Available Rides
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="pt-4">
              {userDetails ? (
                <div className="flex flex-col">
                  <div className="text-slate-800 font-medium mb-2">
                    Logged in as: <span className="font-bold">{userDetails}</span>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("currLoggedInUser");
                      setUserDetails(null);
                      notyf.success("Logged out Successfully!");
                    }}
                    className="bg-[#d92626] text-white hover:bg-[#c31e1e] py-3 px-6 rounded-md text-base font-medium transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signInWithPopup(auth, provider)
                      .then((result) => {
                        const user = result.user;
                        if (user.email.endsWith("@nitj.ac.in")) {
                          notyf.success("Login Successful");
                        } else {
                          notyf.error("Login Failed, Please use NITJ email");
                          return;
                        }
                        localStorage.setItem(
                          "currLoggedInUser",
                          user.displayName
                        );
                        setUserDetails(user.displayName);
                        setMobileMenuOpen(false);
                      })
                      .catch((error) => 
                        console.error("Google Sign-In Error:", error)
                      );
                  }}
                  className="bg-[#d92626] text-white hover:bg-[#c31e1e] py-3 px-6 rounded-md w-full text-base font-medium transition-all"
                >
                  Login
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;