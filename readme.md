# Assignment 03 - L2B5 - (Library Mangement API)

---

## Description

The API is built with TypeScript and Express, designed to manage books in library and manage borrow funtionality. It provides endpoints for CRUD operations on books, borrow management and aggregation pipeline for borrow summery.

---

## Features

- CRUD operations for books and borrow
- Data Validation
- Error Handling
- Filtering by genre, sorting and limiting

---

## Technologies Used

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **Zod validation/mongoose validation**

---

## Getting Started

Instructions on how to get the project up and running locally.

### Prerequisites

What you need to install before setting up the project.

- Node.js (LTS version recommended)
- npm or Yarn (package manager)
- MongoDB

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/shaonexplorer/Level-2-Batch-5-Assignment-03.git
    cd your-api-project
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory of the project and add the following:

    ```
    PORT=5000
    MONGODB_URI=your_database_connection_string
    ```

    _Make sure to replace placeholders like `your_database_connection_string` with your actual values._

4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn run dev
    ```
    The API should now be running at `http://localhost:5000`

---

## API Endpoints

| Method   | Endpoint             | Description                                |
| :------- | :------------------- | :----------------------------------------- |
| `POST`   | `/api/books`         | create a new book                          |
| `GET`    | `/api/books`         | get all books                              |
| `GET`    | `/api/books/:bookId` | Get Book by ID                             |
| `PUT`    | `/api/books/:bookId` | Update Book                                |
| `DELETE` | `/api/books/:bookId` | Delete Book                                |
| `POST`   | `/api/borrow`        | Borrow a Book                              |
| `GET`    | `/api/borrow`        | Borrowed Books Summary (Using Aggregation) |

---
