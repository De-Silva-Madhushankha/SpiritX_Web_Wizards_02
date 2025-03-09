# SpiritX_Web_Wizards_02

## Project Overview

SpiritX_Web_Wizards_02 is a web application that includes both client and server components. The client is built using modern web technologies, while the server handles API requests and database interactions.

## Instructions to Run the Project

### Prerequisites

- Node.js (v14 or higher)
- pnpm (v6 or higher)
- MongoDB (for database)

### Client Setup

1. Navigate to the `client` directory:
    ```sh
    cd client
    ```

2. Install dependencies:
    ```sh
    pnpm install
    ```

3. Start the development server:
    ```sh
    pnpm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

### Server Setup

1. Navigate to the `server` directory:
    ```sh
    cd server
    ```

2. Install dependencies:
    ```sh
    pnpm install
    ```

3. Set up environment variables:
    - Copy `.env.example` to `.env` and update the values as needed.

4. Add sample data to the database (optional):
    ```sh
    node addSampleDataToDB.js
    ```

5. Start the server:
    ```sh
    pnpm start
    ```

6. The server will be running on `http://localhost:5000`.

## Database Setup & Configuration

### MongoDB Setup

1. Install MongoDB and start the MongoDB server.

2. Create a new database for the project.

3. Update the MongoDB connection string in the `.env` file:
    ```
    MONGODB_URI=mongodb://localhost:27017/your_database_name
    ```

### Importing Sample Data

1. Ensure MongoDB is running.

2. Run the script to add sample data to the database:
    ```sh
    node addSampleDataToDB.js
    ```

## Assumptions Made During Development

- The client and server will run on different ports (`3000` for the client and `5000` for the server).
- MongoDB is used as the primary database.
- Environment variables are managed using a `.env` file.
- The project uses pnpm for package management.

## Additional Features

- **Authentication**: Implemented using JWT tokens.
- **ChatBot**: A chatbot feature to assist users.
- **Player Management**: CRUD operations for managing players.
- **Team Management**: CRUD operations for managing teams.
- **Tournament Management**: CRUD operations for managing tournaments.

## Directory Structure
"# SpiritX_Web_Wizards_02" 
