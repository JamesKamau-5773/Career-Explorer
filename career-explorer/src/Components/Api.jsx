const API_BASE_URL = 'http://localhost:3001';

const api = {
  getCareers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/careers`);
      if (!response.ok) throw new Error('Failed to fetch careers');
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
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to add favorite');
      return await response.json();
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  },

  updateCareer: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/careers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update career');
      return await response.json();
    } catch (error) {
      console.error('Error updating career:', error);
      throw error;
    }
  },

  deleteCareer: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/careers/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete career');
      return await response.json();
    } catch (error) {
      console.error('Error deleting career:', error);
      throw error;
    }
  }
};

export default api;