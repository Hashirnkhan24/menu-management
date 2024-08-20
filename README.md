# Menu Management System

## Overview

The Menu Management System is a NodeJS backend application that allows you to manage categories, subcategories, and items. It uses Express.js for the server, Mongoose for MongoDB interactions, and follows a RESTful architecture. This project includes routes for managing categories, subcategories, and items, and it utilizes TypeScript for better type safety and maintainability.

## Features

- **Category Management**: Create, read, update, and delete categories.
- **Subcategory Management**: Manage subcategories associated with categories. (and perform CRUD Operations on them)
- **Item Management**: Handle items that belong to subcategories.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (the projects uses v20.11.1 but you may use any version above v14)
- **MongoDB** (running locally or a cloud instance like MongoDB Atlas/MongoDB Compass)
- **npm**, **pnpm** or **yarn**

### Installation

1. **Clone the Repository**

   ```
   git clone https://github.com/HashirnKhan24/menu-management.git
   cd menu-management
   ```

2. **Install Dependencies**

   Use npm or yarn to install the project dependencies.

   ```
   npm install

   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory of the project and add the following variables:

   ```
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   PORT=3000
   ```

   Replace `mongodb://localhost:27017/your-database-name` with your actual MongoDB URI.

### Running the Application

1. **Start the Server**

   Run the server using npm or yarn:

   ```
   npm run start

   ```

   The server will start and listen on port 3000 by default (or the port specified in the `.env` file). You should see a message in the console indicating that the server is running and MongoDB is connected.

### API Endpoints

- **Categories**

  - `GET /categories` - Get all categories
  - `POST /categories` - Create a new category
  - `GET /categories/:id` - Get a category by ID
  - `GET /categories/search?name=category-name` - Get a category by name
  - `PUT /categories/:id` - Update a category by ID
  - `DELETE /categories/:id` - Delete a category by ID

- **Subcategories**

  - `GET /category/subcategories` - Get all subcategories
  - `POST /category/subcategories` - Create a new subcategory
  - `GET /category/subcategories/:id` - Get a subcategory by ID
  - `GET /category/subcategories/search?name=subcategory-name` - Get a sub-category by name
  - `PUT /category/subcategories/:id` - Update a subcategory by ID
  - `DELETE /category/subcategories/:id` - Delete a subcategory by ID

- **Items**
  - `GET /items` - Get all items
  - `POST /items` - Create a new item
  - `GET /items/:id` - Get an item by ID
  - `GET /items/search?name=item-name` - Get an item by name
  - `PUT /items/:id` - Update an item by ID
  - `DELETE /items/:id` - Delete an item by ID

### Testing

For testing, one can use tools like Postman or Insomnia to manually test the API endpoints. (Note - I have tested it using Postman)

### Troubleshooting

- **Connection Issues**: Ensure MongoDB is running and the URI in the `.env` file is correct.
- **Environment Variables**: Verify that the `.env` file is properly configured and loaded.
- **Dependencies**: Make sure all dependencies are installed correctly by running `npm install` or `yarn install` again.
