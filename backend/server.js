import express from "express";
import cors from "cors";
const app = express();

// 1. ALLOW FRONTEND CONNECTION (CORS)
// Lovable frontends usually run on port 8080 or 5173.
// We allow requests from these origins to prevent browser security blocks.
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// 2. DEFINE THE PORT
// Check your frontend code (usually inside 'src/lib/api.js' or '.env')
// to see which port it is trying to hit. It is often 3000 or 5000.
const PORT = process.env.PORT || 3000;

// 3. HEALTH CHECK ENDPOINT
// This helps verify the backend is actually running.
app.get("/", (req, res) => {
  res.json({ message: "Backend is running successfully!" });
});

// 4. ADD YOUR API ROUTES HERE
// Example: If your frontend calls /api/users, add it here.
app.get("/api/example", (req, res) => {
  res.json({ data: "This data came from the backend" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
