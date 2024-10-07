import {useFormContext} from "react-hook-form";
import {countryCityObjectList} from "../../constants/hotelForm.constants.js";


export default function DetailsSection(){
    const {register, formState:{errors}} = useFormContext();

    return(
        <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Details</h2>
            <div className="flex flex-col mx-3 gap-4">
                <label className="text-sm font-bold flex-1">
                    Name
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal border-gray-300 focus:outline-violet-500" {...register(
                        'name', {
                            required: "This field is required",
                            minLength: {
                                value: 5,
                                message: 'Name must be at least 5 characters'
                            },
                            maxLength: {
                                value: 50,
                                message: 'Name can\'t be more than 50 characters'
                            }
                        }
                    )}/>
                    {errors.name && 
                        <p className="text-red-500">{errors.name.message}</p>
                    }
                </label>
                <div className="flex flex-row gap-5">
                    <label className="text-sm font-bold w-3/5">
                        Address
                        <input type="text" className="border rounded w-full py-1 px-2 font-normal border-gray-400 focus:outline-violet-500" {...register(
                            'address', {
                                required: "This field is required",
                                minLength: {
                                    value: 10,
                                    message: 'Address must be at least 10 characters'
                                },
                                maxLength: {
                                    value: 80,
                                    message: 'Address can\'t be more than 80 characters'
                                }
                            }
                        )}/>
                        {errors.address && 
                            <p className="text-red-500">{errors.address.message}</p>
                        }
                    </label>
                    <label className="text-sm font-bold w-1/5">
                        <span>City</span>
                        <select className="border border-gray-400 rounded font-bold text-normal px-2 py-1 w-full" {...register("city", {
                            required: "This field is required"
                        })}>
                            <option value="">Select</option>
                            {Object.values(countryCityObjectList).map(cities => (
                                cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))
                            ))}
                        </select>                    
                        {errors.city && 
                            <p className="text-red-500">{errors.city.message}</p>
                        }
                    </label>
                    <label className="text-sm font-bold w-1/5">
                        <span>Country</span>
                        <select className="border border-gray-400 rounded font-bold text-normal px-2 py-1 w-full" {...register("country", {
                            required: "This field is required"
                        })}>
                            <option value="">Select</option>
                            {Object.keys(countryCityObjectList).map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>                    
                        {errors.country && 
                            <p className="text-red-500">{errors.country.message}</p>
                        }
                    </label>
                </div>

                <label className="text-sm font-bold flex-1">
                    Description
                    <textarea rows={6} className="border rounded resize-none w-full py-1 px-2 font-normal border-gray-300 focus:outline-violet-500" {...register(
                        'description', {
                            required: "This field is required",
                            minLength: {
                                value: 50,
                                message: 'Description must be at least 50 characters'
                            },
                            maxLength: {
                                value: 300,
                                message: 'Description can\'t be more than 300 characters'
                            }
                        }
                    )}/>
                    {errors.description && 
                        <p className="text-red-500">{errors.description.message}</p>
                    }
                </label>
                <label className="text-sm font-bold flex-1">
                    <span className="">Star Rating</span>
                    
                    <select name="" className="border rounded border-gray-700 mx-2 px-1 font-normal py-0.5" {...register("starRating", {
                        validate: (value) => {
                            if(value && ![1,2,3,4,5].includes(value)){
                                return 'Star rating must be in range of 1-5'
                            }
                            
                            return true;
                        }
                    })}>
                        <option value="" className="text-sm font-bold">No Star Rating</option>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>{star}</option>
                        ))}
                    </select>
                </label>                       
            </div>
        </div>
    );
}