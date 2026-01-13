import React, { useState, useEffect } from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Recent = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/properties`)
        setProperties(data)
        setLoading(false)
      } catch (error) {
        setError('Failed to load properties')
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) {
    return (
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Recent Property Listed' subtitle='Locations with the admiring view' />
          <p style={{textAlign: 'center', padding: '40px'}}>Loading properties...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Recent Property Listed' subtitle='Locations with the admiring view' />
          <p style={{textAlign: 'center', padding: '40px', color: 'red'}}>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Recent Property Listed' subtitle='Locations with the admiring view' />
          
          {properties.length === 0 ? (
            <p style={{textAlign: 'center', padding: '40px'}}>No properties listed yet. Be the first to add one!</p>
          ) : (
            <RecentCard properties={properties} />
          )}
        </div>
      </section>
    </>
  )
}

export default Recent
