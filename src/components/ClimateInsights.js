// src/components/ClimateInsights.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { Thermostat, Opacity, Grain, CalendarMonth } from "@mui/icons-material";
import { apiService } from "../services/mockApi";

const ClimateInsights = ({ language }) => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [districts, setDistricts] = useState([]);

  const isTamil = language === "ta";

  useEffect(() => {
    const loadDistricts = async () => {
      const result = await apiService.getDistricts();
      if (result.success) {
        setDistricts(result.data);
        if (result.data.length > 0) {
          setSelectedDistrict(result.data[0]);
        }
      }
    };
    loadDistricts();
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      loadInsights();
    }
  }, [selectedDistrict]);

  const loadInsights = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await apiService.getClimateInsights(selectedDistrict);
      if (result.success) {
        setInsights(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(
        isTamil ? "தகவல்களை ஏற்ற முடியவில்லை" : "Failed to load insights"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {isTamil ? "தகவல்களை ஏற்றுகிறது..." : "Loading insights..."}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        {isTamil ? "காலநிலை நுண்ணறிவுகள்" : "Climate Insights"}
      </Typography>

      <TextField
        select
        fullWidth
        label={isTamil ? "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்" : "Select District"}
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        sx={{ mb: 4 }}
      >
        {districts.map((district) => (
          <MenuItem key={district} value={district}>
            {district}
          </MenuItem>
        ))}
      </TextField>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {insights && (
        <Grid container spacing={3}>
          {/* Climate Metrics */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Thermostat sx={{ fontSize: 48, color: "error.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {isTamil ? "சராசரி வெப்பநிலை" : "Average Temperature"}
                </Typography>
                <Typography variant="h4" color="error.main">
                  {insights.avgTemperature}°C
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Opacity sx={{ fontSize: 48, color: "info.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {isTamil ? "மொத்த மழைப்பொழிவு" : "Total Rainfall"}
                </Typography>
                <Typography variant="h4" color="info.main">
                  {insights.totalRainfall}mm
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Grain sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {isTamil ? "ஈரப்பதம்" : "Humidity"}
                </Typography>
                <Typography variant="h4" color="success.main">
                  {insights.humidity}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Growing Season Info */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <CalendarMonth color="primary" />
                  {isTamil ? "வளரும் பருவம்" : "Growing Season"}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>{isTamil ? "பருவம்:" : "Season:"}</strong>{" "}
                  {insights.growingSeason}
                </Typography>
                <Typography variant="body1">
                  <strong>
                    {isTamil ? "உகந்த நடவு நேரம்:" : "Optimal Planting Time:"}
                  </strong>{" "}
                  {insights.optimalPlanting}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Soil Recommendations */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {isTamil ? "மண் பரிந்துரைகள்" : "Soil Recommendations"}
                </Typography>
                {insights.soilRecommendations.map((rec, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                  >
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      • {rec}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ClimateInsights;
