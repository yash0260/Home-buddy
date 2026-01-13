import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"
import SearchBar from "./SearchBar"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Search Your Next Home ' subtitle='Find new & featured property located in your local city.' />

          <SearchBar />
        </div>
      </section>
    </>
  )
}

export default Hero
