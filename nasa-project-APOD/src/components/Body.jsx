export default function Body(children) {
    const { data } = children
    return (
        <div className="imgContr">
            <img src={data.hdurl} alt={data.title || 'background-img'} className="bgImage" />
        </div>
    )
}