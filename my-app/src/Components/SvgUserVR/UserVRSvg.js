import imgUserVR from "../../images/VR-user-dark.svg";
import styleSVG from"./SvgUserVR.module.css";

export default function SvgUserVR(props) {

    return (
        <img src={imgUserVR} className={styleSVG.imgVR} />
    )
}