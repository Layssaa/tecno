import linePurple from "../../images/line-purple.png"
import classes from "../Initial/Initial.module.css"
import loginClasses from "../SingupAdm/SingupAdm.module.css"
import loginClassesAdm from "../LoginAdm/LoginAdm.module.css"

import loginUserClasses from "./LoginUser.module.css"

import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../Context/Context";
import { WallpaperImg } from "../../Components/Wallpaper/WallpaperStyle"

export default function LoginUser() {
    const [validateDate, setValidateDate] = useState();
    const { handleLoginUser, verifyAuthentic } = useContext(MyContext)
    const history = useHistory();

    const changeUser = () => {
        history.push("/login-adm");
    };

    const doLogin = async (values) => {
        setValidateDate(await handleLoginUser(values));
        console.log("///////////////validate///////////////");
        console.log(validateDate);
        if (validateDate) {
            history.push("/events-user");
        }
    };

    useEffect(() => verifyAuthentic(), []);

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
        <>
            <WallpaperImg />
            <div className={classes.AppInitialsPages}>
                <img src={linePurple} alt="lines" className={loginUserClasses.loginUserClasses} />

                <div className={loginUserClasses.containerleft}>
                    <form className={loginClasses.form} onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email" className={loginClassesAdm.toLabel}>Email</label>
                            <input
                                id="email"
                                className={loginClassesAdm.requests}
                                placeholder="Email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className={loginClassesAdm.toLabel}>Password</label>
                            <input
                                id="password"
                                className={loginClassesAdm.requests}
                                placeholder="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />

                        </div>
                        <span className={loginUserClasses.btnChangeUser} onClick={changeUser}>I'm ADM</span>
                        {validateDate === false ? <p className={loginClassesAdm.errorMessage}>Dados inválidos</p> : null}

                        <button type="submit" className={loginUserClasses.btnsingup}>LOGIN</button>

                    </form>
                </div>

                <div className={classes.containerright} >
                    <h1 className={classes.title}>TECNO</h1>
                    <p className={classes.subtitle}>join an event</p>
                </div>

            </div>
        </>
    )
}