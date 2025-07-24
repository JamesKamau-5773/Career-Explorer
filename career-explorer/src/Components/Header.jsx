import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Search from './components/Search'
import AllCareers from './components/AllCareers'
import FilteredCareers from './components/FilteredCareers'
import CareerDetail from './components/CareerDetail'
import Contacts from './components/Contacts'

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchFilters, setSearchFilters] = useState({});

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/search" 
              element={
                <Search 
                  setSearchResults={setSearchResults}
                  setSearchFilters={setSearchFilters}
                />
              } 
            />
            <Route path="/all-careers" element={<AllCareers />} />
            <Route 
              path="/filtered-careers" 
              element={
                <FilteredCareers 
                  searchResults={searchResults}
                  searchFilters={searchFilters}
                />
              } 
            />
            <Route path="/career/:id" element={<CareerDetail />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
