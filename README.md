# Quiz Builder

This project is a full-stack web application for creating and managing quizzes, developed in fulfillment of the Full-Stack JS Engineer technical assessment at developstoday.

-----

## Core Functionality

  * **Quiz Creation**: Implemented a form to create quizzes with a title and a dynamic list of questions.
  * **Question Types**: Supports three distinct question formats: Boolean (true/false), Input (text answer), and Checkbox (multiple correct options).
  * **Quiz Listing**: A dashboard page that fetches and displays all available quizzes, showing the title and the total number of questions for each.
  * **Quiz Detail View**: A dedicated page to display the complete structure of a selected quiz in a read-only format.
  * **Quiz Deletion**: Functionality to delete quizzes directly from the main dashboard.

-----

## Technology Stack

### Backend

  * **Framework**: NestJS
  * **Language**: TypeScript
  * **ORM**: Prisma
  * **Database**: SQLite

### Frontend

  * **Framework**: Next.js (App Router)
  * **Language**: TypeScript
  * **UI**: React.js

-----

## Project Structure

The project follows a monorepo pattern, with a clear separation between the backend and frontend applications.

```
quiz-builder/
├── backend/                  # NestJS API (Backend)
│   ├── src/                  # Application source code
│   │   ├── prisma/           # Injectable Prisma client service
│   │   └── quizzes/          # Core feature module for all quiz-related logic
│   ├── prisma/               # Database schema and migrations
│   └── .env.example          # Environment variable template
│
├── frontend/                 # Next.js (Frontend)
│   ├── app/                  # Page routes and layouts (App Router)
│   ├── components/           # Shared and reusable React components
│   ├── services/             # API communication layer
│   └── .env.example    # Environment variable template
│
└── README.md
```

-----

## Local Development Setup

### Prerequisites

  * Node.js (v18.x or later)
  * NPM or a compatible package manager

### Installation and Execution

Execute the following steps to run the project locally.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/pedronascimentos/quiz-builder.git
    cd quiz-builder
    ```

2.  **Configure and run the Backend:**

    ```bash
    cd backend
    cp .env.example .env
    npm install
    npx prisma migrate dev
    npm run start:dev
    ```

    The API will be available at `http://localhost:3001`.

3.  **Configure and run the Frontend:**

    ```bash
    cd ../frontend
    cp .env.example .env
    npm install --legacy-peerdeps
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.


-----

## API Endpoints

The backend provides the following REST API endpoints as per the assessment requirements.

| Method | Endpoint        | Description                                                  |
| :----- | :-------------- | :----------------------------------------------------------- |
| `POST` | `/quizzes`      | Creates a new quiz.                                          |
| `GET`  | `/quizzes`      | Retrieves a list of all quizzes, including their question count. |
| `GET`  | `/quizzes/:id`  | Retrieves the full details of a specific quiz by its ID.       |
| `DELETE`| `/quizzes/:id` | Deletes a specific quiz by its ID.                            |

-----

## Environment Configuration

Environment variables are used for configuration.

  * **Backend (`backend/.env`):**

    ```env
    # Defines the connection URL for the Prisma client.
    DATABASE_URL="file:./dev.db"
    ```

  * **Frontend (`frontend/.env`):**

    ```env
    # Sets the base URL for frontend API requests.
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```