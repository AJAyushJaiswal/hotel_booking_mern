import 'dotenv/config';

import connectToDB from './db.js';
import app from './app.js';


connectToDB().then(() => {
    try{
        app.on('error', (error) => {
            if(!(process.env.NODE_ENV === 'production')){
                console.log(`ERROR: ${error}`);
            }
            process.exit(1);
        })

        let port = process.env.PORT || 7000;
        app.listen(port, ()=> {
            if(!(process.env.NODE_ENV === 'production')){
                console.log(`Listening at localhost: ${port}!!`);
            }
        });
    }    
    catch(error){
        console.log('DATABASE CONNECTION FAILED!!!');        
        if(!(process.env.NODE_ENV === 'production')){
            console.log(error);
        }
        process.exit(1);
    }
})
