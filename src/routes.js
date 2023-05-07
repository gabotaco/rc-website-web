import ApplicationsScreen from './components/Dashboard/Applications/ApplicationsScreen';
import ApplyScreen from './components/Apply/ApplyScreen';
import BizMapScreen from './components/TTools/Biz/map/BizMapScreen';
import BizScreen from './components/TTools/Biz/BizScreen';
import CompanyManagementScreen from './components/Dashboard/Management/CompanyManagementScreen';
import CompletionistScreen from './components/TTools/Completionist/CompletionistScreen';
import DashboardScreen from './components/Dashboard/Home/DashboardScreen';
import ErrorPage from './components/_common/ErrorPage';
import HomeScreen from './components/Home/HomeScreen';
import LoginScreen from './components/Authentication/LoginScreen';
import LogoutScreen from './components/Authentication/LogoutScreen';
import PayoutScreen from './components/Dashboard/Payout/PayoutScreen';
import ProfileScreen from './components/Profile/ProfileScreen';
import StorageMapScreen from './components/TTools/Storages/map/StorageMapScreen';
import StoragesScreen from './components/TTools/Storages/StoragesScreen';
import TToolsAdminScreen from './components/TTools/Admin/TToolsAdminScreen';
import TToolsScreen from './components/TTools/Home/TToolsScreen';
import UnderConstruction from './components/_common/UnderConstruction';

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: LoginScreen,
		layout: '/auth',
	},
	{
		path: '/logout',
		name: 'Logout',
		component: LogoutScreen,
		layout: '/auth',
	},
	{
		path: '/',
		name: 'Home',
		component: HomeScreen,
		layout: '/home',
	},
	{
		path: '/apply',
		name: 'Apply',
		component: ApplyScreen,
		layout: '/home',
	},
	{
		path: '/dashboard',
		name: 'Dashboard Home',
		component: DashboardScreen,
		layout: '/home',
	},
	{
		path: '/dashboard/company',
		name: 'Company',
		component: CompanyManagementScreen,
		layout: '/home',
	},
	{
		path: '/dashboard/hire',
		name: 'Applications',
		component: ApplicationsScreen,
		layout: '/home',
	},
	{
		path: '/dashboard/payout',
		name: 'Payout',
		component: PayoutScreen,
		layout: '/home',
	},
	{
		path: '/ttools/admin',
		name: 'Admin',
		component: TToolsAdminScreen,
		layout: '/home',
	},
	{
		path: '/ttools/',
		name: 'TTools Home',
		component: TToolsScreen,
		layout: '/home',
	},
	{
		path: '/ttools/biz/',
		name: 'Businesses',
		component: BizScreen,
		layout: '/home',
	},
	{
		path: '/ttools/biz/map/',
		name: 'Biz Map',
		component: BizMapScreen,
		layout: '/home',
	},
	{
		path: '/ttools/storage/',
		name: 'Storage',
		component: StoragesScreen,
		layout: '/home',
	},
	{
		path: '/ttools/storage/map/',
		name: 'Storage Map',
		component: StorageMapScreen,
		layout: '/home',
	},
	{
		path: '/ttools/trucking/',
		name: 'Trucking',
		component: UnderConstruction,
		layout: '/home',
	},
	{
		path: '/ttools/trucking/map/',
		name: 'Trucking Map',
		component: UnderConstruction,
		layout: '/home',
	},
	{
		path: '/ttools/completionist',
		name: 'Completionist',
		component: CompletionistScreen,
		layout: '/home',
	},
	{
		path: '/profile',
		name: 'Profile',
		component: ProfileScreen,
		layout: '/home',
	},
	{
		path: '*',
		name: '404',
		component: ErrorPage,
		layout: '/auth',
	},
	{
		path: '*',
		name: '404',
		component: ErrorPage,
		layout: '/home',
	},
];

export default routes;
