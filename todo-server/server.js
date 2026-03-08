require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* Root Route */
app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});

/* Todo Routes */
app.use("/api/todos", todoRoutes);

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();