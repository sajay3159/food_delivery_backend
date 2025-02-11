import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoutes.js";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    // console.log('Gracefully shutting down...');
    mongoose.connection.close(() => {
        process.exit(0);
    });
});
