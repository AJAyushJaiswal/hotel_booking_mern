import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (image) => {
    return new Promise((res, rej) => {
        if(!image || !image.buffer){
            return rej(new Error('Image buffer not provided!'));
        }
        
        const stream = cloudinary.uploader.upload_stream({
            resource_type: 'image',
            folder: 'hotelGod'
        },
        (error, result) => {
            if(error){
                if(process.env.NODE_ENV !== 'production'){
                    console.log('Error uploading to cloudinary!');
                    console.log(error);
                }
                return rej(new Error('Error uploading image to cloudinary!\n'));
            }

            return res(result.url);
        });
        
        stream.end(image.buffer);
    });
}


export {
    uploadToCloudinary
}