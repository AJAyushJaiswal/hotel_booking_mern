import Section from '../components/Section.jsx';
import SearchForm from '../forms/SearchForm/SearchForm.jsx';

export default function Home(){
    return (
        <div className="my-20 w-full">
            <div className="mb-24 flex flex-col items-center">
                <p className="text-2xl font-semibold mb-14">Book your favorite hotel</p> 
                <div>
                    <SearchForm boxCss={'relative px-12 pt-14 pb-16'} searchBtnCss={'px-8 py-2.5 absolute -bottom-6'}/>
                </div>
            </div>
            <Section title="Recommended For You"/>
            <Section title="Top rated hotels"/>
            <Section title="Popular Destinations"/>
            <Section title="Browse Rooms By Type"/>
            <Section title="Rooms at all price ranges" />
        </div>
    )        
}