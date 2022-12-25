import express from "express";
import dotenv from "dotenv";
import projects from "./routes/projects";
import users from "./routes/users";
import chapters from "./routes/chapters";
import versions from "./routes/versions";
import cors from "cors";
import mongoose from "mongoose";
const app = express();

// configure dotenv
dotenv.config();
// support parsing of application/json type post data
app.use(express.json({ limit: "30mb" }));
// support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// configure cors
app.use(cors());

// Routes for the API
app.use("/projects", projects);
app.use("/users", users);
app.use("/chapters", chapters);
app.use("/versions", versions);

//s

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Connected to server!");
});

const PORT = process.env.PORT || 5000;

// start the Express server and connect to the database
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    // disable tslint for this line
    // tslint:disable-next-line: no-console
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  // tslint:disable-next-line: no-console
  .catch((error) => console.log(error.message));
