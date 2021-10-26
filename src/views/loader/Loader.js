import loaderStyles from './Loader.css'
function Loader()
{
    return (
        <div id={"main"}>
            <div className="preloader">
                <div className="preloader__square"></div>
                <div className="preloader__square"></div>
                <div className="preloader__square"></div>
                <div className="preloader__square"></div>
            </div>

        </div>
    )
}

export default Loader;