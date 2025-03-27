require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
