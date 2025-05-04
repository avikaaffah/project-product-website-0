Product Catalog Application
This application consists of a MongoDB database, Express.js backend, and a static HTML/CSS/JS frontend served through Nginx.

Quick Start
Make sure Docker and Docker Compose are installed on your system
Clone this repository
Start the application:
bash
docker-compose up -d
Access the application:
Frontend: http://localhost:3000
Backend API: http://localhost:5000/api/health
Architecture
The application uses Docker Compose to connect three services:

MongoDB: Database for storing product information
Backend: Node.js/Express API that connects to MongoDB
Frontend: Static HTML/CSS/JS served by Nginx, which also proxies API requests to the backend
Testing the Connection
A test script is provided to verify all components are working together:

bash
chmod +x test-connection.sh
./test-connection.sh
Common Issues and Solutions
1. Frontend shows "Error loading products"
Possible causes:

Backend is not running
MongoDB connection failed
CORS issues
Nginx proxy configuration
Solutions:

Check if all containers are running: docker-compose ps
Check backend logs: docker-compose logs backend
Verify MongoDB connection: docker-compose exec backend node -e "require('mongoose').connect(process.env.MONGO_URI).then(() => console.log('Connected')).catch(e => console.error(e))"
Check Nginx configuration: docker-compose exec frontend nginx -t
2. No products appear in the frontend
Possible causes:

No products in the database
Fetch error in frontend code
Solutions:

Add sample products:
bash
docker-compose exec -e ADD_TEST_DATA=true backend node -e "require('./seed/seedData')()"
Check browser console for JavaScript errors
Verify API response: curl http://localhost:3000/api/products
3. "404 Not Found" when accessing API endpoints
Possible causes:

Backend routes not properly configured
Nginx proxy not configured correctly
Solutions:

Verify backend is running and accessible: curl http://localhost:5000/api/health
Check Nginx proxy configuration in nginx.conf
Ensure API base URLs are correct in frontend code
Development Workflow
Modifying Frontend
Make changes to frontend files
Rebuild and restart the frontend container:
bash
docker-compose up -d --build frontend
Modifying Backend
Make changes to backend files
Rebuild and restart the backend container:
bash
docker-compose up -d --build backend
Accessing MongoDB directly
bash
docker-compose exec mongo mongosh
Container Management
Stop all containers: docker-compose down
View logs: docker-compose logs -f
Rebuild all containers: docker-compose up -d --build
Reset database: docker-compose down -v (caution: this deletes all data)
