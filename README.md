# Tamil Nadu Rice Yield Prediction System

An AI-powered web application for predicting rice yield in Tamil Nadu districts using climate and agricultural parameters.

## Features

- **Yield Prediction**: Predict rice yield based on climate and agricultural inputs
- **Climate Insights**: Detailed climate analysis for different districts and seasons
- **Risk Assessment**: Evaluate drought, flood, heat, and water stress risks
- **Multi-language Support**: Available in English and Tamil
- **Interactive Charts**: Visual representation of data and trends
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui component library
- Recharts for data visualization
- React Router for navigation
- Zustand for state management

**Backend:**
- FastAPI (Python)
- Pydantic for data validation
- NumPy and Pandas for data processing
- CORS middleware for cross-origin requests

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn
- pip

### Option 1: Automated Setup (Recommended)

**For Windows:**
```bash
# Run the automated setup script
start-dev.bat
```

**For Linux/macOS:**
```bash
# Make the script executable and run
chmod +x start-dev.sh
./start-dev.sh
```

### Option 2: Manual Setup

**1. Clone the repository**
```bash
git clone <repository-url>
cd tamil-nadu-harvest-main
```

**2. Setup Backend**
```bash
cd backend
pip install -r requirements.txt
python simple_server.py
```
Backend will run on http://localhost:8000

**3. Setup Frontend (in a new terminal)**
```bash
npm install
npm run dev
```
Frontend will run on http://localhost:5173

## Usage

1. **Access the Application**: Open http://localhost:5173 in your browser
2. **Navigate to Prediction Dashboard**: Use the navigation menu
3. **Enter Parameters**: 
   - Select district and season
   - Adjust climate parameters (temperature, rainfall, humidity)
   - Set water availability and fertilizer levels
4. **Get Predictions**: Click "Predict Yield" to get results
5. **View Climate Insights**: Navigate to Climate Insights for detailed analysis

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/predict` - Rice yield prediction
- `GET /api/climate-data` - Climate data for districts and seasons

## Project Structure

```
tamil-nadu-harvest-main/
├── backend/
│   ├── simple_server.py      # Main FastAPI server
│   ├── main.py              # Alternative server (with ML model)
│   └── requirements.txt     # Python dependencies
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── hooks/              # Custom React hooks
│   └── i18n/               # Internationalization
├── public/                 # Static assets
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## Development

### Adding New Features

1. **Backend**: Add new endpoints in `backend/simple_server.py`
2. **Frontend**: Create components in `src/components/` or pages in `src/pages/`
3. **API Integration**: Update `src/services/apiService.js`

### Environment Variables

Create a `.env` file in the root directory:
```
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_TITLE=Tamil Nadu Rice Yield Prediction
```

## Troubleshooting

**Backend Issues:**
- Ensure Python dependencies are installed: `pip install -r backend/requirements.txt`
- Check if port 8000 is available
- Verify Python version (3.8+)

**Frontend Issues:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 5173 is available
- Verify Node.js version (16+)

**CORS Issues:**
- Backend is configured to allow requests from localhost:5173
- If using different ports, update CORS settings in `simple_server.py`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.