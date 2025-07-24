const api = {
  getCareers: async () => {
    try {
      const response = await fetch('/db.json');
      if (!response.ok) throw new Error('Failed to fetch careers');
      const data = await response.json();
      return data.careers;
    } catch (error) {
      console.error('Error fetching careers:', error);
      throw error;
    }
  },

 getCareerById: async (id) => {
    try {
      const response = await fetch('/db.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const career = data.careers?.find(career => career.id === parseInt(id));
      
      if (!career) {
        throw new Error(`Career with ID ${id} not found`);
      }
      
      return career;
    } catch (error) {
      console.error(`Error fetching career with ID ${id}:`, error);
      throw error; 
    }
  }
}

export default api;

