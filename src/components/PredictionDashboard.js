// src/components/PredictionDashboard.js
import React, { useState } from "react";

const PredictionDashboard = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true);

    // Simulate delay
    setTimeout(() => {
      setResult({
        yield: "4.2 tons/hectare",
        confidence: "85%",
        message: "SUCCESS - No backend used!",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1 style={{ color: "green" }}>Rice Yield Prediction - TEST</h1>

      <button
        onClick={handlePredict}
        disabled={loading}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? "Testing..." : "TEST PREDICT"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "3px solid green",
            borderRadius: "10px",
            backgroundColor: "#f0fff0",
          }}
        >
          <h2>✅ SUCCESS!</h2>
          <h3>Yield: {result.yield}</h3>
          <p>Confidence: {result.confidence}</p>
          <p>{result.message}</p>
        </div>
      )}

      {!result && !loading && (
        <div style={{ marginTop: "20px", color: "gray" }}>
          Click the button above to test
        </div>
      )}
    </div>
  );
};

export default PredictionDashboard;
