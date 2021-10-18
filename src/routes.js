import LoginScreen from "./components/Authentication/LoginScreen";
import ErrorPage from "./components/_common/ErrorPage"
import LogoutScreen from "./components/Authentication/LogoutScreen";
import HomeScreen from "./components/Home/HomeScreen"
import ProfileScreen from "./components/Profile/ProfileScreen"
import DashboardScreen from "./components/Dashboard/Home/DashboardScreen"
import TToolsAdminScreen from "./components/TTools/Admin/TToolsAdminScreen"
import ApplicationsScreen from "./components/Dashboard/Applications/ApplicationsScreen"
import PayoutScreen from "./components/Dashboard/Payout/PayoutScreen"
import CompanyManagementScreen from "./components/Dashboard/Management/CompanyManagementScreen"
import TToolsScreen from "./components/TTools/Home/TToolsScreen";
import BizScreen from "./components/TTools/Biz/BizScreen";
import BizMapScreen from "./components/TTools/Biz/map/BizMapScreen";
import BizHomeScreen from "./components/TTools/Biz/BizHomeScreen";

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
        layout: "/home"
    },
    {
        path: "/dashboard",
        name: "Dashboard Home",
        component: DashboardScreen,
        layout: "/home"
    },
    {
        path: "/dashboard/company",
        name: "Company",
        component: CompanyManagementScreen,
        layout: "/home"
    },
    {
        path: "/dashboard/hire",
        name: "Applications",
        component: ApplicationsScreen,
        layout: "/home"
    },
    {
        path: "/dashboard/payout",
        name: "Payout",
        component: PayoutScreen,
        layout: "/home"
    },
    {
        path: "/ttools/admin",
        name: "Admin",
        component: TToolsAdminScreen,
        layout: "/home"
    },
    {
        path: "/ttools",
        name: "TTools Home",
        component: TToolsScreen,
        layout: "/home"
    },
    {
        path: "/ttools/biz",
        name: "Businesses",
        component: BizHomeScreen,
        layout: "/home"
    },
    {
        path: "/ttools/biz/map",
        name: "Biz Map",
        component: BizMapScreen,
        layout: "/home"
    },
    {
        path: "/profile",
        name: "Profile",
        component: ProfileScreen,
        layout: "/home"
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
        layout: "/home",
    },
]

export default routes;