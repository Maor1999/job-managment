import mongoose from "mongoose";
import process from 'process';

const connectToDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to MongoDB");
    }
    catch(err){
        console.error("Error connecting to DB!", err.message);
        process.exit(1);
    }
}
export default connectToDB;