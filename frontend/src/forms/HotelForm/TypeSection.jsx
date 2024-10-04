import {useFormContext} from "react-hook-form";
import {hotelTypesList} from "../../constants/hotelForm.constants.js";

export default function TypeSection(){
    const {register, watch, formState:{errors}} = useFormContext();
    const typeWatch = watch('type');

    return(
        <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">Type</h2>
            <div className="mx-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                {hotelTypesList.map((type) => (
                    <label key={type} className={`rounded-3xl py-1.5 pl-4 cursor-pointer ${typeWatch === type ? 'bg-violet-500 text-white' : 'bg-gray-300'}`}>
                        <input type="radio" className="hidden" value={type} {...register('type', {
                            required: 'This field is required'
                        })}/>
                        <span>{type}</span>
                    </label>
                ))} 
            </div>
            {errors.type && (
                <span className="text-red-500 font-bold">{errors.type.message}</span>
            )}
        </div>
    );
}