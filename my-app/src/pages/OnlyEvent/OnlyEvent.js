import eventsUser from "../EventsTable/EventsUser.module.css";
import OnlyEventStyle from "./OnlyEvent.module.css";

import { useHistory, useParams } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { MyContext } from "../../Context/Context";
import Header from "../../Components/Header/Header";
import SvgUserVR from "../../Components/SvgUserVR/UserVRSvg";

export default function OnlyEvent() {
    const { events, handleAddEvent, verifyAuthentic } = useContext(MyContext);
    const [Qrcode, setQrCode] = useState();
    const [eventOnly, setEventOnly] = useState();
    const { id } = useParams();


    const findElement = async (id) => {
        console.log("---------- ID PARAMS ----------");
        console.log(id);
        setEventOnly(await events.find(element => element.id == id));
        console.log('=====EVENT======');
        console.log(eventOnly);
    }
    useEffect(() => verifyAuthentic(), []);

    useEffect(() => {
        findElement(id)
    }, [])

    const history = useHistory();

    // Precisa do type do usuário
    // const backHome = (id) => {
    //     history.push(`/events/${id}`)
    // }

    const addEvent = async (id) => {
        setQrCode(await handleAddEvent(id));
        console.log("QRCODE URL");
        console.log(Qrcode);
    }

    if (!eventOnly) {
        return (
            <div className="App">
                <Header />
                <div className={eventsUser.container} >
                    <p>Loading</p>
                </div>
                <SvgUserVR />

            </div>
        )
    }

    return (
        <div className="App">
            <Header />

            <div className={eventsUser.container} >

                <div className={OnlyEventStyle.OnlyEventBox} >
                    <div className={OnlyEventStyle.InfoBox}>
                        <h1>{eventOnly.title}</h1>
                        <span>{eventOnly.date}</span> <span>{eventOnly.time}</span>

                        <p>
                            {eventOnly.description}
                        </p>

                        <span>R${eventOnly.units},00</span>
                    </div>

                    <button className={eventsUser.addEvent} onClick={() => addEvent(eventOnly.id)}>JOIN</button>

                </div>

            </div>

            <SvgUserVR />

            {!Qrcode ? null : (
                <>
                    <div className={OnlyEventStyle.qrcodemessage}>
                        <p >Este é o seu QRcode,
                            ele será usado para entrar no evento.</p>
                        <p > Atenção: Só pode ser usado um vez.</p>
                    </div>


                    <img src={Qrcode} className={OnlyEventStyle.qrcode} />
                </>
            )}



        </div>
    )
}