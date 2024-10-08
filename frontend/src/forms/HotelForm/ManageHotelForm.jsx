import {FormProvider, useForm} from 'react-hook-form';
import DetailsSection from './DetailsSection.jsx';
import TypeSection from './TypeSection.jsx';
import FacilitiesSection from './FacilitiesSection.jsx';
import ContactSection from './ContactSection.jsx';
import ImagesSection from './ImagesSection.jsx';


export default function ManageHotelForm({onSave, isLoading}){
    const formMethods = useForm();
    
    const submitForm = formMethods.handleSubmit((hotelData) => {

        const formData = new FormData();
        formData.append('name', hotelData.name);
        formData.append('address', hotelData.address);
        formData.append('city', hotelData.city);
        formData.append('country', hotelData.country);
        formData.append('description', hotelData.description);
        formData.append('contactNo', hotelData.contactNo);
        formData.append('email', hotelData.email);
        if([1,2,3,4,5].includes(hotelData.starRating)) formData.append('starRating', hotelData.starRating);
        formData.append('type', hotelData.type);

        hotelData.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });
        Array.from(hotelData.images).forEach((image) => {
            formData.append(`images`, image);
        })

        onSave(formData);
    });

    return(
        <FormProvider {...formMethods}>
            <form className="border border-gray-300 rounded py-12 px-16 my-20 max-w-4xl mx-auto" onSubmit={submitForm}>
                <h1 className="text-2xl font-bold text-center mb-3">Add Hotel</h1>
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