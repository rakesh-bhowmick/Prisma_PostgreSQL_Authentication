<!-- Project Setup Guide -->

npm init
npm i express
npm i nodemon
npm i dotenv
npm i bcrypt (for hash password)

<!-- package.json -->

"type": "module", (for ES6 support)
"scripts": {
"start": "nodemon server.js"
},

<!-- create server.js :- -->

import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 3003;

app.get("/", (req, res) => {
console.log("Prisma with PostgreSQL");
return res.send("Prisma with PostgreSQL");
});

app.listen(PORT, () => console.log(`Server Is running ${PORT}`));

<!-- create .env  -->

<!-- Initialize prisma   -->

https://www.prisma.io/docs/prisma-orm/quickstart/prisma-postgres
npx prisma init
npm install prisma --save-dev
npm install @prisma/client

<!-- Install PostgreSQL -->

https://www.postgresql.org/download/

<!-- Connect Database with the prisma -->

Then create database and then change databse crediential from the .env and change url as per the postgresql databse creditienal
DATABASE_URL="postgresql://postgres:GMT@localhost:5432/prisma_learning?schema=public"

Then is vs code run - "npx prisma db pull" to check the project connected to the posgreSQL server or not.

<!-- Create a folder and file for dtaabase code -->

create db/db.config.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
log: ["query"],
});

export default prisma;

<!-- noe in prisma\schema.prisma create model  -->

model user {
id Int @id @default(autoincrement())
name String
email String @unique
password String
created_at DateTime @default(now())
}

<!-- Afer create model covert this model to the databse run this commend -->

npx prisma migrate dev --name user_model

<!-- Prisma Crud Operation -->

https://www.prisma.io/docs/orm/prisma-client/queries/crud

<!-- Fllow These process to fix error  -->

rmdir /s /q node_modules
del package-lock.json
npm install
npx prisma validate
npx prisma generate
dir node_modules\.prisma\client
npm start

<!-- all queries (filter, search, CRUD ) -->

https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search
