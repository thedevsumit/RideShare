import React, { useState, useEffect } from 'react';

const InitialLoader = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const textContent = {
    title: "Hold on, we are preparing ride for you",
    subtitle: "Our team is getting everything ready for your journey"
  }
  
  useEffect(() => {
    setIsVisible(true);
    
    if (loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(() => {
                onComplete();
              }, 800); 
            }, 500);
          }
          return newProgress;
        });
      }, 30); 
      
      return () => clearInterval(interval);
    }
  }, [loadingProgress, onComplete]);

  return (
    <div 
      className={`fixed w-full h-full inset-0 bg-[#f8efe4] flex flex-col items-center justify-center z-50 font-poppins overflow-hidden transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#222] tracking-wide transition-all duration-700 ease-out ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '0ms' }}
          >
            {textContent.title}
          </h1>
          
          <p 
            className={`text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-2xl mx-auto text-gray-600 opacity-80 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '500ms' }}
          >
            {textContent.subtitle}
          </p>
        </div>
      </div>
      
      <div 
        className={`absolute bottom-[-15px] sm:bottom-[-30px] md:bottom-[-60px] right-0 text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] font-bold text-[#222]/100 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {loadingProgress}
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-[#d92626]/5 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default InitialLoader; 