import classes from "../Initial/Initial.module.css";
import eventsClasses from "./Events.module.css";
import { useHistory } from "react-router-dom";
import { useFormik, ErrorMessage } from 'formik';
import { useContext, useState } from "react";
import { MyContext } from "../../Context/Context";
import Header from "../../Components/Header/Header";
import * as Yup from "yup";


export default function Events() {
    const { events, handleRegisterEvent } = useContext(MyContext)
    const history = useHistory();

    const doRegisterEvent = async (values) => {
        await handleRegisterEvent(values)
    }

    const Schema = Yup.object().shape({
        title: Yup.string()
            .required('Required'),
        description: Yup.string()
            .required('Required'),
        date: Yup.string()
            .required('Required'),
        time: Yup.string()
            .required('Required'),
        units: Yup.string()
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            date: '',
            time: '',
            units: '',
        },
        onSubmit: (values) => {
            if (values.title == '' || values.units == '' || values.time == '' || values.date == '' || values.description == '') {
                throw new Error("Insira todos os dados")
            }
            let info = values;
            doRegisterEvent(info);
            alert(JSON.stringify(info, null, 2));

        },
    });

    return (
        <div className="App">
            <Header type="adm" />

            <div className={eventsClasses.containerleft}>


                <form className={eventsClasses.form} onSubmit={formik.handleSubmit} >
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
                        type="time"
                        onChange={formik.handleChange}
                        value={formik.values.time}
                    />


                    <label htmlFor="units" className={eventsClasses.toLabel}>Uni.R$</label>
                    <input
                        id="units"
                        className={eventsClasses.requests}
                        placeholder="units sold"
                        name="units"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.units}
                    />

                    {/* {({ errors, touched }) => (
                        <ErrorMessage name="title" />

                        {errors.title && touched.title ? (<div>{errors.title}</div>) : null}
                    <ErrorMessage name="description" />

                    {errors.description && touched.description ? (<div>{errors.description}</div>) : null}
                    <ErrorMessage name="date" />

                    {errors.date && touched.date ? (<div>{errors.date}</div>) : null}
                    <ErrorMessage name="time" />

                    {errors.time && touched.time ? (<div>{errors.time}</div>) : null}
                    <ErrorMessage name="units" />

                    {errors.units && touched.units ? (<div>{errors.units}</div>) : null}


                )


                } */}
                    <button type="submit" className={eventsClasses.addEvent}>JOIN</button>

                </form >

            </div >

            <div className={classes.containerright} >

                <span className={eventsClasses.titleEvents}>Events</span>
                <div className={eventsClasses.list}>
                    {!events ? <p className={eventsClasses.text}>vazio</p> :
                        events.map(element => {
                            return <>
                                <p>{element.title} - {element.time}</p>
                            </>
                        })}

                </div>


            </div>

        </div >
    )
}