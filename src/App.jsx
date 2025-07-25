import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './Components/Home';
import Search from './Components/Search';
import AllCareers from './Components/AllCareers';
import FilteredCareers from './Components/FilterdCareers';
import Contacts from './Components/Contact';
import Header from './Components/Header';
import Footer from './Components/Footer';

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
            <Route path="/careers" element={<AllCareers />} />
            <Route 
              path="/careers/filtered" 
              element={
                <FilteredCareers 
                  searchResults={searchResults}
                  searchFilters={searchFilters}
                />
              } 
            />
           
            <Route path="/contact" element={<Contacts />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;