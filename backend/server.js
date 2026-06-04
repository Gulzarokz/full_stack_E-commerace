import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './Database/db.js';
import userRoutes from './routes/userRoutes.js';


const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// routes
app.use("/api/v1/users", userRoutes);



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at port ${PORT}`);
}
)