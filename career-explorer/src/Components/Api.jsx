const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = {
  getCareers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/careers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching careers:', error);
      throw error;
    }
  },

  addFavorite: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/careers/${id}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to favorite career: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error favoriting career:', error);
      throw error;
    }
  },

  updateCareer: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/careers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`Failed to update career: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating career:', error);
      throw error;
    }
  },

  deleteCareer: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/careers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to delete career: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting career:', error);
      throw error;
    }
  }
};

export default api;