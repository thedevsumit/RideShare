import React, { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPhoneAlt, FaInstagram, FaWhatsapp, FaQuestionCircle, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Help = ({ sidebar, setSidebar }) => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");

  const handleSend = () => {
    const userEmail = localStorage.getItem("currLoggedInUser");

    if (!userEmail && !email) {
      Swal.fire({
        title: "Email Required",
        text: "Please log in or provide your email address to send us a message.",
        icon: "warning",
        background: "#fff",
        confirmButtonColor: "#d92626"
      });
      return;
    }

    if (message.trim().length === 0) {
      Swal.fire({
        title: "Empty Message",
        text: "Please write something before sending.",
        icon: "warning",
        background: "#fff",
        confirmButtonColor: "#d92626"
      });
      return;
    }

    const templateParams = {
      user_email: userEmail || email,
      user_name: name,
      message,
    };
    
    setIsSubmitting(true);
    
    emailjs
      .send(
        "service_8s4d2ki",
        "template_6xsfxtk",
        templateParams,
        "JifYqhhdqIB67-9nF"
      )
      .then(() => {
        setIsSubmitting(false);
        Swal.fire({
          title: "Message Sent!",
          text: "Thank you for reaching out. We'll get back to you as soon as possible.",
          icon: "success",
          background: "#fff",
          confirmButtonColor: "#d92626"
        });
        setMessage("");
        setEmail("");
        setName("");
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setIsSubmitting(false);
        Swal.fire({
          title: "Error",
          text: "Could not send message. Please try again later.",
          icon: "error",
          background: "#fff",
          confirmButtonColor: "#d92626"
        });
      });
  };

  const FAQs = [
    {
      question: "How do I join a ride?",
      answer: "To join a ride, simply browse the available rides on the Available Rides page, find one that matches your route and time, and click the 'Join Ride' button. You'll need to be logged in to join rides."
    },
    {
      question: "How do I publish a ride?",
      answer: "You can publish a ride by navigating to the Publish Ride page from the Rides dropdown in the navigation menu. Fill in the required details including your starting point, destination, date, time, and vehicle type. You must be logged in to publish a ride."
    },
    {
      question: "Can I cancel a ride I've joined?",
      answer: "Yes, you can cancel a ride you've joined by going to the Joined Rides page and clicking the 'Leave Ride' button on the ride card. This will free up your spot for other users."
    },
    {
      question: "Is my personal information secure?",
      answer: "We take privacy very seriously. Your personal information is encrypted and stored securely. We only share necessary details with other riders and drivers that are relevant to the ride-sharing experience."
    },
    {
      question: "How do payments work?",
      answer: "Currently, RideShare is a platform for coordinating rides. Payment arrangements should be made directly between riders and drivers. We're working on implementing a secure payment system in a future update."
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="bg-[#f8efe4] min-h-screen pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 font-poppins">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 xl:px-28 lg:max-w-[90%] xl:max-w-[85%]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poppins font-bold mb-3 sm:mb-4 md:mb-6 text-[#222] tracking-wide" 
            style={{ 
              WebkitTextStroke: "1px #222", 
              WebkitTextFillColor: "transparent",
            }}
          >
            Support Center
            
          </h1>
          <div className="relative max-w-3xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 relative z-10 font-light px-2">
              Have questions or need assistance? We're here to help you make the most of your RideShare experience.
            </p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 sm:mb-8 md:mb-10">
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base font-medium text-center transition-all ${activeTab === 'contact' ? 'text-[#d92626] border-b-2 border-[#d92626]' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('contact')}
            >
              Contact Support
            </button>
            <button 
              className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base font-medium text-center transition-all ${activeTab === 'faq' ? 'text-[#d92626] border-b-2 border-[#d92626]' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('faq')}
            >
              Frequently Asked Questions
            </button>
          </div>

          {/* Contact Form */}
          {activeTab === 'contact' && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="p-4 sm:p-6 md:p-8"
            >
              <div className="max-w-2xl mx-auto">
                <div className="mb-4 sm:mb-6 md:mb-8">
                  <h2 className="text-xl sm:text-2xl font-poppins mb-2 sm:mb-3 text-gray-800">Get in Touch</h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Fill out the form below, and our support team will get back to you as soon as possible.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {!localStorage.getItem("currLoggedInUser") && (
                    <>
                      <div>
                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-[#d92626] focus:border-[#d92626] transition-all text-sm sm:text-base"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Your Email</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-[#d92626] focus:border-[#d92626] transition-all text-sm sm:text-base"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                      id="message"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-[#d92626] focus:border-[#d92626] transition-all text-sm sm:text-base"
                      placeholder="How can we help you today?"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  
                  <button
                    onClick={handleSend}
                    disabled={isSubmitting}
                    className={`w-full inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white text-sm sm:text-base font-medium transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#d92626] to-[#ff4f4f] hover:shadow-lg transform hover:scale-[1.01]'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <FaArrowRight className="ml-2" />}
                  </button>
                  
                  {localStorage.getItem("currLoggedInUser") && (
                    <p className="text-xs sm:text-sm text-gray-500 text-center">
                      We'll respond to your registered email address.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* FAQ Section */}
          {activeTab === 'faq' && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="p-4 sm:p-6 md:p-8"
            >
              <div className="max-w-3xl mx-auto">
                <div className="mb-4 sm:mb-6 md:mb-8">
                  <h2 className="text-xl sm:text-2xl font-poppins mb-2 sm:mb-3 text-gray-800">Frequently Asked Questions</h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Find answers to common questions about using the RideShare platform.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {FAQs.map((faq, index) => (
                    <div key={index} className="bg-[#f8efe4]/40 rounded-lg p-4 sm:p-6 hover:shadow-md transition-all">
                      <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2 flex items-start">
                        <FaQuestionCircle className="text-[#d92626] mr-2 mt-1 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 ml-7">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Contact Info Cards */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all transform hover:scale-[1.02]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f8efe4] flex items-center justify-center mb-3 sm:mb-4">
              <FaEnvelope className="text-[#d92626] text-lg sm:text-xl" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">Email Us</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Our support team is ready to assist you.</p>
            <a 
              href="mailto:helprideshare@gmail.com" 
              className="text-[#d92626] text-sm sm:text-base font-medium hover:text-[#c31e1e] flex items-center"
            >
              helprideshare@gmail.com <FaArrowRight className="ml-2 text-xs sm:text-sm" />
            </a>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all transform hover:scale-[1.02]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f8efe4] flex items-center justify-center mb-3 sm:mb-4">
              <FaPhoneAlt className="text-[#d92626] text-lg sm:text-xl" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">Call Us</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Speak directly with our support team.</p>
            <a 
              href="tel:+919041627594" 
              className="text-[#d92626] text-sm sm:text-base font-medium hover:text-[#c31e1e] flex items-center"
            >
              +91 9041627594 <FaArrowRight className="ml-2 text-xs sm:text-sm" />
            </a>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all transform hover:scale-[1.02]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f8efe4] flex items-center justify-center mb-3 sm:mb-4">
              <FaWhatsapp className="text-[#d92626] text-lg sm:text-xl" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">WhatsApp</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Get quick support via WhatsApp chat.</p>
            <a 
              href="https://wa.me/9041627594" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#d92626] text-sm sm:text-base font-medium hover:text-[#c31e1e] flex items-center"
            >
              Start Chat <FaArrowRight className="ml-2 text-xs sm:text-sm" />
            </a>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all transform hover:scale-[1.02]">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f8efe4] flex items-center justify-center mb-3 sm:mb-4">
              <FaInstagram className="text-[#d92626] text-lg sm:text-xl" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">Instagram</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Follow us for updates and support.</p>
            <a 
              href="https://instagram.com/rideshare" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#d92626] text-sm sm:text-base font-medium hover:text-[#c31e1e] flex items-center"
            >
              @rideshare <FaArrowRight className="ml-2 text-xs sm:text-sm" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
