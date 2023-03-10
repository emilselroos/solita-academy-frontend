import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { Typography } from '@mui/material';

interface Props {
	journeysCount: number;
	topStations: any;
	averageDistance: number;
}

const ReturningJourneysStatistics = ({
	journeysCount,
	topStations,
	averageDistance,
}: Props) => {
	return (
		<>
			<Tooltip title="Incoming journeys">
				<CallReceivedIcon />
			</Tooltip>{' '}
			<div id="incoming-count">
				<strong>{journeysCount?.toLocaleString()}</strong>
			</div>
			<Box sx={{ margin: '1rem 0' }}>
				{topStations.map((station: any, index: number) => (
					<Typography key={index + 1} variant="body1" lineHeight={2}>
						<Link to={`/stations/${station.departure_station_id}`}>
							{index + 1}. {station.name}
						</Link>
					</Typography>
				))}
			</Box>
			<div id="incoming-average-distance">
				<small>
					<strong>Average distance:</strong>
					<br /> {averageDistance} meters
				</small>
			</div>
		</>
	);
};

export default ReturningJourneysStatistics;
