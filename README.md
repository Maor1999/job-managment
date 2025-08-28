what each file contains:
server.js- 

routesApi.js- all API routes and endpoints, include middlewares and exspress-async-handler

schemaModel.js- mongoose schema + model(job) with trim and length rules

zodValidation.js- zod schema(create) + updateSchema (partial) validate(schema) middleware; .strict(), trims, rejects empty body,
 returns normalized errors

validateObjectId.js- validates req.params.id as exactly 24 hex chars, sends 400 "Invalid id" if not

sendResponse.js- sendResponse.js – Unified JSON envelope: { status, message, data }

errorHandler.js – Global error middleware; sends JSON via sendResponse

jobsData.js – Array of predefined job objects (seed data)

seedJobs.js – Inserts jobsData if collection empty; otherwise “already exists

connectToDB.js – Connects Mongoose using MONGODB_URL; logs success, exits on failure

package.json – Project metadata + deps; scripts (start: node server.js)

dockerfile – Node 20 image; installs deps, copies app, exposes 3000, runs server.js

.dockerignore – Excludes node_modules, .env from build context

.gitignore – Ignores node_modules, .env locally
How to run?
Create .env:

MONGODB_URL=mongodb://host.docker.internal:27017/jobsDB
PORT=3000
NODE_ENV=development


Build & run:

docker build -t backend-image .
docker run -d --name jobs-api --restart unless-stopped --env-file .env -p 3000:3000 backend-image


Test:
GET http://127.0.0.1:3000/api/jobs

Seed (dev only): POST http://127.0.0.1:3000/api/jobs/seed

Option B — Local (Node + Mongo installed)

Create .env:

MONGODB_URL=mongodb://localhost:27017/jobsDB
PORT=3000
NODE_ENV=development


Install & start:

npm ci
npm start


Test:
GET http://127.0.0.1:3000/api/jobs
