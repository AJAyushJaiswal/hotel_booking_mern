import Section from '../components/Section.jsx';

export default function Home(){
    return (
        <div className="my-20 w-full">
            <div className="">Search Section</div>
            <Section title="Recommended For You"/>
            <Section title="Top rated hotels"/>
            <Section title="Popular Destinations"/>
            <Section title="Browse Rooms By Type"/>
            <Section title="Rooms at all price ranges" />
        </div>
    )        
}