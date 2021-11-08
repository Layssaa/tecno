import Events from "../pages/EventsTable/EventsAdm";
import EventsUser from "../pages/EventsTable/EventsUser";
import Initial from "../pages/Initial/Initial";
import SingupAdm from "../pages/SingupAdm/SingupAdm";
import SingupUser from "../pages/SingupUser/SingupUser";
import LoginAdm from "../pages/LoginAdm/LoginAdm";
import LoginUser from "../pages/LoginUser/LoginUser";
import OnlyEvent from "../pages/OnlyEvent/OnlyEvent";

export const routers = [
    {
        name: "events",
        Component: OnlyEvent,
        path: "/events/:id",
        isPrivate: true
    },
    {
        name: "events",
        Component: EventsUser,
        path: "/events-user",
        isPrivate: true
    },
    {
        name: "events",
        Component: Events,
        path: "/events-adm",
        isPrivate: true
    },
    {
        name: "login-user",
        Component: LoginUser,
        path: "/login-user",
        isPrivate: false
    },
    {
        name: "login-adm",
        Component: LoginAdm,
        path: "/login-adm",
        isPrivate: false
    },
    {
        name: "singup-user",
        Component: SingupUser,
        path: "/singup-user",
        isPrivate: false
    },
    {
        name: "singup-user",
        Component: SingupAdm,
        path: "/singup-adm",
        isPrivate: false
    },
    {
        name: "initial",
        Component: Initial,
        path: "/",
        isPrivate: false

    }
]