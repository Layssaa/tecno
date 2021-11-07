import DrawVR from "../../images/VR-purple-main.svg"
import linesaPNG from "../../images/lines-p.png"
import classes from "./Initial.module.css"
import { useHistory } from "react-router-dom";
import { WallpaperImg } from "../../Components/Wallpaper/WallpaperStyle";
import { useContext, useEffect } from "react";
import { MyContext } from "../../Context/Context";


export default function Initial() {
    const history = useHistory();
    const { verifyAuthentic } = useContext(MyContext);

    const goSingup = () => {
        history.push("/singup-adm");
    };

    const goLogin = () => {
        history.push("/login-adm");
    };

    useEffect(() => verifyAuthentic(), []);

    return (
        <>
            <WallpaperImg />
            <div className={classes.AppInitialsPages}>
                <img src={linesaPNG} alt="lines" className={classes.lines} />
                <div className={classes.containerleft}>
                    <h1 className={classes.title}>TECNO</h1>
                    <p className={classes.subtitle}>Join an immersive event</p>
                </div>

                <div className={classes.containerright}>

                    <img src={DrawVR} alt="Draw Virtual Reallity" className={classes.drawVR} />
                    <button type="button" className={classes.btnLogin} onClick={goLogin} >LOGIN</button>
                    <button type="button" className={classes.btnjoin} onClick={goSingup}>JOIN US</button>

                </div>

            </div>
        </>
    )
}