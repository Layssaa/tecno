import erro from "../../images/404-Error.svg";
import styleError from "./Error.module.css";


export default function DashboardError() {

    return (
        <img src={erro} className={styleError.ImgError}/>
    )
}