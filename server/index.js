const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors"); // For cross platform compatability
const dotenv = require("dotenv"); // Used to manage environment variables like URL front and back and mongodb
const UserModel = require("./user");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bycrpt = require("bcrypt"); // For password encryption

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

mongoose // MongoDB Middleware
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongnoDB", err));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);

// Using async for bcrpt to finish

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkExistingUser = await UserModel.findOne({ email });
    if (checkExistingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bycrpt.hash(password, 12);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Post request has failed");
  }
});

app.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      // Check if user exists
      const checkPasswordMatch = await bycrpt.compare(
        password,
        existingUser.password
      );
      if (checkPasswordMatch) {
        // Check if password matches
        req.session.user = {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        };
        res.status(200).json("Login Success");
      } else {
        res.status(401).json("Password is Incorrect");
      }
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/user", (req, res) => {
  //get user details

  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json("User is not Authenticated");
  }
});

app.post("/logout", (req, res) => {
  console.log(req.session.user);

  req.session.destroy((err) => {
    if (err) {
      res.status(500)({ error: "Failed to logout" });
    } else {
      // res.clearCookie('sid')
      console.log("Logged Out");
      res.status(200).json("Logout Success");
    }
  });
});
