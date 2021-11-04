//import classes from "../Initial/Initial.module.css";
//import eventsClasses from "./Events.module.css";
import eventsUser from "./EventsUser.module.css"

//import { useHistory } from "react-router-dom";
//import { useFormik } from 'formik';
import { useContext, useState } from "react";
import { MyContext } from "../../Context/Context";

export default function EventsUser() {
    const { events, handleAddEvent } = useContext(MyContext);
    const [Qrcode, setQrCode] = useState();

    //const history = useHistory();

    /* const changeUser = () => {
        history.push("/login-user")
    } */

    const addEvent = async (id) => {
        console.log('FRONT-EVENTUSER');
        console.log(id);
        setQrCode(await handleAddEvent(id));
    }

    /* const formik = useFormik({
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
    }); */

    return (
        <div className="App">

            {!Qrcode? null:
           <Qrcode/>
            }

            <div className={eventsUser.container} >
                <span className={eventsUser.titleEvents}>Events</span>
                <div className={eventsUser.list}>
                    {!events ? <p>vazio</p> :
                        events.map((element, index) => {
                            console.log(element.id);
                            return (
                                <div className={eventsUser.listItem} key={index}>
                                    <div className={eventsUser.boxEvent}>
                                        <p>{element.title} - {element.units} - {element.time}</p>
                                    </div>
                                    <button className={eventsUser.addEvent} onClick={() => addEvent(element.id)}>JOIN</button>
                                </div>)
                        })}

                </div>


            </div>

        </div>
    )
}