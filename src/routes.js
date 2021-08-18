import LoginScreen from "./components/Authentication/LoginScreen";
import ErrorPage from "./components/_common/ErrorPage"
import LogoutScreen from "./components/Authentication/LogoutScreen";
import HomeScreen from "./components/Home/HomeScreen"
import ProfileScreen from "./components/Profile/ProfileScreen"
import DashboardScreen from "./components/Dashboard/Home/DashboardScreen"
import TToolsAdminScreen from "./components/TTools/Admin/TToolsAdminScreen"
import ApplicationsScene from "./components/Dashboard/Applications/ApplicationsScene"

const routes = [
    {
        path: "/login",
        name: "Login",
        component: LoginScreen,
        layout: "/auth",
    },
    {
        path: "/logout",
        name: "Logout",
        component: LogoutScreen,
        layout: "/auth",
    },
    {
        path: "/",
        name: "Home",
        component: HomeScreen,
        layout: "/app"
    },
    {
        path: "/dashboard",
        name: "Dashboard Home",
        component: DashboardScreen,
        layout: "/app"
    },
    {
        path: "/dashboard/hire",
        name: "Applications",
        component: ApplicationsScene,
        layout: "/app"
    },
    {
        path: "/ttools/admin",
        name: "Admin",
        component: TToolsAdminScreen,
        layout: "/app"
    },
    {
        path: "/profile",
        name: "Profile",
        component: ProfileScreen,
        layout: "/app"
    },
    {
        path: "*",
        name: "404",
        component: ErrorPage,
        layout: "/auth",
    },
    {
        path: "*",
        name: "404",
        component: ErrorPage,
        layout: "/app",
    },
]

export default routes;