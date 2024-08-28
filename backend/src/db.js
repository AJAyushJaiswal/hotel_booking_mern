import mongoose from 'mongoose';


export default async function connectToDB(){
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
        console.log(`CONNECTED TO MONGODB!! HOST: ${connectionInstance.connection.host}`);
    } 
    catch(error){
        console.log('FAILED TO CONNECT TO MONGODB!!!');
        console.log(error);
        process.exit(1);
    }
}