import { useSelector } from 'react-redux'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

function LoadingSpinner() {
	const { loading } = useSelector((state) => state.loading)
	return (
		loading ? <Backdrop
			data-testid="progressbar"
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={loading}
		>
			<CircularProgress color="inherit" />
		</Backdrop> : ""
	)
}
export default LoadingSpinner