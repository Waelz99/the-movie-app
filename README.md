# The Movie App
A backend built on top of `NestJS` framework, performs CRUD operations over [TMDB APIs](https://www.themoviedb.org/) integrating multiple services to ensure availability, and scalability.

## Prerequisites 
- Install [Docker](https://docs.docker.com/desktop/setup/install/windows-install/)
- Get your own `TMDB_API_KEY` from [TMDB](https://developer.themoviedb.org/docs/getting-started)

## Installation
Clone the repository
```
git clone https://github.com/Waelz99/the-movie-app
```
Create `.env.docker` file with these fields:
```
# Database configs
DB_HOST=host.docker.internal
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=movies-app

# TMDB configs
TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_MAX_PAGE_COUNT=5

# JWT authentication
JWT_SECRET=

# Redis
REDIS_HOST=host.docker.internal
REDIS_PORT=6379
```

Get your own `TMDB_API_KEY` from [TMDB](https://developer.themoviedb.org/docs/getting-started)

Generate your own `JWT_SECRET` if needed, you can use this command for example:
```
openssl rand -base64 32
```

Finally, run docker to build and run the components
```
docker-compose up
```
--------------
## Project structure
![image](https://github.com/user-attachments/assets/d3ae9474-f140-4144-b65f-587d4a7e0457)

Files structure:
- src/: Contains all the application source code.
    - config/: Contains configs, mostly DB configs
    - movies/: Contains Movies module
         - tmdb/: Contains TMDB module
    - ratings/: Contains Ratings module
    - redis/: Contains Redis module
    - users/: Contains Users module
    - watchlists/: Contains Watchlists module
- .env: Configuration for environment variables.
- Dockerfile: Docker configuration for creating the container.
- docker-compose.yml: Configures services for multi-container setups.
- package.json: Lists dependencies and scripts for the project.
- tsconfig.json: TypeScript configuration.
- README.md: Contains project documentation.
- .gitignore: Specifies files to ignore in version control.

## Database
Database is build using `PostgreSQL` which is a SQL structured database:
![image](https://github.com/user-attachments/assets/fd1cf9f0-d942-4ae2-bc3e-02f32228da7b)

## Project modules
The project has 7 modules, each one is responsible for sub-part of the project
![image](https://github.com/user-attachments/assets/2b9f1f88-9a12-4244-8a65-dc6df8c39dbe)

### UsersModule
Users module is responsible for performing CRUD operations on app's users, including registering users, hashing passwords, and setting up JWT tokens for authentications.

Available endpoints:
- **POST /users/** - register user by email, password
- **POST /users/login/** - logins user by email, password
- **GET /users/:id** - gets user by id
- **PUT /users/:id** - updates user record
- **DELETE /users/:id** - delets user given id

### TMDBModule
This module is responsible for dealing with TMDB APIs, like getting genres, or movies list.

No endpoints available for this module, it's intended for internal use only.

### MoviesModule
This module is responsible for performing operations over Movies table, for retrieving paginated movies list, or movie's details.

Available endpoints:
- **GET /movies/**
- **GET /movies/:id**

### RedisModule
This module is responsible for performing caching operations.

No endpoints available for this module, it's intended for internal use only.

### RatingsModule
This module is responsible for rating movies by users, and performing other CRUD operations.

Available endpoints:
- **POST /movies/{movieId}/ratings/users/{userId}** - rate a movie
- **DELETE /movies/{movieId}/ratings/users/{userId}** - remove rating
- **GET /movies/{movieId}/ratings/users/{userId}** - get users' rating to movie
- **GET /movies/{movieId}/ratings** - get all movie's ratings

### WatchlistsModule
This module is responsible for performing CRUD operations on adding/removing a movie from user's watchlist.

Available endpoints:
- **POST /users/{userId}/watchlist/movies/{movieId}** - adds movie to user's watchlist
- **DELETE /users/{userId}/watchlist/movies/{movieId}** - removes a movie from user's watchlist
- **GET /users/{userId}/watchlist** - get user's watchlist
