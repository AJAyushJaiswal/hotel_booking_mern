import {useFormContext} from "react-hook-form";
import {facilitiesList} from "../../constants/hotelForm.constants.js";


export default function FacilitiesSection(){
    const {register, formState: {errors}} = useFormContext();

    return(
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Facilities</h2>
            <div className="mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {facilitiesList.map((facility) => (
                    <label key={facility}>
                        <input type="checkbox" value={facility} {...register('facilities')}/>
                        <span className="ml-1">{facility}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}