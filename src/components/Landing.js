import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Info from './Info'
import Image from './Image'
import Choose from './Choose'
import Footer from './Footer'

function Landing(props) {
  return (
    <div>
        <Navbar />
        <Hero />
        <Info />
        <Image />
        <Choose />
        <Footer />
    </div>
  )
}

export default Landing