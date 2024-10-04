const hotelTypesList = ['Budget', 'Boutique', 'Luxury', 'Resort', 'Apartment', 'Ski Resort', 'Vacation', 'Business', 'Hostel', 'Motel', 'Cabin', 'Golf Resort', 'Hiking Resort', 'Family', 'Love'];


const countriesList = ['India', 'Sri Lanka', 'USA', 'UK', 'Japan', 'South Korea', 'UAE', 'Egypt', 'South Africa', 'Maldives', 'Bahamas'];


const countryCityObjectList = {
    'India': ['Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Jaipur', 'Delhi', 'Hyderabad', 'Patna', 'Pune', 'Ahemadabad', 'Gandhi Nagar', 'Goa', 'Lucknow'],
    'Sri Lanka': ['Colombo, Galle', 'Kandy', 'Negombo', 'Jaffna'], 
    'USA': ['New York City', 'Los Angeles', 'Chicago', 'Houston', 'San Franciso', 'Austin', 'Boston', 'Dallas'], 
    'UK': ['London', 'Birmingham', 'Manchester', 'Edinburgh', 'Glasgow', 'Liverpool'], 
    'Japan': ['Tokyo', 'Kyoto', 'Osaka', 'Yokohama', 'Sapporo'], 
    'South Korea': ['Seoul', 'Busan', 'Incheon', 'Deagu', 'Daejeon'], 
    'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'], 
    'Egypt': ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan'], 
    'South Africa': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'], 
    'Maldives': ['Male', 'Maafushi', 'Thulusdhoo', 'Dhigurah', 'Valmendhoo'], 
    'Bahamas': ['Nassau', 'Freeport', 'Marsh Harbour', 'Treasure Cay', 'Bimini']
};


const facilitiesList = [
    'Wi-Fi',
    'Parking',
    'Valet',
    'Concierge Service',
    'Laundry Service',
    'Housekeeping',
    'Business Center',
    'Breakfast Buffet',
    'Bar/Lounge',
    'Swimming Pool',
    'Spa',
    'Massage Service',
    'Gym',
    'Sauna',
    'Golf Course',
    'Conference Room',
    'Banquet Hall',
    'Auditorium',
    'Babysitting Services',
    'Playground',
    'Wheelchair Access',
    'Air Conditioning',
    'Heating',
    'Refrigerator',
    'Television',
    'Airport Shuttle',
    'Car Rental Desk',
    'Bicycle Rentals',
    'Garden',
    'Beach Access'
];


const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const maxImagesAllowed = 6;


export {
    hotelTypesList,
    countriesList,
    countryCityObjectList,
    facilitiesList,
    allowedImageTypes,
    maxImagesAllowed
}