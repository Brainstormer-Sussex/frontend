import { ROUTE_CONSTANTS } from "..";
// import Home from "../../Pages/Home";
import {
	Home,
	NQueenProblem,
	Kanoodle,
	KanoodlePuzzle,
	PolySpherePyramidPuzzle
} from "../../containers";


export const ROUTES = [
	{
		path: ROUTE_CONSTANTS.BASE,
		exact: true,
		element: <Home/>,
		view: 'Group 11',
	},
	{
		path: ROUTE_CONSTANTS.NQUEEN,
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
	{
		path: ROUTE_CONSTANTS.POLYSPHERE_PYRAMID,
		exact: true,
		element: <PolySpherePyramidPuzzle/>,
		view: 'polysphere pyramid puzzle',
	},
];