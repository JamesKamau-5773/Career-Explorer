import React, { useState, useEffect } from 'react';
import CareerCard from './CareerCard';
import api from './Api';

function AllCareers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    category: '',
    salary: '',
    description: ''
  });

  useEffect(() => {
    const getCareers = async () => {
      try {
        const data = await api.getCareers();
        setCareers(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getCareers();
  }, []);

  const addFavorite = async (id) => {
    try {
      await api.addFavorite(id);
    } catch (err) {
      console.error('Favorite error:', err);
    }
  };

  const startEdit = (career) => {
    setEditingId(career.id);
    setEditData({
      title: career.title,
      category: career.category,
      salary: career.salary,
      description: career.description
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const updated = await api.updateCareer(id, editData);
      setCareers(careers.map(c => c.id === id ? updated : c));
      setEditingId(null);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const deleteCareer = async (id) => {
    if (window.confirm('Delete this career?')) {
      try {
        await api.deleteCareer(id);
        setCareers(careers.filter(c => c.id !== id));
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const filteredCareers = careers.filter(career => 
    !filter || career.category === filter
  );

  if (loading) return <div className="loading-message">Loading careers...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="careers-page">
      <div className="page-title">
        <h1>Career Options</h1>
        <p>Total careers: {careers.length}</p>
      </div>

      <div className="filter-section">
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Tech">Technology</option>
            <option value="Health">Healthcare</option>
            <option value="Business">Business</option>
          </select>
        </label>
      </div>

      <div className="career-count">
        Showing: {filteredCareers.length} careers
      </div>

      {filteredCareers.length === 0 ? (
        <div className="no-results">No matching careers found</div>
      ) : (
        <div className="careers-list">
          {filteredCareers.map(career => (
            <div key={career.id} className="career-item">
              {editingId === career.id ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Title:</label>
                    <input
                      name="title"
                      value={editData.title}
                      onChange={handleEditChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Category:</label>
                    <select
                      name="category"
                      value={editData.category}
                      onChange={handleEditChange}
                    >
                      <option value="Tech">Technology</option>
                      <option value="Health">Healthcare</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Salary:</label>
                    <input
                      name="salary"
                      value={editData.salary}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={editData.description}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="form-buttons">
                    <button 
                      className="save-button"
                      onClick={() => saveEdit(career.id)}
                    >
                    