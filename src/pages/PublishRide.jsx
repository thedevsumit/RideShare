import React, { useEffect } from 'react'
import Header from '../components/Header'
import PublishRide from '../components/PublishRide'
import Footer from '../components/Footer'
const PublishRidePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[#f8efe4]">
      <Header theme="dark" />
      <PublishRide />
      <Footer />
    </div>
  )
}

export default PublishRidePage
