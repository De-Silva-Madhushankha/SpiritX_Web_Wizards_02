# SpiritX_Web_Wizards_02

## Project Overview

SpiritX_Web_Wizards_02, also known as **Spirit11**, is a fantasy cricket league web application that allows users to create their dream teams from real university players, analyze statistics, and compete for the top spot on the leaderboard. The project consists of an **Admin Panel**, a **User Interface**, and an **AI Chatbot (Spiriter)** to assist users with team selection and player insights.

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
3. Start the client development:
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
    - You need a gemini API key and a MongoDB connection string
4. Add sample data to the database:
    ```sh
    node addSampleDataToDB.js
    ```
5. Start the server:
    ```sh
    pnpm run start
    ```
6. The server will be running on `http://localhost:4000`.

**Note** Depending on your setup and development environment, ports might vary. Please make sure to update cors policies (at server.js), VITE_BASE_URL(at client .env)

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

## Project Features

### Admin Panel
- Manage players, their statistics, and system logic.
- **Players View:** Displays all players in the game.
- **Player Stats View:** Detailed statistics for each player.
- **Tournament Summary View:** Overall tournament statistics, including total runs, total wickets, highest run scorer, and highest wicket taker.
- **CRUD Operations:** Create, update, and delete players while maintaining dataset integrity.
- **Admin-Only Authentication:** Restricted access to administrative functions.
- **Real-Time Updates:** Changes in player statistics and details reflect instantly without a page refresh.

### User Interface
- **User Authentication:** Sign up and log in with username and password.
- **Players Tab:** View all available players with detailed profiles and statistics.
- **Select Your Team Tab:** Categorized player selection with budget constraints.
- **Team Tab:** Displays selected players, total points, and allows player removal.
- **Budget Tracking System:** Users manage a Rs.9,000,000 initial budget, with dynamic adjustments for player purchases and removals.
- **Leaderboard:** Displays users ranked by team points, with the logged-in user highlighted.
- **Fully Responsive UI:** Optimized for various screen sizes.
- **Real-Time Updates:** Instant reflection of player statistics, details, and team modifications.

### AI Chatbot - Spiriter
- Assists users in team selection and player insights.
- **Player Queries:** Provides details and statistics of any player.
- **Best Team Suggestion:** AI-powered recommendation of an optimal team based on highest possible points.
- **Smart Responses:** If a detail is unavailable in the dataset, the bot responds with: “I don’t have enough knowledge to answer that question.”
- **Restricted Information:** Player points are never revealed to users.

## Gameplay Mechanics

- Users create an account and receive an **initial budget of Rs.9,000,000**.
- Players must be selected **only from the provided dataset**.
- A team consists of **11 players**, and total team points are calculated based on predefined logic.
- Users earn points based on player performance and compete on the leaderboard.
- CRUD operations apply **only to newly created players**, ensuring the dataset remains unchanged.


