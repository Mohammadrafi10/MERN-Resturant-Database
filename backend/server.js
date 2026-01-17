const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./configs/db");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorHandler");
const recipesRoute = require("./routes/recipesRoute");
const LoggerFunction = require("./middlewares/logger");





//middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(LoggerFunction());
connectDB();
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));





//routes

app.use("/api/users", userRoute);
app.use("/api/recipes", recipesRoute);



// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
