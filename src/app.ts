import { createUser, getUsers } from "@/db";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { engine } from "express-handlebars";
import helmet from "helmet";
import morgan from "morgan";

// Create Express server
const app = express(); // New express instance
const port = process.env.PORT || 3000; // Port number

// Express configuration
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan("dev")); // Enable Morgan
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Routes
app.get("/", async (req, res, next) => {
  res.render("home", { users: await getUsers() });
});

app.post("/", async (req, res) => {
  await createUser(req.body);
  res.redirect("/");
});

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

// Export Express app
export default app;
