import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {createUser} from '../apiService.js';
import {useAppContext} from '../contexts/AppContext.jsx';


export default function Register(){
    const {register, watch, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate();
    
    const {showToast, setIsLoggedIn} = useAppContext();

    const mutation = useMutation(createUser, {
        onSuccess: async (result) => {
            showToast({message: result.message, success: result.success});
            await setIsLoggedIn();
            navigate('/');
        },
        onError: (error) => {
            showToast({message: error.message, success: false});
        }
    });

    const onSubmit = handleSubmit((userData) => {
        mutation.mutate(userData);
    });


    return (
        <form className="flex flex-col gap-6 my-16 max-w-3xl mx-auto" onSubmit={onSubmit}>
            <h2 className="text-4xl font-bold text-center">Create an account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Firstname
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters"
                        },
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "First name must only contain alphabet characters"
                        }
                    })}/>
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )} 
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Lastname
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("lastName", {
                        required: "Last name is required",
                        minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters"
                        },
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "Last name must only contain alphabet characters"
                        }
                        
                    })}/>
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal" 
                {...register("email", {
                    required: "Email is required"
                })}/>
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal" 
                {...register("password", {
                    required: "Password is required", 
                    minLength:{
                        value: 8,
                        message: "Password must be at least 8 characters"
                    },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
                        message: "Password must contain at least a small letter, a capital letter, a number and a special character"
                    }
                })}/>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal" 
                {...register("confirmPassword", {
                    validate: (val) => {
                        if(!val){
                            return "Confirm password is required";
                        }
                        else if(val !== watch("password")){
                            return "Passwords don't match";
                        }
                    }
                })}/>
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
            </label>
            <span className="text-center">
                <button type="submit" className="bg-violet-600 text-white font-bold text-xl px-6 py-1.5 rounded-3xl hover:bg-violet-700">Create Account</button>
            </span>
        </form>
    )
}