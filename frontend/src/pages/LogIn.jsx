import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {loginUser} from '../api-services/user.api-services.js';
import {useAppContext} from '../contexts/AppContext.jsx';
import {useNavigate, Link} from 'react-router-dom';


export default function LogIn (){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate();
    
    const {showToast, setIsLoggedIn} = useAppContext();

    const mutation = useMutation(loginUser, {
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
        <form className="flex flex-col gap-4 my-16 max-w-md mx-auto border px-16 py-16 rounded" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold text-center mb-8">Login to your account</h2>
            <label className="text-gray-700 text-sm font-bold flex-1 mx-3">
                Email 
                <input type="text" className="border rounded px-2 py-1 w-full font-normal" {...register("email", {
                    required: "Email is required"
                })}/>
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1 mx-3">
                Password 
                <input type="password" className="border rounded px-2 py-1 w-full font-normal" {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password should be 8 characters"
                    },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
                        message: "Password must contain at least a small letter, a capital letter, a number and a special character"
                    }
                })}/>
                { errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>                    
                )}
            </label>
            <span className="text-center mt-4">
                <button type="submit" className="bg-violet-600 text-white font-semibold text-xl px-6 py-1 rounded-3xl hover:bg-violet-700 hover:cursor-pointer ">Login</button>
                <p className="text-xs">Don't have an account? <Link to="/register" className="underline text-blue-800">Register here</Link></p>
            </span>
        </form>
    )
}