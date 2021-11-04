import linesaPNG from "../../images/lines-p.png"
import classes from "../Initial/Initial.module.css"
import loginClasses from "./SingupAdm.module.css"

import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import { SignUp_ADM } from "../../Services/Adm_request";

export default function SingupAdm() {
    const history = useHistory();

    const changeUser = () => {
        history.push("/singup-user")
    }

    const goEvents = async (values) => {
        const response = await SignUp_ADM(values)
        history.push("/events-adm")
    }

    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            email: '',
            password: '',
            repeatpassword: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            goEvents(values);
        },
    });

    return (
        <div className="App">
            <img src={linesaPNG} alt="lines" className={classes.lines} />

            <div className={classes.containerleft}>

                <h1 className={classes.title}>TECNO</h1>
                <p className={classes.subtitle}>make your event</p>
            </div>

            <div className={classes.containerright} >
                <form className={loginClasses.form} onSubmit={formik.handleSubmit}>
                    <label htmlFor="full-name" className={loginClasses.inLabel}>Full name</label>
                    <input
                        id="full-name"
                        className={loginClasses.requests}
                        placeholder="Full name"
                        name="fullname"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.fullname}
                    />

                    <label htmlFor="username" className={loginClasses.inLabel}>Username</label>
                    <input
                        id="username"
                        className={loginClasses.requests}
                        placeholder="Username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />

                    <label htmlFor="email" className={loginClasses.inLabel}>Email</label>
                    <input
                        id="email"
                        className={loginClasses.requests}
                        placeholder="Email"
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />

                    <label htmlFor="password" className={loginClasses.inLabel}>Password</label>
                    <input
                        id="password"
                        className={loginClasses.requests}
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />

                    <label htmlFor="repeat-password" className={loginClasses.inLabel}>Repeat password</label>
                    <input
                        id="repeat-password"
                        className={loginClasses.requests}
                        placeholder="Repeat password"
                        name="repeatpassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.repeatpassword}
                    />

                    <span className={loginClasses.btnChangeUser} onClick={changeUser}>I'm USER</span >
                    <button type="submit" className={loginClasses.btnsingup}>JOIN</button>

                </form>

            </div>

        </div>
    )
}