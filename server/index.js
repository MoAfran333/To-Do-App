import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/authRoutes.js";
import toDoRoutes from "./routes/ToDoList.js";
import connectDB from "./utils/connection.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).json({ id: null, email: null, todoList: [] });
  }
}

app.get("/", (req, res) => {
  res.send("Server Started Running");
});

app.use("/api/user", authRoutes);
app.use("/api/auth", isAuthenticated, profileRoutes);
app.use("/api/todolist", isAuthenticated, toDoRoutes);

const port = process.env.PORT;

app.listen(5000, () => {
  connectDB();
  console.log(`App is Successfully running on Port ${port}`);
});
