import eventsUser from "./EventsUser.module.css"

import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { MyContext } from "../../Context/Context";
import Header from "../../Components/Header/Header";
import SvgUserVR from "../../Components/SvgUserVR/UserVRSvg";

import imgEvent from "../../images/EventImgTest.jpg"

export default function EventsUser() {
    const { events, handleAddEvent, verifyAuthentic } = useContext(MyContext);
    const [Qrcode, setQrCode] = useState();

    const history = useHistory();

    const goToEvent = (id) => {
        history.push(`/events/${id}`)
    }

    useEffect(() => verifyAuthentic(), []);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            date: '',
            time: '',
            units: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    if(!events){
        return(
            <div className="App">
            <Header />
            <SvgUserVR />
        </div>
        )
    }

    return (
        <div className="App">
            <Header />
            {!Qrcode ? null :
                <img src={Qrcode} width="80vw" height="100vh" />
            }

            <div className={eventsUser.container} >
                <div className={eventsUser.list}>

                    {!events ? <p>vazio</p> :
                        events.map((element, index) => {
                            return (
                                <div className={eventsUser.boxEvent} key={element.id} onClick={() => goToEvent(element.id)}>
                                    <div className={eventsUser.boxImg}>
                                        <img src={imgEvent} className={eventsUser.imgEvent} />
                                    </div>
                                    <span className={eventsUser.EventTitle}>{element.title}</span><span className={eventsUser.EventDate}>{element.date}</span>
                                    <span className={eventsUser.EventPrice}>R${element.price},00</span>
                                </div>
                            )
                        })}

                </div>


            </div>

            <SvgUserVR />
        </div>
    )
}