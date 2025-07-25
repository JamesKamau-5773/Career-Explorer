import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './Api'

function Search({ setSearchResults, setSearchFilters }) {
  const navigate = useNavigate()
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchType, setSearchType] = useState('grade')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await api.getCareers()
        setCareers(data || [])
      } catch (error) {
        console.error('Error fetching careers:', error)
      }
    }
    fetchCareers()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let filtered = careers

      if (searchType === 'grade') {
        filtered = filtered.filter(career => 
          career.requiredGrades && career.requiredGrades.includes(searchValue)
        )
      }

      if (searchType === 'educationLevel') {
        filtered = filtered.filter(career => 
          career.educationLevel && career.educationLevel.includes(searchValue)
        )
      }

      if (searchType === 'category') {
        filtered = filtered.filter(career => 
          career.category && career.category.toLowerCase().includes(searchValue.toLowerCase())
        )
      }

      setSearchResults(filtered)
      setSearchFilters({ [searchType]: searchValue })
      navigate('/careers/filtered')
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetFilters = () => {
    setSearchType('grade')
    setSearchValue('')
  }

  return (
    <div className="searchbar">
      <div className="searchheader">
        <h1>Find Your Perfect Career</h1>
        <p>Use our smart search to discover careers that match your qualifications</p>
      </div>

      <div className="searchcontainer">
        <form onSubmit={handleSearch} className="searchform">
          <div className="form-group">
            <label htmlFor="searchType">Search By</label>
            <select 
              id="searchType"
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="grade">Grade Level</option>
              <option value="educationLevel">Education Level</option>
              <option value="category">Career Category</option>
            </select>
          </div>

          <div className="formgroup">
            <label htmlFor="searchValue">
              {searchType === 'grade' && 'Your Grade Level'}
              {searchType === 'educationLevel' && 'Education Level'}
              {searchType === 'category' && 'Career Category'}
            </label>
            <select 
              id="searchValue"
              value={searchValue} 
              onChange={(e) => setSearchValue(e.target.value)}
            >
              <option value="">Select {searchType}</option>
              
              {searchType === 'grade' && (
                <>
                  <option value="A">Grade A</option>
                  <option value="B">Grade B</option>
                  <option value="C">Grade C</option>
                  <option value="D">Grade D</option>
                </>
              )}
              
              {searchType === 'educationLevel' && (
                <>
                  <option value="Certificate">Certificate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Degree">Degree</option>
                </>
              )}
              
              {searchType === 'category' && (
                <>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Education">Education</option>
                  <option value="Finance">Finance</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Trades">Trades</option>
                  <option value="Hospitality">Hospitality</option>
                </>
              )}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading || !searchValue} className="search-btn">
              {loading ? 'Searching...' : 'Search Careers'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Search