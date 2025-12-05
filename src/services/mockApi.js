// src/services/mockApi.js

// Mock database for Tamil Nadu agricultural data
const mockDatabase = {
  districts: [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Thanjavur",
    "Vellore",
    "Erode",
    "Thoothukudi",
    "Dindigul",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Nagapattinam",
    "Namakkal",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Sivaganga",
    "Theni",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Viluppuram",
    "Virudhunagar",
    "Ariyalur",
    "Cuddalore",
    "Dharmapuri",
    "Nilgiris",
    "Ramanathapuram",
  ],

  soilTypes: [
    "Alluvial",
    "Black",
    "Red",
    "Laterite",
    "Mountain",
    "Desert",
    "Saline",
  ],

  riceVarieties: [
    "Ponni",
    "Samba",
    "Kichili",
    "Katta",
    "Kullakar",
    "Kuruvai",
    "Thanga Samba",
  ],

  // Historical yield data for realistic predictions
  historicalYields: {
    2022: { min: 2.8, max: 4.2, avg: 3.5 },
    2023: { min: 2.9, max: 4.3, avg: 3.6 },
    2024: { min: 3.0, max: 4.4, avg: 3.7 },
  },
};

// Utility functions for realistic data generation
const generateRealisticYield = (inputs) => {
  const baseYield = 3.5; // Average yield in tonnes/hectare for Tamil Nadu

  // Factors affecting yield (realistic ranges based on agricultural research)
  const factors = {
    temperature: Math.max(0.7, 1 - Math.abs(inputs.temperature - 28) * 0.02), // Optimal: 28°C
    rainfall: Math.max(0.6, 1 - Math.abs(inputs.rainfall - 1200) * 0.0003), // Optimal: 1200mm
    humidity: Math.max(0.8, 1 - Math.abs(inputs.humidity - 75) * 0.01), // Optimal: 75%
    nitrogen: inputs.nitrogen * 0.1, // Direct correlation
    phosphorus: inputs.phosphorus * 0.08,
    potassium: inputs.potassium * 0.07,
    phLevel: Math.max(0.5, 1 - Math.abs(inputs.phLevel - 6.5) * 0.2), // Optimal: 6.5
  };

  let calculatedYield = baseYield;

  // Apply factors
  Object.values(factors).forEach((factor) => {
    calculatedYield *= factor;
  });

  // Soil type adjustments
  const soilMultipliers = {
    Alluvial: 1.2,
    Black: 1.1,
    Red: 1.0,
    Laterite: 0.9,
    Mountain: 0.8,
    Desert: 0.6,
    Saline: 0.7,
  };

  calculatedYield *= soilMultipliers[inputs.soilType] || 1.0;

  // Add some random variation (±10%)
  const variation = 1 + (Math.random() * 0.2 - 0.1);
  calculatedYield *= variation;

  return Math.max(1.5, Math.min(6.0, calculatedYield)); // Realistic range for Tamil Nadu
};

const generateRiskAnalysis = (yieldValue, inputs) => {
  const risks = [];
  const recommendations = [];

  // Temperature risk
  if (inputs.temperature < 20 || inputs.temperature > 35) {
    risks.push("Temperature stress may affect grain filling");
    recommendations.push(
      "Consider adjusting planting schedule for optimal temperature"
    );
  }

  // Rainfall risk
  if (inputs.rainfall < 800) {
    risks.push("Low rainfall may require supplemental irrigation");
    recommendations.push(
      "Implement water conservation techniques and prepare for irrigation"
    );
  } else if (inputs.rainfall > 1500) {
    risks.push("Excessive rainfall may cause waterlogging");
    recommendations.push(
      "Ensure proper drainage and consider flood-resistant varieties"
    );
  }

  // Soil nutrient risks
  if (inputs.nitrogen < 20) {
    risks.push("Nitrogen deficiency detected");
    recommendations.push("Apply nitrogen-rich fertilizers in split doses");
  }

  if (inputs.phLevel < 5.5 || inputs.phLevel > 7.5) {
    risks.push("Soil pH is suboptimal for rice cultivation");
    recommendations.push(
      inputs.phLevel < 5.5
        ? "Apply lime to raise pH"
        : "Apply sulfur to lower pH"
    );
  }

  // Yield-based risk assessment
  if (yieldValue < 2.5) {
    risks.push("Predicted yield is below regional average");
    recommendations.push(
      "Consider soil amendments and improved cultivation practices"
    );
  }

  if (risks.length === 0) {
    risks.push("Low risk - Conditions appear favorable");
    recommendations.push(
      "Continue current practices and monitor weather patterns"
    );
  }

  return { risks, recommendations };
};

// Mock API endpoints
export const mockApi = {
  // Prediction endpoint
  predictYield: async (predictionData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const yieldValue = generateRealisticYield(predictionData);
    const riskAnalysis = generateRiskAnalysis(yieldValue, predictionData);

    return {
      success: true,
      data: {
        predictedYield: parseFloat(yieldValue.toFixed(2)),
        confidence: parseFloat((85 + Math.random() * 10).toFixed(1)),
        riskAnalysis: riskAnalysis,
        timestamp: new Date().toISOString(),
        inputs: predictionData,
      },
    };
  },

  // Historical data endpoint
  getHistoricalData: async (district, years = 5) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const currentYear = new Date().getFullYear();
    const historicalData = [];

    for (let i = years - 1; i >= 0; i--) {
      const year = currentYear - i;
      const baseYield = mockDatabase.historicalYields[year]?.avg || 3.5;
      const variation = 0.8 + Math.random() * 0.4;
      const yieldValue = baseYield * variation;

      historicalData.push({
        year: year.toString(),
        yield: parseFloat(yieldValue.toFixed(2)),
        rainfall: Math.floor(800 + Math.random() * 800),
        temperature: parseFloat((26 + Math.random() * 6).toFixed(1)),
      });
    }

    return {
      success: true,
      data: historicalData,
    };
  },

  // Climate insights endpoint
  getClimateInsights: async (district) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      data: {
        district: district,
        avgTemperature: parseFloat((27.5 + Math.random() * 3).toFixed(1)),
        totalRainfall: Math.floor(900 + Math.random() * 600),
        humidity: Math.floor(70 + Math.random() * 15),
        growingSeason: "June - September",
        optimalPlanting: "Early June",
        soilRecommendations: [
          "Maintain soil pH between 5.5-6.5",
          "Apply organic manure before planting",
          "Ensure proper leveling for water management",
        ],
      },
    };
  },

  // District list endpoint
  getDistricts: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      data: mockDatabase.districts,
    };
  },
};

// API service with error handling
export const apiService = {
  async predictYield(formData) {
    try {
      return await mockApi.predictYield(formData);
    } catch (error) {
      return {
        success: false,
        error: "Prediction service temporarily unavailable. Please try again.",
        data: null,
      };
    }
  },

  async getHistoricalData(district, years = 5) {
    try {
      return await mockApi.getHistoricalData(district, years);
    } catch (error) {
      return {
        success: false,
        error: "Historical data unavailable",
        data: [],
      };
    }
  },

  async getClimateInsights(district) {
    try {
      return await mockApi.getClimateInsights(district);
    } catch (error) {
      return {
        success: false,
        error: "Climate insights unavailable",
        data: null,
      };
    }
  },

  async getDistricts() {
    try {
      return await mockApi.getDistricts();
    } catch (error) {
      return {
        success: false,
        error: "District list unavailable",
        data: [],
      };
    }
  },
};
