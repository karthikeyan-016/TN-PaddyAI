// API service for backend communication
const API_BASE_URL = "http://localhost:8000";

export const apiService = {
  async predictYield(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("Prediction API error:", error);
      return {
        success: false,
        error: "Failed to connect to prediction service",
        data: null,
      };
    }
  },

  async getClimateData(district = "thanjavur", season = "samba", year = 2024) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/climate-data?district=${district}&season=${season}&year=${year}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("Climate data API error:", error);
      return {
        success: false,
        error: "Failed to fetch climate data",
        data: null,
      };
    }
  },

  async getHealthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error("Health check failed:", error);
      return false;
    }
  },
};