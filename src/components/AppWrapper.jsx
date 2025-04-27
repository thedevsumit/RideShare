import React, { useState, useEffect } from 'react';
import InitialLoader from './InitialLoader';

const AppWrapper = ({ children }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [content, setContent] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setContent(children);
    
    // Start animation after a short delay
    setTimeout(() => {
      setAnimationComplete(true);
    }, 100);
  };

  const renderWithStripAnimation = () => {
    return (
      <div className="relative overflow-hidden w-full h-full">
        <div className="relative z-10">
          {content}
        </div>
        
        {!animationComplete && (
          <div className="strips-container fixed inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`strip-${index}`}
                className={`strip strip-${index} absolute h-[20vh] w-[150vw] bg-gradient-to-r from-[#d92626] to-[#ff4f4f] left-[-10vw]`}
                style={{ 
                  animationDelay: `${0.1 * index}s`,
                  zIndex: 20 - index,
                  top: `${index * 20}vh`,
                  animation: 'stripAnimation 1.2s forwards cubic-bezier(0.645, 0.045, 0.355, 1.000)'
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Add the keyframes animation to the document
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    
    // Define the animation
    const keyframes = `
      @keyframes stripAnimation {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    `;
    
    styleEl.appendChild(document.createTextNode(keyframes));
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <>
      {showLoader && (
        <InitialLoader onComplete={handleLoaderComplete} />
      )}
      
      {content && renderWithStripAnimation()}
    </>
  );
};

export default AppWrapper; 