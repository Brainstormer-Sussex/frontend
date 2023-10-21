import { ROUTE_CONSTANTS } from "..";
// import Home from "../../Pages/Home";
import {
	Home,
	NQueenProblem
} from "../../containers";


export const ROUTES = [
	{
		path: ROUTE_CONSTANTS.BASE,
		exact: true,
		element: <Home/>,
		view: 'Group 11',
	},
	{
		path: ROUTE_CONSTANTS.HOME,
		exact: true,
		element: <NQueenProblem/>,
		view: 'NQueen Problem Home',
	},
];