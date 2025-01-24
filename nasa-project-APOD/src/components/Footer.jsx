export default function Footer(props) {
    const { handleToggleModal, APODdata } = props

    return (
        <footer>
            <div className="bgGrad"></div>
            <div>
                <h1>APOD PROJECT</h1>
                <h2>{APODdata?.title}</h2>
            </div>
            <button onClick={handleToggleModal}>
                <i className="fa-solid fa-circle-info"></i>
            </button>
        </footer>
    )
}