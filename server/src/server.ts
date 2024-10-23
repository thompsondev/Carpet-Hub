// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource } from "./db/data-source";
import seedRoles from "./helpers/seedRoles";

// Create an Express application
const app = express();

// Specify the port number for the server
const port = 3000;

// Define a route for the root path ('/')
app.get("/", (req: Request, res: Response) => {
  // Send a response to the client
  res.send("Hello, TypeScript + Node.js + Express!");
});

// Start the server and listen on the specified port
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
