# Project Cohorts Tools

---

## API Documentation

This is a REST Api created for the mini project Cohort-Tools in the Ironhack bootcamp.
Below you will find the available endpoints of the backend API made with express, mongodb and jwt for authentication.

### Cohorts

| HTTP Verb | URL                      | Request Body | Action                       |
| --------- | ------------------------ | ------------ | ---------------------------- |
| POST      | `/api/cohorts`           | JSON         | Creates a new cohort         |
| GET       | `/api/cohorts`           | (empty)      | Returns all the cohorts      |
| GET       | `/api/cohorts/:cohortId` | (empty)      | Returns the specified cohort |
| PUT       | `/api/cohorts/:cohortId` | JSON         | Edits the specified cohort   |
| DELETE    | `/api/cohorts/:cohortId` | (empty)      | Deletes the specified cohort |

### Students

| HTTP Verb | URL                              | Request Body | Action                                                      |
| --------- | -------------------------------- | ------------ | ----------------------------------------------------------- |
| POST      | `/api/students`                  | JSON         | Creates a new student                                       |
| GET       | `/api/students`                  | (empty)      | Returns all the students                                    |
| GET       | `/api/students/:studentId`       | (empty)      | Returns the specified student                               |
| GET       | `/api/students/cohort/:cohortId` | (empty)      | Returns the students that belongs to the specified cohortId |
| PUT       | `/api/students/:studentId`       | JSON         | Edits the specified student                                 |
| DELETE    | `/api/students/:studentId`       | (empty)      | Deletes the specified student                               |

### Auths

| HTTP Verb | URL            | Request Body | Action                                                   |
| --------- | -------------- | ------------ | -------------------------------------------------------- |
| POST      | `/auth/signup` | JSON         | Creates a new user                                       |
| POST      | `/auth/login`  | JSON         | Login the user and create an JWToken                     |
| GET       | `/auth/verify` | JWToken      | Verify if the JWToken is valid and return the user info. |

### Users

| HTTP Verb | URL                  | Request Body | Action                                                                |
| --------- | -------------------- | ------------ | --------------------------------------------------------------------- |
| GET       | `/api/users/:userId` | (empty)      | Protected Route by JWT Middleware, Returns the user info if logged in |

# For Correct functioning:

- After forking/cloning the repo need to run "npm install" on terminal
- You must create a .env file in the server root with the following global variables MONGODB_URI="your-DB-connection-string", TOKEN_SIGN_SECRET="your-secret-phrase-for-jwt-encrypt/decrypt"(could be anything you want, Example: banana 😊)
- You must create a .env file in the client root with the following global variable VITE_API_URL="your-backend-server-config"
- "cd server" and "npm run dev"
- open a new terminal, "cd client" and "npm run dev"
- Enjoy the project! 🥰
