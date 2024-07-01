
# Shoes E-commerce Project

## Overview

Welcome to the Shoes E-ommerce Project! This application aims to provide a seamless online shopping experience for users looking to purchase shoes. The platform includes features like product browsing, searching, filtering, user authentication, and a shopping cart.

## Features

- **Product Listing:** Browse a wide range of shoes.
- **Search and Filter:** Find shoes by category, size, brand, and price.
- **User Authentication:** Register, login, and manage user accounts.
- **Shopping Cart:** Add, remove, and manage items in the cart.
- **Order Processing:** Place orders and track order history.

## Repository Structure

This repository is organized into two main branches:

- **`main`:** This branch is used for production-ready code.
- **`backend`:** This branch is used by the backend team to develop and maintain the server-side logic and database interactions.

## Getting Started

### Cloning the Repository

To clone the repository, run:

```sh
git clone git@github.com:jaypee15/nextgen-shoes-ecommerce.git
cd nextgen-shoes-ecommerce
```

### Branches

#### General Workflow

1. **Checkout the main branch**:
   ```sh
   git checkout main
   ```

2. **Pull the latest changes**:
   ```sh
   git pull origin main
   ```

3. **Create a new feature branch**:
   ```sh
   git checkout -b feature/your-feature-name
   ```

#### Frontend Team

The frontend team should create their feature branches from the `main` branch. To start working on the frontend:

1. **Ensure you are on the main branch**:
   ```sh
   git checkout main
   ```

2. **Create a new feature branch**:
   ```sh
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies and start the development server**:
   - Ensure you have Node.js and npm installed.
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the development server:
     ```sh
     npm run dev
     ```

After working on the feature


4. **Commit your changes** and push the feature branch:
   ```sh
   git add .
   git commit -m "Add feature: your feature description"
   ```
5. **Sync with the local main branch**

    ```sh
    git checkout main
    git pull origin main
    git checkout feature/your-feature-name
    git merge main
    ```
6. **Push the feature branch**
   ```sh
    git push origin feature/your-feature-name
   ```
7. **Go to GithHub and create a Pull request**


#### Backend Team

The backend team should create their feature branches from the `backend` branch. To start working on the backend:

1. **Checkout the backend branch**:
   ```sh
   git checkout backend
   ```


2. **Create a new feature branch**:
   ```sh
   git checkout -b feature/your-feature-name
   ```

3. **Set up the development environment**:
   - Ensure you have npm installed 

   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the development server:
     ```sh
     npm run start:dev
     ```
After working on the feature

1. **Commit your changes** and push the feature branch:
   ```sh
   git add .
   git commit -m "Add feature: your feature description"
   ```
2. **Sync with the local backend branch**

    ```sh
    git checkout backend
    git pull origin backend
    git checkout feature/your-feature-name
    git merge backen
    ```
3. **Push the feature branch**
   ```sh
    git push origin feature/your-feature-name
   ```
4. **Go to GithHub and create a Pull request to the remote backend branch**



### Commit Messages

Please follow these guidelines for commit messages:

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.


Happy coding!

```js
// will be reomoved later
```
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

