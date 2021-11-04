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
        isVisible: false,
        isPrivate: false
    },
    {
        name: "events",
        Component: EventsUser,
        path: "/events-user",
        isVisible: false,
        isPrivate: false
    },
    {
        name: "events",
        Component: Events,
        path: "/events-adm",
        isVisible: false,
        isPrivate: false
    },
    {
        name: "login-user",
        Component: LoginUser,
        path: "/login-user",
        isVisible: false,
        isPrivate: false
    },
    {
        name: "login-adm",
        Component: LoginAdm,
        path: "/login-adm",
        isVisible: false,
        isPrivate: false
    },
    {
        name: "singup-user",
        Component: SingupUser,
        path: "/singup-user",
        isVisible: false,
        isPrivate: false
    },
    {
        name: "singup-user",
        Component: SingupAdm,
        path: "/singup-adm",
        isVisible: false,
        isPrivate: false
    },
    {
        name: "initial",
        Component: Initial,
        path: "/",
        isVisible: false,
        isPrivate: false

    }
]