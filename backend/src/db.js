import mongoose from 'mongoose';


export default async function connectToDB(){
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
        if(!(process.env.NODE_ENV === 'production')){
            console.log(`CONNECTED TO MONGODB!! HOST: ${connectionInstance.connection.host}`);
        }
    } 
    catch(error){
        console.log('DATABASE CONNECTION FAILED!!!');
        if(!(process.env.NODE_ENV === 'production')){
            console.log(error);
        }
        process.exit(1);
    }
}