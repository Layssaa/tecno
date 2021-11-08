import linePurple from "../../images/line-purple.png"
import classes from "../Initial/Initial.module.css"
import loginClasses from "../SingupAdm/SingupAdm.module.css"
import loginUserClasses from "./SingupUser.module.css"

import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { MyContext } from "../../Context/Context";
import { WallpaperImg } from "../../Components/Wallpaper/WallpaperStyle";

export default function SingupUser() {
    const [msgError, SetMsgError] = useState('');
    const history = useHistory();
    const { handleSignupUser } = useContext(MyContext);

    const changeUser = () => {
        history.push("/singup-adm");
    };

    const goEvents = async (values) => {
        await handleSignupUser(values);
        history.push("/events-user")
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
            if (values.fullname === '' || values.repeatpassword === '' || values.password === '' || values.email === '' || values.username === '') {
                return SetMsgError("Insira todos os dados.")
            }

            if (values.repeatpassword !== values.password) {
                return SetMsgError("As senhas são diferentes.")
            }

            alert(JSON.stringify(values, null, 2));
            goEvents(values);
        },
    });

    return (
        <>
          <WallpaperImg/>
        <div className={classes.AppInitialsPages}>
            <img src={linePurple} alt="lines" className={loginUserClasses.loginUserClasses} />

            <div className={loginUserClasses.containerleft} >
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

                    <span className={loginUserClasses.btnChangeUser} onClick={changeUser}>I'm Adm</span >
                    <span>{msgError}</span>
                    <button type="submit" className={loginUserClasses.btnsingup}>JOIN</button>
                </form>
            </div>

            <div className={classes.containerright}>
                <h1 className={classes.title}>TECNO</h1>
                <p className={classes.subtitle}>join an event</p>
            </div>

        </div>
        </>
    )
}