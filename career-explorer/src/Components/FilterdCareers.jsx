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
