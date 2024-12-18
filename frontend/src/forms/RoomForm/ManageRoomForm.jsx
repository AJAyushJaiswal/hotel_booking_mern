import {useForm} from 'react-hook-form';
import {roomFacilitiesList} from '../../constants/roomForm.constants.js';
import {allowedImageTypes} from '../../constants/hotelForm.constants.js';
import {useEffect} from 'react';


export default function ManageRoomForm({onSave, isLoading, prevRoomData}){
    const {register, formState: {errors}, handleSubmit, watch, reset, setValue} = useForm();
    
    useEffect(() => {
        reset({
            ...prevRoomData, 
            roomNumbers: prevRoomData?.roomNumbers?.join(', '),
            adults: prevRoomData?.capacityPerRoom?.adults,
            children: prevRoomData?.capacityPerRoom?.children
        }); 
    }, [prevRoomData, reset]);
    
    const submitForm = handleSubmit((roomFormData) => {
        const formData = new FormData();
        formData.append('name', roomFormData.name);
        formData.append('bedType', roomFormData.bedType);
        formData.append('view', roomFormData.view);
        formData.append('roomSize', roomFormData.roomSize);
        formData.append('bedCount', roomFormData.bedCount);
        formData.append('pricePerNight', roomFormData.pricePerNight);
        formData.append('adults', roomFormData.adults);
        formData.append('children', roomFormData.children);
        formData.append('totalQuantity', roomFormData.totalQuantity);
        formData.append('description', roomFormData.description);
        
        roomFormData.roomNumbers.split(',')?.forEach((roomNo, index) => {
            formData.append(`roomNumbers[${index}]`, Number.parseInt(roomNo.trim()));
        });

        Array.from(roomFormData.facilities)?.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        Array.from(roomFormData.imageFiles)?.forEach((image) => {
            formData.append(`imageFiles`, image);
        });
        
        roomFormData.images?.forEach((url, index) => {
           formData.append(`imageUrls[${index}]`, url); 
        })
        
        onSave(formData);
    });
    
    const imageUrls = watch('images');
    
    const removeImageUrl = (imageUrl) => {
        setValue('images', imageUrls?.filter(image => image !== imageUrl));
    }

    return (
        <div className="border rounded-lg py-8 px-12 w-96 m-auto my-14" style={{width:'700px', boxShadow: '0 0 15px 4px rgb(0, 0, 0, 0.1)'}}>
            <h1 className="text-xl font-semibold text-center text-gray-600">{!prevRoomData ? 'Add' : 'Edit'} Room</h1>
        
            <form className="mt-4" onSubmit={submitForm}>
                <div className="flex mb-4">
                    <label className="w-4/6 relative">
                        <span className="font-medium text-gray-600">Name</span>
                        <input type="text" className="border border-gray-300 rounded-md w-full px-2 py-1 text-sm text-gray-600 focus:outline-violet-400" placeholder="eg: Presidential Suite" {...register('name', {
                            required: 'This field is required',
                            minLength: {
                                value: 5,
                                message: 'Name must be at least 5 characters'
                            },
                            maxLength: {
                                value: 30,
                                message: 'Name can\'t be more than 30 characters'
                            }
                        })}/>
                        {errors.name &&(
                            <span className="text-red-500 absolute -bottom-4 left-0" style={{fontSize: '0.75rem'}}>{errors.name.message}</span>
                        )}
                    </label>
                    <label className="w-2/6 ml-3 relative">
                        <span className="font-medium text-gray-600">Bed Type</span>
                        <input type="text" className="border border-gray-300 rounded-md px-2 py-1 w-full text-sm text-gray-600 focus:outline-violet-400" placeholder="eg: King" {...register('bedType', {
                            required: 'This field is required'
                        })}/>
                        {errors.type &&(
                            <span className="text-red-500 absolute -bottom-4 left-0" style={{fontSize: '0.75rem'}}>{errors.type.message}</span>
                        )}
                    </label>
                </div>               
                <div className="flex mb-4">
                    <label className="w-2/6 mr-3 relative">
                        <span className="font-medium text-gray-600">View</span>
                        <input type="text" className="border border-gray-300 rounded-md w-full px-2 py-1 text-sm text-gray-600 focus:outline-violet-400" placeholder="eg: sea view" {...register('view', {
                            required: 'This field is required',
                            minLength: {
                                value: 7,
                                message: 'View must be at least 7 characters'
                            },
                            maxLength: {
                                value: 20,
                                message: 'View must be at least 20 characters'
                            },
                        })}/>
                        {errors.view &&(
                            <span className="text-red-500 absolute -bottom-4 left-0" style={{fontSize: '0.67rem'}}>{errors.view.message}</span>
                        )}
                    </label>
                    <label className="w-2/6 mr-3 relative">
                        <span className="font-medium text-gray-600">Room Size</span>
                        <input type="number" className="border border-gray-300 rounded-md w-full py-1 px-2 text-sm text-gray-600 w-full focus:outline-violet-400" step=".01" min={1} placeholder="square meters" {...register('roomSize', {
                            required: 'This field is required',
                            min: {
                                value: 1,
                                message: 'Room size can\'t be less than 1'
                            }
                        })}/>
                        {errors.roomSize &&(
                            <span className="text-red-500 absolute -bottom-4 left-0" style={{fontSize: '0.75rem'}}>{errors.roomSize.message}</span>
                        )}
                    </label>
                    <label className="w-2/6 relative">
                        <span className="font-medium text-gray-600">Bed Count</span>
                        <input type="number" className="border border-gray-300 rounded-md w-full py-1 px-2 text-sm text-gray-600 w-full focus:outline-violet-400" placeholder="min: 1" {...register('bedCount', {
                            required: 'This field is required',
                            min: {
                                value: 1,
                                message: 'Bed count can\'t be less than 1'
                            },
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Bed count must be +ve integer'
                            }
                        })}/>
                        {errors.bedCount &&(
                            <span className="text-red-500 absolute -bottom-4 left-0" style={{fontSize: '0.75rem'}}>{errors.bedCount.message}</span>
                        )}
                    </label>
                </div>               
                <div className="flex mb-4">
                    <label className="w-2/6 mr-3 relative">
                        <span className="font-medium text-gray-600">Price per night</span>
                        <input type="number" className="border border-gray-300 rounded-md w-full py-1 px-2 text-sm text-gray-600 w-full focus:outline-violet-400" step="0.1" placeholder="Rupees" {...register('pricePerNight', {
                            required: 'This field is required',
                            min: {
                                value: 0,
                                message: 'Price per night can\'t be less than 0'
                            }
                        })}/>
                        {errors.pricePerNight &&(
                            <span className="text-red-500 absolute -bottom-4 left-0" style={{fontSize: '0.68rem'}}>{errors.pricePerNight.message}</span>
                        )}
                    </label>
                    <label className="w-2/6 mr-3 relative">
                        <span className="font-medium text-gray-600">Adults</span>
                        <input type="number" className="border border-gray-300 rounded-md py-1 px-2 w-full text-sm text-gray-600 w-full focus:outline-violet-400" placeholder='min: 1' {...register('adults', {
                            required: 'This field is required',
                            min: {
                                value: 1,
                                message: 'Adult capacity can\'t be less than 1'
                            },
                            pattern: {
                                value: /^[0-9]+$/, 
                                message: 'Adult capacity must be a integer'
                            }
                        })}/>
                        {errors.adults &&(
                            <span className="text-red-500 absolute -bottom-4 left-0" style={{fontSize: '0.68rem'}}>{errors.adults.message}</span>
                        )}
                    </label>
                    <label className="w-2/6 relative">
                        <span className="font-medium text-gray-600">Children</span>
                        <input type="number" className="border border-gray-300 rounded-md w-full py-1 px-2 text-sm text-gray-600 w-full focus:outline-violet-400" placeholder='min: 0' {...register('children', {
                            required: 'This field is required',
                            min: {
                                value: 0,
                                message: 'Child capacity can\'t be less than 0'
                            },
                            pattern: {
                                value: /^[0-9]+$/, 
                                message: 'Child capacity must be a integer'
                            }
                        })}/>
                        {errors.children &&(
                            <span className="text-red-500 absolute -bottom-4 left-0" style={{fontSize:'0.68rem'}}>{errors.children.message}</span>
                        )}
                    </label>
                </div>
                <div className="flex mb-4">
                    <label className="w-2/6 relative">
                        <span className="font-medium text-gray-600">Total Rooms</span>
                        <input type="number" className="border border-gray-300 rounded-md w-full py-1 px-1 text-sm text-gray-600 w-full focus:outline-violet-400" placeholder="eg: 3" {...register('totalQuantity', {
                            required: 'This field is required',
                            min: {
                                value: 1,
                                message: 'Total rooms can\'t be less than 1'
                            },
                            pattern: {
                                value: /^[0-9]+$/, 
                                message: 'Total rooms must be +ve integer'
                            }
                        })}/>
                        {errors.totalQuantity &&(
                            <span className="text-red-500 absolute -bottom-4 left-0" style={{fontSize: '0.68rem'}}>{errors.totalQuantity.message}</span>
                        )}
                    </label>
                    <label className="w-4/6 ml-3 relative">
                        <span className="font-medium text-gray-600">Room Numbers</span>
                        <input type="text" className="border border-gray-300 rounded-md w-full py-1 px-2 text-sm text-gray-600 w-full focus:outline-violet-400" placeholder="eg: 201, 202, 203, etc." {...register('roomNumbers', {
                            required: 'This is required',
                            pattern: {
                                value: /^(\s*[1-9][0-9]*(\s*,\s*[1-9][0-9]*)*\s*)*$/, 
                                message: 'This field can only contain [0-9][ ][,]'
                            },
                            validate: (values) => {
                                const roomNumbers = values.split(',').map(room => Number.parseInt(room.trim()));

                                if(roomNumbers.length !== Number.parseInt(watch('totalQuantity'))){
                                    return 'Room numbers must match total rooms field';
                                }
                            }
                        })}/>
                        {errors.roomNumbers &&(
                            <span className="text-red-500 absolute -bottom-4 left-0" style={{fontSize: '0.75rem'}}>{errors.roomNumbers.message}</span>
                        )}
                    </label>
                </div>
                <label className="block mb-3 relative">
                    <span className="font-medium text-gray-600">Description</span>
                    <textarea rows={4} className="border border-gray-300 rounded-md w-full resize-none py-1 px-2 text-sm text-gray-600 focus:outline-violet-400" placeholder="A brief description of the room" {...register('description', {
                        required: 'This field is required', 
                        minLength: {
                            value: 10,
                            message: 'Description must be at least 10 characters'
                        },
                        maxLength: {
                            value: 300,
                            message: 'Description can\'t be more than 300 characters'
                        }
                    })}/>
                    {errors.description && (
                        <span className="text-red-500 absolute -bottom-3 left-0" style={{fontSize: '0.75rem'}}>{errors.description.message}</span>
                    )}
                </label>
                <div className="mb-2">
                    <span className="text-gray-700 font-medium">Facilities</span>
                    <div className="grid grid-cols-4">
                        {roomFacilitiesList.map((facility) => (
                                <label key={facility}>
                                    <input type="checkbox" value={facility} {...register('facilities')}/>
                                    <span className="ml-2 text-sm text-gray-700">{facility}</span>
                                </label>
                        ))}
                    </div>
                </div>
                <div className="mb-5 relative">
                    <p className="text-gray-700 font-medium mb-1">Images</p>
                    <div className="grid grid-cols-6 gap-3 mb-3">
                        {imageUrls?.map(url => (
                            <div className="relative" key={url}>
                                <img src={url} alt="Hotel Room" className="h-24 w-24"/>
                                <button className="absolute -top-1 -right-1 p-0.5 border border-gray-400 bg-gray-300 rounded-full" onClick={() => removeImageUrl(url)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={9} height={9} fill="gray"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <label className="">
                        <input type="file" multiple accept="image/*" className="w-full text-sm text-gray-600 file:bg-violet-50 file:text-sm file:font-semibold file:border-0 file:rounded-full file:py-2 file:px-4 file:text-violet-600 file:mr-3 hover:file:bg-violet-100" {...register('imageFiles', {
                            validate: files => {
                                const totalfiles = (files?.length || 0) + (imageUrls?.length || 0);
                                
                                if(totalfiles < 3){
                                    return 'Images can\'t be less than 3';
                                }
                                else if(totalfiles > 6){
                                    return 'Images can\'t be more than 6';
                                }

                                const fileTypes = Array.from(files).map(file => file.type);
                                const hasInvalidType = fileTypes.some(type => !allowedImageTypes.includes(type));
                                
                                return !hasInvalidType || 'Only jpeg, jpg, avif, png, webp files allowed';
                            }
                        })}/>
                    </label>
                    {errors.imageFiles &&(
                        <span className="text-red-500 absolute -bottom-4 left-0" style={{fontSize: '0.75rem'}}>{errors.imageFiles.message}</span>
                    )}
                </div>
        
                <div className="text-center">
                    <button type="submit" className="bg-violet-500 text-white py-0.5 px-4 rounded-full border-0 align-center hover:bg-violet-600 active:bg-violet-700 disabled:bg-violet-500" disabled={isLoading}>{!isLoading ? 'Save' : 'Saving...'}</button>
                </div>
            </form>
        </div>
    )
}