import headerStyle from "./Header.module.css"

import profile from "../../images/profile.svg";
import homeIcon from "../../images/home_icon.png";
import ticketIcon from "../../images/ticket_icon.png";

import { useHistory, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../Context/Context";

export default function Header(props) {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const { doLogout } = useContext(MyContext);

    const openWindows = ()=>{
        open? setOpen(false):setOpen(true);
    }

    const goEvents = async (values) => {
        history.push("/events-user")
    }

    return (
        <>
            <div className={headerStyle.header}>

                <div src={profile} className={headerStyle.profile} onClick={openWindows}></div>
                
                {open? <div onClick={openWindows} className={headerStyle.menu}><span onClick={doLogout}>QUIT</span></div>: null}
                <img src={homeIcon} className={headerStyle.icon} />
                <img src={ticketIcon} className={headerStyle.icon} />

            </div>

            <h1 className={headerStyle.logo}>TECNO</h1>

        </>
    )
}