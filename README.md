# Material Dashboard

> MERN Project in which I implemented the backend: auth - user authentication: registration, login and profile update. In the frontend I implemented login page, registration page and profile update logic. State handled with Redux and Redux-thunk.

## Website

[https://obrm-material-dashboard.herokuapp.com](https://obrm-material-dashboard.herokuapp.com)

## Usage

### ES Modules in Node

I used ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = your own string
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
