# GLOF (Glacial Lake Outburst Floods) Monitoring System

A comprehensive system for monitoring and predicting Glacial Lake Outburst Floods using satellite imagery and deep learning.

## Features

- Satellite image analysis using CNN
- Real-time GLOF prediction
- Mobile alerts for at-risk areas
- Interactive danger zone mapping
- User management system
- API endpoints for data access

## Project Structure

```
glof/
├── backend/
│   ├── api/
│   ├── models/
│   ├── utils/
│   └── config/
├── mobile_app/
│   ├── src/
│   └── assets/
├── web_interface/
│   ├── src/
│   └── public/
└── docs/
```

## Setup Instructions

1. Clone the repository
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
5. Start the web interface:
   ```bash
   cd web_interface
   npm install
   npm start
   ```

## API Documentation

The API documentation is available at `/docs` when running the backend server.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 