
```markdown
# ZuAI Blog Application

## Overview

This project is a web application that allows users to manage posts. It includes functionalities such as user authentication, creating, viewing, updating, and deleting posts, as well as searching and commenting on posts. The application uses Redux for state management, Axios for API requests, and Ant Design for UI components.

## Features

- **User Authentication**: Sign up, log in, and log out users.
- **Post Management**: Create, view, update, and delete posts.
- **Search Posts**: Filter posts by title.
- **Comment Management**: Add and fetch comments for posts.
- **Loading and Error Handling**: Provide feedback during data fetching and handle errors gracefully.

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later) or [yarn](https://yarnpkg.com/) (optional)

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone 'https://github.com/Pranjal0981/Zupay-frontend.git'
   cd Zupay-frontend
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Configuration**

   Create a `.env` file in the root directory of your project with the following environment variable:

   ```env
   VITE_BASE_URL=https://zupay-backend.onrender.com
   ```

## Running the Project

1. **Start the Development Server**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn start
   ```

   This command starts the development server and opens the application in your default web browser.

## Usage

### User Authentication

- **Sign Up**: Send user data (e.g., email, password) to `/user/signup` to create a new account.
- **Log In**: Send login credentials to `/user/login`. On successful authentication, a token is saved in localStorage.
- **Log Out**: Make a request to `/user/logout` to clear user data and navigate to the home page.

### Post Management

- **Create Post**: Send post data to `/post/create-post/{userId}` to create a new post.
- **View Posts**: Fetch all posts from `/post/view-posts`.
- **View Post by ID**: Fetch a specific post by ID from `/post/view-post/{postId}`.
- **Update Post**: Update a post by sending updated data to `/post/update-post/{postId}`.
- **Delete Post**: Delete a post by ID by sending a request to `/post/delete-post/{postId}`.
- **Search Posts**: Filter posts based on the title by sending a search term to `/post/search?title={searchTerm}`.

### Comment Management

- **Fetch Comments**: Get comments for a post from `/post/fetchComments/{postId}`.
- **Add Comment**: Add a comment to a post by sending data to `/post/addComments/{postId}/{userId}`.

## Redux Actions

- **`asyncCurrentUser`**: Fetches the current user and handles token validation.
- **`asyncSignupUser`**: Handles user sign-up.
- **`asyncSignIn`**: Authenticates the user and fetches current user details.
- **`asyncSignOut`**: Logs out the user and clears data.
- **`asyncCreateNewPost`**: Creates a new post.
- **`asyncViewPosts`**: Fetches all posts.
- **`asyncViewPostById`**: Fetches a post by ID.
- **`asyncUpdatePostById`**: Updates a post by ID.
- **`asyncDeletePostById`**: Deletes a post by ID.
- **`asyncSearchPost`**: Searches for posts based on the title.
- **`asyncFetchComments`**: Fetches comments for a specific post.
- **`asyncAddComments`**: Adds a comment to a specific post.

## Development and Contributing

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**

   Edit files as necessary and test your changes.

3. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

4. **Push Your Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**

   Go to the repository on GitHub and create a pull request for your branch.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or issues, please contact [pranjalshukla245@gmail.com](mailto:pranjalshukla245@gmail.com).
```
