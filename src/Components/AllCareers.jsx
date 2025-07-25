import { useState, useEffect } from 'react';
import CareerCard from './CareerCard';
import api from './Api';

function AllCareers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCareer, setEditingCareer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await api.getCareers();
        setCareers(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const handleEdit = (careerId) => {
    setEditingCareer(editingCareer === careerId ? null : careerId);
  };

  const handleDelete = async (careerId) => {
    if (window.confirm('Are you sure you want to delete this career?')) {
      try {
        await api.deleteCareer(careerId);
        setCareers(careers.filter(career => career.id !== careerId));
        alert('Career deleted successfully!');
      } catch (error) {
        console.error('Error deleting career:', error);
        alert('Failed to delete career. Please try again.');
      }
    }
  };

  const handleSaveEdit = async (updatedCareer) => {
    try {
      await api.updateCareer(updatedCareer.id, updatedCareer);
      setCareers(careers.map(career =>
        career.id === updatedCareer.id ? updatedCareer : career
      ));
      setEditingCareer(null);
      alert('Career updated successfully!');
    } catch (error) {
      console.error('Error updating career:', error);
      alert('Failed to update career. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingCareer(null);
  };

  const handleAddCareer = () => {
    setShowAddForm(!showAddForm);
    setEditingCareer(null);
  };

  const handleSaveNewCareer = async (newCareerData) => {
    try {
      const addedCareer = await api.addCareer(newCareerData);
      setCareers([...careers, addedCareer]);
      setShowAddForm(false);
      alert('Career added successfully!');
    } catch (error) {
      console.error('Error adding career:', error);
      alert('Failed to add career. Please try again.');
    }
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  if (loading) return <div>Loading careers...</div>;

  return (
    <div className="careers-list">
      <div className="careers-header">
        <h1>All Careers</h1>
        <button onClick={handleAddCareer} className="add-career-btn">
          {showAddForm ? 'Cancel' : 'Add New Career'}
        </button>
      </div>

      {showAddForm && (
        <AddCareerForm
          onSave={handleSaveNewCareer}
          onCancel={handleCancelAdd}
        />
      )}

      {careers.map(career => (
        <div key={career.id}>
          <CareerCard
            career={career}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {editingCareer === career.id && (
            <EditCareerForm
              career={career}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function EditCareerForm({ career, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: career.title || '',
    description: career.description || '',
    salaryRange: career.salaryRange || '',
    requiredSkills: Array.isArray(career.requiredSkills) ? career.requiredSkills.join(', ') : '',
    educationLevel: Array.isArray(career.educationLevel) ? career.educationLevel.join(', ') : career.educationLevel || '',
    requiredGrades: Array.isArray(career.requiredGrades) ? career.requiredGrades.join(', ') : '',
    category: career.category || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCareer = {
      ...career,
      title: formData.title,
      description: formData.description,
      salaryRange: formData.salaryRange,
      requiredSkills: formData.requiredSkills.split(',').map(skill => skill.trim()),
      educationLevel: formData.educationLevel.split(',').map(level => level.trim()),
      requiredGrades: formData.requiredGrades.split(',').map(grade => grade.trim()),
      category: formData.category
    };
    onSave(updatedCareer);
  };

  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <h2>Edit Career</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>Salary Range:</label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Required Skills (comma-separated):</label>
            <input
              type="text"
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Education Level (comma-separated):</label>
            <input
              type="text"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Required Grades (comma-separated):</label>
            <input
              type="text"
              name="requiredGrades"
              value={formData.requiredGrades}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddCareerForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salaryRange: '',
    requiredSkills: '',
    educationLevel: '',
    requiredGrades: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCareer = {
      title: formData.title,
      description: formData.description,
      salaryRange: formData.salaryRange,
      requiredSkills: formData.requiredSkills.split(',').map(skill => skill.trim()),
      educationLevel: formData.educationLevel.split(',').map(level => level.trim()),
      requiredGrades: formData.requiredGrades.split(',').map(grade => grade.trim()),
      category: formData.category
    };
    onSave(newCareer);
  };

  return (
    <div className="career-form">
      <h2>Add New Career</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Salary Range:</label>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Required Skills (comma-separated):</label>
          <input
            type="text"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Education Level (comma-separated):</label>
          <input
            type="text"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Required Grades (comma-separated):</label>
          <input
            type="text"
            name="requiredGrades"
            value={formData.requiredGrades}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">Add Career</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AllCareers;