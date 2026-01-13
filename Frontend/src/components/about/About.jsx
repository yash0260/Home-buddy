import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Our Journey' subtitle='Your Trusted Partner in Finding Home' />

            <p> HomeBuddy started with a simple mission: make finding a home easier and 
          more transparent for everyone. We understand that searching for the perfect 
          property can be overwhelming—endless listings, unclear pricing, and 
          time-consuming visits.</p>
            <p> Our platform connects thousands of property seekers with landlords and 
          sellers, creating a transparent marketplace where finding your dream home 
          is just a few clicks away. From cozy apartments in Mumbai to spacious 
          villas in Bangalore, we've got properties that match every need and budget.</p>
          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
