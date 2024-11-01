import SectionItem from "./SectionItem";

export default function Section({title}){
    const data = [
        {
            name: 'Hotel 1',
            url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            name: 'Hotel 2',
            url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            name: 'Hotel 3',
            url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            name: 'Hotel 4',
            url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            name: 'Hotel 5',
            url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
    ];

    return (
        <section className="mb-16">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="grid grid-cols-5 gap-8">
                {data.map(hotel => (
                    <SectionItem data={hotel}/>
                ))}
            </div>
        </section>
    );
}