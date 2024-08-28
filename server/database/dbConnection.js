const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
    process.exit(1);
  }
};

module.exports.dbConnection = dbConnection;
