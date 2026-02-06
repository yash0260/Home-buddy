import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './search.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SearchResults = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const debounceTimer = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      location: params.get('location') || '',
      propertyType: params.get('propertyType') || '',
      category: params.get('category') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
    });
  }, [location.search]); 

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.location) params.append('location', filters.location);
        if (filters.propertyType) params.append('propertyType', filters.propertyType);
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        const { data } = await axios.get(`${API_URL}/api/properties?${params.toString()}`);
        setProperties(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchProperties(); 
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchProperties();
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      category: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  if (loading) {
    return (
      <section className='search-results padding'>
        <div className='container'>
          <h2>Search Results</h2>
          <p style={{textAlign: 'center', padding: '40px'}}>Loading properties...</p>
        </div>
      </section>
    );
  }

  return (
    <section className='search-results padding'>
      <div className='container'>
        <h2>Search Results</h2>
        <p className='results-count'>{properties.length} properties found</p>

        <div className='search-layout'>
          <div className='filters-sidebar'>
            <div className='filter-header'>
              <h3>Filters</h3>
              <button className='clear-filters' onClick={clearFilters}>Clear All</button>
            </div>

            <div className='filter-group'>
              <label>Location</label>
              <input
                type='text'
                name='location'
                placeholder='Enter location'
                value={filters.location}
                onChange={handleFilterChange}
              />
            </div>

            <div className='filter-group'>
              <label>Property Type</label>
              <select name='propertyType' value={filters.propertyType} onChange={handleFilterChange}>
                <option value=''>All Types</option>
                <option value='Apartment'>Apartment</option>
                <option value='House & Villa'>House & Villa</option>
                <option value='Office & Studio'>Office & Studio</option>
                <option value='Commercial'>Commercial</option>
                <option value='Homes & Villas'>Homes & Villas</option>
                <option value='Condos'>Condos</option>
              </select>
            </div>

            <div className='filter-group'>
              <label>Category</label>
              <select name='category' value={filters.category} onChange={handleFilterChange}>
                <option value=''>All Categories</option>
                <option value='For Rent'>For Rent</option>
                <option value='For Sale'>For Sale</option>
              </select>
            </div>

            <div className='filter-group'>
              <label>Min Price (₹)</label>
              <input
                type='number'
                name='minPrice'
                placeholder='Min price'
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
            </div>

            <div className='filter-group'>
              <label>Max Price (₹)</label>
              <input
                type='number'
                name='maxPrice'
                placeholder='Max price'
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className='results-grid'>
            {properties.length === 0 ? (
              <div className='no-results'>
                <i className='fa fa-search' style={{fontSize: '48px', color: '#ccc', marginBottom: '20px'}}></i>
                <h3>No properties found</h3>
                <p>Try adjusting your filters or search criteria</p>
                <button className='btn3' onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className='content grid3'>
                {properties.map((property) => (
                  <Link to={`/property/${property._id}`} key={property._id} style={{textDecoration: 'none', color: 'inherit'}}>
                    <div className='box shadow'>
                      <div className='img'>
                        <img 
                          src={property.images && property.images[0] ? property.images[0] : '../images/list/p-1.png'} 
                          alt={property.title} 
                        />
                      </div>
                      <div className='text'>
                        <div className='category flex'>
                          <span 
                            style={{
                              background: property.category === "For Sale" ? "#25b5791a" : "#ff98001a",
                              color: property.category === "For Sale" ? "#25b579" : "#ff9800"
                            }}
                          >
                            {property.category}
                          </span>
                        </div>
                        <h4>{property.title}</h4>
                        <p>
                          <i className='fa fa-location-dot'></i> {property.location}
                        </p>
                      </div>
                      <div className='button flex'>
                        <div>
                          <button className='btn2'>Rs{property.price.toLocaleString()}</button>
                          <label>{property.propertyType}</label>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
