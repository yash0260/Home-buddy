import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './hero.css';

const SearchBar = () => {
  const history = useHistory();
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
  });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchData.location) params.append('location', searchData.location);
    if (searchData.propertyType) params.append('propertyType', searchData.propertyType);
    if (searchData.priceRange) {
      const [min, max] = searchData.priceRange.split('-');
      if (min) params.append('minPrice', min);
      if (max) params.append('maxPrice', max);
    }

    history.push(`/search?${params.toString()}`);
  };

  return (
    <form className='search-form' onSubmit={handleSearch}>
      <div className='box'>
        <span>City/Street</span>
        <input 
          type='text' 
          placeholder='Location' 
          name='location'
          value={searchData.location}
          onChange={handleChange}
        />
      </div>
      <div className='box'>
        <span>Property Type</span>
        <select name='propertyType' value={searchData.propertyType} onChange={handleChange}>
          <option value=''>All Types</option>
          <option value='Apartment'>Apartment</option>
          <option value='House & Villa'>House & Villa</option>
          <option value='Office & Studio'>Office & Studio</option>
          <option value='Commercial'>Commercial</option>
          <option value='Homes & Villas'>Homes & Villas</option>
          <option value='Condos'>Condos</option>
        </select>
      </div>
      <div className='box'>
        <span>Price Range</span>
        <select name='priceRange' value={searchData.priceRange} onChange={handleChange}>
          <option value=''>All Prices</option>
          <option value='0-10000'>Under ₹10,000</option>
          <option value='10000-20000'>₹10,000 - ₹20,000</option>
          <option value='20000-30000'>₹20,000 - ₹30,000</option>
          <option value='30000-50000'>₹30,000 - ₹50,000</option>
          <option value='50000-'>Above ₹50,000</option>
        </select>
      </div>
      <div className='box'>
        <button className='btn1' type='submit'>
          <i className='fa fa-search'></i> Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
