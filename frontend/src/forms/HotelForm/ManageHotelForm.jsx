import {FormProvider, useForm} from 'react-hook-form';
import DetailsSection from './DetailsSection.jsx';
import TypeSection from './TypeSection.jsx';
import FacilitiesSection from './FacilitiesSection.jsx';
import ContactSection from './ContactSection.jsx';
import ImagesSection from './ImagesSection.jsx';
import {useEffect} from 'react';


export default function ManageHotelForm({onSave, isLoading, hotelData}){
    const formMethods = useForm();
    
    useEffect(() => {
        formMethods.reset(hotelData);
    }, [hotelData, formMethods.reset])
    
    const submitForm = formMethods.handleSubmit((newHotelData) => {
        const formData = new FormData();
        formData.append('name', newHotelData.name);
        formData.append('address', newHotelData.address);
        formData.append('city', newHotelData.city);
        formData.append('country', newHotelData.country);
        formData.append('description', newHotelData.description);
        formData.append('contactNo', newHotelData.contactNo);
        formData.append('email', newHotelData.email);
        if([1,2,3,4,5].includes(newHotelData.starRating)) formData.append('starRating', newHotelData.starRating);
        formData.append('type', newHotelData.type);

        newHotelData.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });
        Array.from(newHotelData.imageFiles).forEach((image) => {
            formData.append(`imageFiles`, image);
        })
        
        if(newHotelData.images){
            newHotelData.images.forEach((imageUrl, index) => {
                formData.append(`images[${index}]`, imageUrl);
            })
        }

        onSave(formData);
    });

    return(
        <FormProvider {...formMethods}>
            <form className="border border-gray-300 rounded py-12 px-16 my-20 max-w-4xl mx-auto" onSubmit={submitForm}>
                <h1 className="text-2xl font-bold text-center mb-3">{hotelData ? 'Edit Hotel' : 'Add Hotel'}</h1>
                <DetailsSection/>
                <ContactSection/>
                <TypeSection/>
                <FacilitiesSection/>
                <ImagesSection/>

                <div className="text-center">
                    <button type="submit" disabled={isLoading} className="bg-violet-600 text-white px-7 py-1 font-semibold text-xl rounded-3xl disabled:bg-violet-500">{isLoading ? 'Saving...' : 'Save'}</button> 
                </div>
            </form> 

        </FormProvider>
    );
}