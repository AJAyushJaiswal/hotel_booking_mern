import {useFormContext} from "react-hook-form";
import {allowedImageTypes, maxImagesAllowed} from '../../constants/hotelForm.constants.js';

export default function ImagesSection(){
    const {register, formState:{errors}, watch, setValue} = useFormContext();
    
    const imageUrls = watch('images');
    
    const removeImageUrl = (imageUrl) => {
        setValue('images', imageUrls.filter(image => imageUrl !== image));
    }

    return(
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Images</h2>
            <div className="border rounded border-gray-300 flex flex-col gap-4 mx-2 p-3">
                <div className="grid grid-cols-6 gap-4">
                    {imageUrls?.map((url, index) => (
                        <div className="relative" key={index}>
                            <img src={url} alt={`Hotel Image ${index}`} className="min-w-full min-h-full object-cover border border-gray-100 shadow"/>
                            <button className="absolute -top-1.5 -right-1.5 border border-gray-400 rounded-full p-0.5" onClick={() => removeImageUrl(url)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={10} height={10} fill="gray"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
                            </button>
                        </div>
                    ))}
                </div>
                <input type="file" multiple accept="image/*" className="w-full font-normal" {...register('imageFiles', {
                    validate: {
                        validFileType: (files) => {
                            const totalImages = files.length + (imageUrls?.length || 0);
                            
                            if(totalImages < 1){
                                return `At least 1 image must be added`;
                            }
                            else if(totalImages > maxImagesAllowed) {
                                return `Images can\'t be more than ${maxImagesAllowed}`;
                            }
                            
                            const fileTypes = Array.from(files).map(file => file.type); 
                            const hasInvalidType = fileTypes.some(type => !allowedImageTypes.includes(type));

                            return !hasInvalidType || 'Only .jpg, .jpeg, .png, .webp and .avif files are allowed';
                        }
                    }
                })}/>
            </div>
            {errors.imageFiles &&
                <span className="text-red-500 font-bold text-sm">{errors.imageFiles.message}</span>
            }
        </div>
    )
}