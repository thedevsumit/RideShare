import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-rideco-dark text-white">
      <div className="w-full py-8 md:py-12  sm:px-6 lg:px-28 px-4">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold">RideShare</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-gray-300">
              Your trusted ride-sharing platform, dedicated to providing safe, reliable transportation services.
            </p>
            <div className="mt-4 sm:mt-6 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-rideco-red transition-colors duration-300">
                <FaFacebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-rideco-red transition-colors duration-300">
                <FaTwitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-rideco-red transition-colors duration-300">
                <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-rideco-red transition-colors duration-300">
                <FaLinkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-100 tracking-wider uppercase">Company</h3>
            <ul className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
              <li><Link to="/about" className="text-xs sm:text-sm text-gray-300 hover:text-rideco-red transition-colors duration-300">About Us</Link></li>
              <li><Link to="/about" className="text-xs sm:text-sm text-gray-300 hover:text-rideco-red transition-colors duration-300">Our Team</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-100 tracking-wider uppercase">Services</h3>
            <ul className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
              <li><Link to="/available" className="text-xs sm:text-sm text-gray-300 hover:text-rideco-red transition-colors duration-300">Book a Ride</Link></li>
              <li><Link to="/publish" className="text-xs sm:text-sm text-gray-300 hover:text-rideco-red transition-colors duration-300">Become a Driver</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-100 tracking-wider uppercase">Support</h3>
            <ul className="mt-2 sm:mt-4 space-y-1 sm:space-y-2"> 
              <li><Link to="/help" className="text-xs sm:text-sm text-gray-300 hover:text-rideco-red transition-colors duration-300">Help Center</Link></li>
              <li><Link to="/help" className="text-xs sm:text-sm text-gray-300 hover:text-rideco-red transition-colors duration-300">Safety</Link></li>
              <li><Link to="/help" className="text-xs sm:text-sm text-gray-300 hover:text-rideco-red transition-colors duration-300">Frequently Asked Questions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} RideShare All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
