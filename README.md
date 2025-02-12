# Holiday Management Application

A full-stack application for managing and viewing holidays worldwide using the Calendarific API.

## Features

- Search holidays by country and year
- Filter by month, date range, and holiday type
- Cached holiday data to reduce API calls
- Responsive design using Tailwind CSS
- Pagination for holiday lists

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a .env file in the backend directory and add your configurations:

        CopyCALENDARIFIC_API_KEY=your_api_key_here
        DJANGO_SECRET_KEY=your_django_secret_key_here
        DEBUG=True
        ALLOWED_HOSTS=localhost,127.0.0.1


5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the server:
   ```bash
   python manage.py runserver
   ```
7. Use Postman for testing the API
    The following are the API endpoints:
    `GET /api/holidays/`: List holidays with optional filters
    `GET /api/holidays/search/`: Search holidays by name

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the frontend directory:

    REACT_APP_API_URL=http://localhost:8000/api

4.Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Access the application at http://localhost:5173
2. Select a country and year to view holidays
3. Use filters to narrow down results
4. Click on a holiday card to view details

## API Documentation

The backend provides the following endpoints:

- `GET /api/holidays/`: List holidays with optional filters
- `GET /api/holidays/search/`: Search holidays by name

## Technology Stack

- Backend: Django, Django REST Framework
- Frontend: React, Vite,  CSS
- API: Calendarific
- Database: SQLite


## Additional Notes


-Tried to use Tailwind(Tried installing multiple times and it throws error with postcss configuration. Created new  projects several times to rectify  issue with postcss, but failed.So standard css is used in this application )
-Used Calendarific API's free trial with limited resources.So all functions will not work as expected