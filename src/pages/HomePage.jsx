import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import image1 from "../assets/HeroImages/Image1.webp"
import image2 from "../assets/HeroImages/Image2.webp"
import image3 from "../assets/HeroImages/Image3.webp"
import image4 from "../assets/HeroImages/Image4.webp"
import image5 from "../assets/HeroImages/Image5.webp"

const HomePage = () => {
  
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { newItem } = useSelector((store) => store.items);
  const availableRideCount = newItem?.length || 0;
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-transparent h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen relative">
        <motion.div 
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="relative z-10 h-full flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
            <img 
              src={image1}
              alt="RideShare Hero Car" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="z-10 text-center px-4 sm:px-6 md:px-8">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-poppins">
              Your Journey, Our Priority
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8">
              Experience safe and convenient rides to your destination
            </p>
            <button 
              onClick={() => navigate("/available")}
              className="bg-rideco-red text-white hover:bg-opacity-90 px-6 py-3 rounded-md text-sm sm:text-base font-medium transition-all duration-300">
              Book a Ride Now
            </button>
          </div>
        </motion.div>
      </section>
      
      {/* Ride With Us Section */}
      <section className="py-10 sm:py-16 lg:py-24 bg-rideco-beige overflow-hidden relative px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        <div className="max-w-7xl lg:max-w-[90%] xl:max-w-[85%] mx-auto">
          {/* Section Title */} 
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 lg:px-24">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins mb-4 sm:mb-6"
            >
              Ride With Us
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-poppins px-4"
            >
              Welcome to our ride-sharing platform! Discover the ultimate convenience and flexibility of
              booking rides at your fingertips
            </motion.p>
          </div>
          

          <div className="relative rounded-lg overflow-hidden">
            <div className="hidden md:block relative h-[470px]">
              <img 
                src={image2}
                alt="Ride With Us" 
                className="absolute inset-0 w-full h-full overflow-clip object-cover object-top"
              />
              
              {/* Red Circle Accent */}
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-rideco-red rounded-full opacity-80 transform translate-y-1/3 -translate-x-1/3"></div>
              
              {/* Content text overlay - positioned to the right */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rideco-beige/95 via-rideco-beige/80 to-transparent">
                <div className="h-full flex flex-col justify-center px-8 lg:px-12 py-10">
                  <div className="max-w-md ml-auto mr-0 pr-10 lg:pr-[50px]">
                    <p className="text-sm uppercase tracking-wider text-rideco-red font-medium mb-4">Explore Our Rides</p>
                    <h3 className="font-poppins text-2xl md:text-3xl lg:text-4xl mb-6">About Our Service</h3>
                    
                    <div className="space-y-4 mb-8 font-poppins text-gray-600 text-sm md:text-base">
                      <p>
                        At our ride-sharing platform, we're dedicated to providing you with a seamless and enjoyable
                        experience. Our curated network of trusted drivers ensures you arrive at your destination
                        safely and on time
                      </p>
                      <p>
                        Our mission is to revolutionize the way you move, offering a reliable and affordable alternative to
                        traditional transportation
                      </p>
                    </div>
                    
                    <button
                    onClick={() => navigate("/about")}
                    className="bg-rideco-red font-poppins text-white hover:bg-opacity-90 px-6 md:px-8 py-3 rounded-md text-base md:text-lg font-medium transition-all duration-200">
                      About Us
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Version - Simple Card with no image */}
            <div className="md:hidden bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-rideco-red font-medium mb-2">Explore Our Rides</p>
                <h3 className="font-poppins text-xl mb-3">About Our Service</h3>
                
                <div className="space-y-3 mb-4 font-poppins text-gray-600 text-xs sm:text-sm">
                  <p>
                    At our ride-sharing platform, we're dedicated to providing you with a seamless and enjoyable
                    experience. Our curated network of trusted drivers ensures you arrive at your destination
                    safely and on time
                  </p>
                  <p>
                    Our mission is to revolutionize the way you move, offering a reliable and affordable alternative to
                    traditional transportation
                  </p>
                </div>
                
                <button
                onClick={() => navigate("/about")}
                className="bg-rideco-red font-poppins text-white hover:bg-opacity-90 px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 w-full">
                  About Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="relative py-10 sm:py-16 lg:py-24 bg-white overflow-hidden px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        <div className="max-w-7xl lg:max-w-[90%] xl:max-w-[85%] mx-auto">
          <div className="relative">
            <div className="absolute top-1/4 right-0 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-rideco-beige rounded-full opacity-20 -z-10 transform translate-x-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
              <motion.div 
                variants={fadeInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="lg:col-span-3 text-left bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl shadow-sm relative z-10"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins mb-3 sm:mb-5">Why Choose Us?</h2>
                <p className="text-sm md:text-base text-gray-500 mb-4 sm:mb-6 md:mb-8">Experience the Difference</p>
                
                <h3 className="font-poppins text-xl sm:text-2xl mb-4 sm:mb-6">Our Commitment</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
                  <div>
                    <h4 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">To You</h4>
                    <p className="text-sm md:text-base text-gray-600">We prioritize your needs with personalized service</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Reliable Rides</h4>
                    <p className="text-sm md:text-base text-gray-600">Count on us for timely and safe transportation</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Right Image (2 cols) */}
              <motion.div 
                variants={fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="lg:col-span-2 relative"
              >
                <img 
                  src={image3} 
                  alt="Why Choose Us" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Explore Our Destinations Section */}
      <section className="py-10 sm:py-16 bg-rideco-beige px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="max-w-7xl lg:max-w-[90%] xl:max-w-[85%] mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-poppins text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">Explore Our Destinations</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              From the bustling city streets to the serene suburbs, our ride-sharing platform connects you to a
              world of possibilities
            </p>
            
            {availableRideCount > 0 && (
              <div className="mt-3 sm:mt-4">
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-rideco-red text-white">
                  {availableRideCount} {availableRideCount === 1 ? 'ride' : 'rides'} available now
                </span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
            <motion.div 
              variants={fadeInLeft} 
              className="bg-rideco-dark text-white p-6 sm:p-8 md:p-10 rounded-lg text-left"
            >
              <div className="bg-white rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 flex items-center justify-center mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-rideco-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H14a1 1 0 001-1v-3h-5.05a2.5 2.5 0 00-4.9 0H4V5h10v2h2V5a1 1 0 00-1-1H3zM14 7h4a1 1 0 011 1v5h-2v2H4a1 1 0 01-1-1v-1h2.05a2.5 2.5 0 014.9 0H14v-1h2V8a1 1 0 00-1-1h-1z" />
                </svg>
              </div>
              <h3 className="font-poppins text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-6">Popular Destinations</h3>
              <h4 className="font-poppins text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 md:mb-6">Explore Now</h4>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-4 sm:mb-6 md:mb-8">
                Whether you're commuting to work, running errands, or seeking a night out on the town, our ride-sharing
                platform offers a seamless and reliable transportation solution. With our vast network of
                drivers and real-time availability
              </p>
              <button 
                onClick={() => navigate("/available")}
                className="bg-rideco-red font-poppins text-white hover:bg-opacity-90 px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-all duration-200">
                Find Available Rides
              </button>
              <div className="mt-4 sm:mt-6">
                <button 
                  onClick={() => navigate("/publish")}
                  className="bg-transparent border border-white font-poppins text-white hover:bg-white hover:text-rideco-dark px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-all duration-200">
                  Publish Your Ride
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInRight} 
              className="bg-white p-4 sm:p-6 md:p-8 rounded-lg text-left"
            >
              <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">About Our Drivers</p>
              <h3 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-normal mb-3 sm:mb-4 md:mb-6">Meet Our Team</h3>
              <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6">Dedicated to Your Safety</p>
              
              <div className="mb-4 sm:mb-6 md:mb-8">
                <img 
                  src={image4} 
                  alt="Our Team" 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 md:mb-6">Ride with Confidence</p>
              <button className="bg-rideco-red text-white hover:bg-opacity-90 px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-all duration-200 w-full">
                Learn More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* Earn Extra Income Section */}
      <section className="py-10 sm:py-16 bg-white px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="max-w-7xl lg:max-w-[90%] xl:max-w-[85%] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
            <motion.div 
              variants={fadeInLeft}
              className="text-left"
            >
              <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-3 sm:mb-4 md:mb-6">Earn Extra Income as a Ride-Sharing</h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 md:mb-8 font-poppins">
                Join our growing community of ride-sharing drivers and experience the flexibility and earning potential that comes
                with being your own boss. Whether you're looking to supplement your income or make driving your full-time
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInRight} 
              className="overflow-hidden rounded-lg"
            >
              <img 
                src={image5}
                alt="Earn Extra Income" 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
          
          <motion.div 
            variants={fadeIn}
            className="mt-10 sm:mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center"
          >
            <motion.div 
              variants={fadeInLeft}
              className="overflow-hidden rounded-lg"
            >
              <img 
                src={image3}
                alt="Flexible Schedules" 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </motion.div>

            <motion.div 
              variants={fadeInRight}
              className="text-left"
            >
              <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 md:mb-6">Flexible Schedules, Endless</h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 md:mb-8 font-poppins">
                As a ride-sharing driver, you'll enjoy the freedom to work on your own terms. Set your own schedule, choose your preferred
                driving hours, and take full control of your earning potential
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
