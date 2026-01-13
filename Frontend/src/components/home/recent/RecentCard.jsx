import React from "react"
import './recent.css'

import { Link } from "react-router-dom"

const RecentCard = ({ properties }) => {
  return (
    <>
      <div className='content grid3 mtop'>
        {properties.map((property) => {
          const { _id, title, cover, images, location, category, price, type } = property
          
          return (
            <Link to={`/property/${_id}`} key={_id} style={{textDecoration: 'none', color: 'inherit'}}>
              <div className='box shadow'>
                <div className='img'>
                  <img src={images && images[0] ? images[0] : cover || '../images/list/p-1.png'} alt={title} />
                </div>
                <div className='text'>
                  <div className='category flex'>
                    <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>
                      {category}
                    </span>
                  </div>
                  <h4>{title}</h4>
                  <p>
                    <i className='fa fa-location-dot'></i> {location}
                  </p>
                </div>
                <div className='button flex'>
                  <div>
                    <button className='btn2'>Rs{price.toLocaleString()} /sqft</button> 
                    <label htmlFor=''>{type || property.propertyType}</label>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
