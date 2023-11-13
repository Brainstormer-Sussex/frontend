import { ROUTE_CONSTANTS } from "..";
// import Home from "../../Pages/Home";
import {
	Home,
	NQueenProblem,
	Kanoodle,
	KanoodlePuzzle
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
	{
		path: ROUTE_CONSTANTS.KANOODLE,
		exact: true,
		element: <Kanoodle/>,
		view: 'Kanoodle',
	},
	{
		path: ROUTE_CONSTANTS.KANOODLE_PUZZLE,
		exact: true,
		element: <KanoodlePuzzle/>,
		view: 'kanoodle puzzle',
	},
];