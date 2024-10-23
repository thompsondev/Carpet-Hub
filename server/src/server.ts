import express, { Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource } from "./db/data-source";
import seedRoles from "./helpers/seedRoles";
import { errorHandler } from "./middlewares/error";
import createError from "http-errors";
import appConfig from "./config/appConfig";

// Create an Express application
const app = express();

// Specify the port number for the server
const port = appConfig.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js + Express!");
});

// ! Throw error for unhandled routes
app.use(() => {
  throw createError.NotFound("Route not found");
});

// ! Global error handler
app.use(errorHandler());

// Connect to database and start server and listen on the specified port
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected successfully");
    await seedRoles(); // Seed roles
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
