const express = require("express");
const cors = require("cors"); // For cross platform compatability
const dotenv = require("dotenv"); // Used to manage environment variables like URL front and back and mongodb
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { dbConnection } = require("./database/dbConnection");
const authRouter = require("./routes/authRoutes");

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  // Session Middleware
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  dbConnection();
  console.log(`Server is running on port ${process.env.PORT}!`);
});

app.get("/user", (req, res) => {
  //get user details

  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json("User is not Authenticated");
  }
});
