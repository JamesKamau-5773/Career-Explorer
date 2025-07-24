import { useState, useEffect } from 'react';
import CareerCard from './CareerCard';
import api from '../Api';

function AllCareers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading careers...</div>;

  return (
    <div className="careers-list">
      {careers.map(career => (
        <CareerCard key={career.id} career={career} />
      ))}
    </div>
  );
}

export default AllCareers;