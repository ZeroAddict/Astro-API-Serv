export default function SideBar(children) {
    const { handleToggleMdl, APODdata } = children
    return (
        <div className="sidebar">
            <div onClick={handleToggleMdl} className="bgOverlay"></div>
            <div className="sidebarCon">
                <h2>{APODdata?.title}</h2>
                <div className="descriptionContr">
                    <p className="descriptionTitle">{APODdata?.date}</p>
                    <p>{APODdata?.explanation}</p>
                </div>
                <button onClick={handleToggleMdl}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}