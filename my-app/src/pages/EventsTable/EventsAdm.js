import linesaPNG from "../../images/lines-p.png";
import classes from "../Initial/Initial.module.css";
import loginClasses from "../SingupAdm/SingupAdm.module.css";
import loginUserClasses from "../SingupUser/SingupUser.module.css";
import eventsClasses from "./Events.module.css";
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import { useContext, useState } from "react";
import { MyContext } from "../../Context/Context";

export default function Events() {
    const { events, handleRegisterEvent } = useContext(MyContext)
    const history = useHistory();

    const changeUser = () => {
        history.push("/login-user")
    }

    const doRegisterEvent = async(values)=>{
        await handleRegisterEvent(values)
    }

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
            doRegisterEvent(values)
        },
    });

    return (
        <div className="App">

            <div className={loginUserClasses.containerleft}>

                <form className={eventsClasses.form} onSubmit={formik.handleSubmit}>
                    <p className={eventsClasses.subtitle} >Register new event </p>

                    <label htmlFor="event" className={eventsClasses.toLabel}>Event</label>
                    <input
                        id="event"
                        className={eventsClasses.requests}
                        placeholder="event name"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />

                    <label htmlFor="Description" className={eventsClasses.toLabel}>Description</label>
                    <input
                        id="Description"
                        className={eventsClasses.requests}
                        placeholder="description"
                        name="description"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />

                    <label htmlFor="date" className={eventsClasses.toLabel}>Date</label>
                    <input
                        id="date"
                        className={eventsClasses.requests}
                        placeholder="date"
                        name="date"
                        type="date"
                        onChange={formik.handleChange}
                        value={formik.values.date}
                    />

                    <label htmlFor="time" className={eventsClasses.toLabel}>Time</label>
                    <input
                        id="time"
                        className={eventsClasses.requests}
                        placeholder="time"
                        name="time"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.time}
                    />

                    <label htmlFor="units" className={eventsClasses.toLabel}>Uni. R$</label>
                    <input
                        id="units"
                        className={eventsClasses.requests}
                        placeholder="units sold"
                        name="units"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.units}
                    />
                    <button type="submit" className={loginClasses.btnsingup}>JOIN</button>

                </form>

            </div>

            <div className={classes.containerright} >

                <span className={eventsClasses.titleEvents}>Events</span>
                <div className={eventsClasses.list}>
                    {!events ? <p>vazio</p> :
                        events.map(element => {
                            return <>
                            <p>{element.title} - {element.time}</p>
                            </>
                        })}

                </div>


            </div>

        </div>
    )
}