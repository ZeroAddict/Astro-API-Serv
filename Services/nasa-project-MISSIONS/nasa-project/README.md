# NASA Mission Control Project

The completed version of the NASA project from [Complete Node.js Developer: Zero to Mastery](https://academy.zerotomastery.io/a/aff_jqtq5631/external?affcode=441520_1jw4f2ay).
ATTRIBUTED TO ZERO TO MASTERY


## Getting Started

1. Node.js should be installed. Preferably, the LTS 
2. [Mongo Atlas](https://www.mongodb.com/atlas/database) database online or start a local MongoDB database.
3. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.
4. In the terminal, run: `npm install`

## Running the Project

1. In the terminal, run: `npm run deploy`
2. Browse to the mission control frontend at [localhost:8000](http://localhost:8000) and schedule an interstellar launch!

## Docker

1. Ensure you have the latest version of Docker installed
2. Run `docker build -t nasa-project .`
3. Run `docker run -it -p 8000:8000 nasa-project`

## Running the Tests

To run any automated tests, run `npm test`. This will: 
* Run all the client-side tests: `npm test --prefix client`
* Run all the server-side tests: `npm test --prefix server` 
