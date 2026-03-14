# Backend API

This directory contains the Node.js/Express backend API for the E-gov Document Request system.

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for file uploads
- Orange/Moov Money for payments

## Project Structure
```
backend/
├── src/
│   ├── config/          # Database, Cloudinary, environment configurations
│   ├── models/          # Mongoose models (User, Demande, etc.)
│   ├── controllers/     # Route handlers
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication, validation, error handling
│   └── utils/           # JWT, email, PDF generation utilities
├── tests/               # Unit and integration tests
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Getting Started
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in your configuration
3. Start the development server: `npm run dev`

## API Endpoints
- `/api/auth` - Authentication routes
- `/api/documents` - Document type management
- `/api/demandes` - Document requests
- `/api/agent` - Agent operations
- `/api/admin` - Administrative functions
- `/api/upload` - File upload handling

## Development
- Run tests: `npm test`
- Lint code: `npm run lint`
- Format code: `npm run format`

## Contributing
See the main CONTRIBUTING.md file in the project root.