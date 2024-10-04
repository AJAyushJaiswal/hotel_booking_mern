import {useFormContext} from "react-hook-form";

export default function ContactSection(){
    const {register, formState:{errors}} = useFormContext();

    return(
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Contacts</h2>
            <div className="flex gap-6 mx-2">
                <label className="text-sm font-bold flex-1">
                    Contact Number
                    <input type="text" className="border rounded border-gray-300 font-normal w-full py-1 px-2 focus:outline-violet-500" {...register('contactNo', {
                        required: 'This field is required',
                        // pattern: {
                        //     value: /^\d+$/,
                        //     message: 'This field must only contain digits(0-9)!'
                        // }
                    })}/>
                    {errors.contactNo && (
                        <span className="text-red-500">{errors.contactNo.message}</span>
                    )}
                </label> 
                <label className="text-sm font-bold flex-1">
                    Email
                    <input type="email" className="border rounded border-gray-300 font-normal w-full py-1 px-2 focus:outline-violet-500" {...register('email', {
                            validate: {
                                validEmail: value => 
                                    value === '' ||
                                    /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$/.test(value) ||
                                    'Please enter a valid email address'
                        }
                    })}/>
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                </label> 
            </div>
        </div>
    );
}