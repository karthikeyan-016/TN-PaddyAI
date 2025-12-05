// src/App.js
import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PredictionDashboard from "./components/PredictionDashboard";
import ClimateInsights from "./components/ClimateInsights";
import YieldTrends from "./components/YieldTrends";
import RiskAnalysis from "./components/RiskAnalysis";
import About from "./components/About";
import Contact from "./components/Contact";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
    secondary: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar language={language} setLanguage={setLanguage} />
          <Routes>
            <Route path="/" element={<Home language={language} />} />
            <Route
              path="/predict"
              element={<PredictionDashboard language={language} />}
            />
            <Route
              path="/climate"
              element={<ClimateInsights language={language} />}
            />
            <Route
              path="/trends"
              element={<YieldTrends language={language} />}
            />
            <Route
              path="/risk"
              element={<RiskAnalysis language={language} />}
            />
            <Route path="/about" element={<About language={language} />} />
            <Route path="/contact" element={<Contact language={language} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
