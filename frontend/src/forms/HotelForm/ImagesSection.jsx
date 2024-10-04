import {useFormContext} from "react-hook-form";
import {allowedImageTypes, maxImagesAllowed} from '../../constants/hotelForm.constants.js';

export default function ImagesSection(){
    const {register, formState:{errors}} = useFormContext();
    

    return(
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Images</h2>
            <div className="border rounded border-gray-300 flex flex-col gap-4 mx-2 p-3">
                <input type="file" multiple accept="image/*" className="w-full font-normal" {...register('images', {
                    required: 'At least one image is required',
                    validate: {
                        validFileType: (files) => {
                            if(files.length > maxImagesAllowed) {
                                return `Images can\'t be more than ${maxImagesAllowed}`
                            }
                            
                            const fileTypes = Array.from(files).map(file => file.type); 
                            const hasInvalidType = fileTypes.some(type => !allowedImageTypes.includes(type));

                            return !hasInvalidType || 'Only .jpg, .jpeg, .png, .webp and .avif files are allowed';
                        }
                    }
                })}/>
            </div>
            {errors.images &&
                <span className="text-red-500 font-bold text-sm">{errors.images.message}</span>
            }
        </div>
    )
}