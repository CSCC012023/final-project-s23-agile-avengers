# final-project-s23-agile-avengers

final-project-s23-agile-avengers created by GitHub Classroom

## Development

`client` folder contains the frontend portion of the application built using Next.js and React with Typescript. The `server` folder contains the backend built using Node.js and Express for the endpoints with database connection to PostgreSQL.

### Installation

#### Prerequisites

Nodejs and PostgreSQL should be installed and running.

Also, install `nodemon` for better dev experience: `npm install --global nodemon`

#### To launch React Frontend

```{cmd}
cd client
npm install
npm run dev
```

#### To launch Node.js server

```{cmd}
cd server
npm install
nodemon src/index.ts
```

#### To view the database

```{cmd}
cd server
psql -U postgres
```
