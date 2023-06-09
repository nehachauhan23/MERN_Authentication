import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb Connected : ${conn.connection.host}`);
    }catch(error){
        console.log(`Error : ${error}`);
    }
}

export default connectDB