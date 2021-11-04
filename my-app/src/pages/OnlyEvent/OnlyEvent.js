import eventsUser from "../EventsTable/EventsUser.module.css"

import { useHistory, useParams } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { MyContext } from "../../Context/Context";

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

            {!Qrcode ? null :
                <img src={Qrcode} width="80vw" height="100vh" />
            }

            <div className={eventsUser.container} >
                {!eventOnly ? <p></p> : (
                    <div className={eventsUser.listItem} >
                        <p>{eventOnly.title} - {eventOnly.units} - {eventOnly.time}</p>
                    </div>)
                }
                <button className={eventsUser.addEvent} onClick={() => addEvent(eventOnly.id)}>JOIN</button>
            </div>
        </div>
    )
}