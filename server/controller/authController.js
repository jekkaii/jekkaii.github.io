const bycrpt = require("bcrypt"); // For password encryption
const UserModel = require("../model/User");

const signup = async (req, res) => {
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
};

const login = async (req, res) => {
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
};

const logout = async (req, res) => {
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
};

module.exports = { signup, login, logout };
