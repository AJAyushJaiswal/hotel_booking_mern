export default function SectionItem({data}){
    return(
        <div className="shadow-lg rounded-xl">
            <img src={data.url} alt="image" className="rounded-t-lg"/>
            <p className="text-center my-1">{data.name}</p>
        </div>
    );
}