import eventsUser from "../EventsTable/EventsUser.module.css";
import OnlyEventStyle from "./OnlyEvent.module.css";

import { useHistory, useParams } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { MyContext } from "../../Context/Context";
import Header from "../../Components/Header/Header";
import SvgUserVR from "../../Components/SvgUserVR/UserVRSvg";

export default function OnlyEvent() {
    const { events, handleAddEvent } = useContext(MyContext);
    const [Qrcode, setQrCode] = useState();
    const { id } = useParams();
    const [eventOnly, setEventOnly] = useState();

    const findElement = async (id) => {
        setEventOnly(await events.find(element => element.id == id));
        console.log(eventOnly);
    }

    useEffect(() => {
        findElement(id)
    }, [])

    const history = useHistory();
    const goToEvent = (id) => {
        history.push(`/events/${id}`)
    }

    const addEvent = async (id) => {
        console.log('FRONT-EVENTUSER');
        console.log(id);
        setQrCode(await handleAddEvent(id));
    }

    return (
        <div className="App">
            <Header />

            <div className={eventsUser.container} >

                <div className={OnlyEventStyle.OnlyEventBox} >
                    <div className={OnlyEventStyle.InfoBox}>
                        <h1>Name event</h1>
                        <span>00-00-00</span> <span>8h30</span>

                        <p>
                            LoREM LoREM LoREM LoREM LoREM LoREM LoREM LoREMLoREM LoREM LoREM LoREM LoREM LoREM LoREM LoREMLoREM LoREM LoREM LoREM LoREM LoREM LoREM LoREM
                        </p>

                        <span>R$00,00</span>
                    </div>

                    <button className={eventsUser.addEvent} onClick={() => addEvent(eventOnly.id)}>JOIN</button>

                </div>

            </div>

            <SvgUserVR />


            {/* {!Qrcode ? null :
                <img src={Qrcode} width="80vw" height="100vh" />
            }

            <div className={eventsUser.container} >
                {!eventOnly ? <p></p> : (
                    <div className={eventsUser.listItem} >
                        <p>{eventOnly.title} - {eventOnly.units} - {eventOnly.time}</p>
                    </div>)
                }
                <button className={eventsUser.addEvent} onClick={() => addEvent(eventOnly.id)}>JOIN</button>
            </div> */}
        </div>
    )
}