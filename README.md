# HEY-CONNECT SOCIAL MEDIA APP

A simple social media app built using React, Node.js, Express, and MongoDB.

## Table of Content:

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login: Users can create an account and log in using their registered credentials.
- Post creation: Logged-in users can create posts and share their thoughts or content with others.
- Friend management: Users can add friends and view their friend list.
- Image uploading: Users can upload pictures to include in their posts.

## Technologies

`React`, `MongoDB`, `React-router` , `Mongoose`, `Redux toolkit`, `NodeJS`, `ExpressJS`, `Material UI`

## Prerequisites

- Node.js and npm installed on your machine
- MongoDB database connection string
- JSON Web Token secret

## Getting Started

#### Clone the repository:

```
    git clone https://github.com/Samowusu/HEY-CONNECT.git
```

### Backend

1. Install dependencies:

```
    cd hey-connect-backend
    npm install
```

2. Configure the environment variables:

- Create a `.env` file in the root directory of the project.
- Define the necessary environment variables, such as the MongoDB connection string and JSON Web Token secret.

  For example:

  ```
    MONGO_URL=<your mongo connection string>
    PORT=3001
    JWT_SECRET=<your json web token secret>
    JWT_LIFETIME=30d
  ```

  Replace `<your mongo connection string>` and `<your json web token secret>` with your actual MongoDB connection string and JSON Web Token secret respectively.

3. Start the development server:

```
    npm start
```

#### Frontend

1. Install dependencies:

```
    cd hey-connect-frontend
    npm install
```

2. Start the development server:

```
    npm start
```

## Folder Structure

- [**hey-connect-backend**](hey-connect-backend)
  - [**config**](hey-connect-backend/config)
  - [**controllers**](hey-connect-backend/controllers)
  - [**db**](hey-connect-backend/db)
  - [**errors**](hey-connect-backend/errors)
  - [**middleware**](hey-connect-backend/middleware)
  - [**mockData**](hey-connect-backend/mockData)
  - [**models**](hey-connect-backend/models)
  - [**public**](hey-connect-backend/public)
  - [**routes**](hey-connect-backend/routes)
- [**hey-connect-frontend**](hey-connect-frontend)
  - [**public**](hey-connect-frontend/public)
  - [**src**](hey-connect-frontend/src)
    - [**assets**](hey-connect-frontend/src/assets)
      - [**images**](hey-connect-frontend/src/assets/images)
    - [**components**](hey-connect-frontend/src/components)
      - [**commons**](hey-connect-frontend/src/components/commons)
      - [**widgets**](hey-connect-frontend/src/components/widgets)
    - [**config**](hey-connect-frontend/src/config)
    - [**screens**](hey-connect-frontend/src/screens)
      - [**home**](hey-connect-frontend/src/screens/home)
      - [**login**](hey-connect-frontend/src/screens/login)
      - [**profile**](hey-connect-frontend/src/screens/profile)
    - [**state**](hey-connect-frontend/src//state)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to submit a pull request.

## License

This project is licensed under the [MIT License.](https://opensource.org/license/mit/)
