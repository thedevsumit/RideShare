import React from 'react'
import AvailableRide from '../components/AvailableRide'
import Header from '../components/Header'
import Footer from '../components/Footer'

const AvailablePage = () => {
  return (
    <div className="min-h-screen bg-[#f8efe4]">
      <Header theme="dark" />
      <AvailableRide />
      <Footer />
    </div>
  )
}

export default AvailablePage
