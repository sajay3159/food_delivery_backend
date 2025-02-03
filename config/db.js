import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ajaysahani:Enter123@cluster0.6j8qk.mongodb.net/food-delivery').then(() => console.log("DB Connected Successfully"));
}