import React from 'react';
import { Link } from 'react-router-dom';
import CareerCard from './CareerCard';
import api from './Api';

function FilteredCareers({ searchResults, searchFilters }) {
  const saveFavorite = async (careerId) => {
    try {
      await api.addFavoriteCareer(careerId);
    } catch (error) {
      console.error('Failed to save favorite:', error);
    }
  };

  const getActiveFilters = () => {
    const activeFilters = [];
    if (searchFilters.grade) activeFilters.push(`Grade ${searchFilters.grade}`);
    if (searchFilters.educationLevel) activeFilters.push(searchFilters.educationLevel);
    if (searchFilters.category) activeFilters.push(searchFilters.category);
    return activeFilters.length > 0 ? activeFilters.join(', ') : 'None';
  };

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Your Career Matches</h1>
        <div className="filter-info">
          <p><span className="info-label">Active Filters:</span> {getActiveFilters()}</p>
          <p><span className="info-label">Matches Found:</span> {searchResults.length}</p>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="results-container">
          <p className="results-message">
            We found these careers that fit your search:
          </p>
          
          <div className="career-list">
            {searchResults.map(career => (
              <CareerCard 
                key={career.id}
                career={career}
                onFavoriteClick={() => saveFavorite(career.id)}
              />
            ))}
          </div>
        </div>
      ) :