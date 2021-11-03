import linesaPNG from "../../images/lines-p.png";
import classes from "../Initial/Initial.module.css";
import loginClasses from "./LoginAdm.module.css";
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import { Login_ADM } from "../../Services/Adm_request";
import { useContext } from "react";
import { MyContext } from "../../Context/Context";

export default function LoginAdm() {
    const { handleLogin } = useContext(MyContext);
    const history = useHistory();

    const changeUser = async () => {
        history.push("/login-user");
    };

    const doLogin = async (values) => {
        await handleLogin(values);
        history.push("/events-adm");
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            doLogin(values);
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
                    <div>
                        <label htmlFor="email" className={loginClasses.toLabel}>Email</label>
                        <input
                            id="email"
                            className={loginClasses.requests}
                            placeholder="Email"
                            name="email"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className={loginClasses.toLabel}>Password</label>
                        <input
                            id="password"
                            className={loginClasses.requests}
                            placeholder="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />

                    </div>
                    <span className={loginClasses.btnChangeUser} onClick={changeUser}>I'm USER</span>
                    <button type="submit" className={loginClasses.btnsingup}>LOGIN</button>

                </form>

            </div>

        </div>
    )
}