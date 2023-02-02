import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { Typography } from '@mui/material';

interface Props {
	journeysCount: number;
	topStations: any;
	averageDistance: number;
}

const DeparturingJourneysStatistics = ({
	journeysCount,
	topStations,
	averageDistance,
}: Props) => {
	return (
		<>
			<Tooltip title="Departuring journeys">
				<CallMadeIcon />
			</Tooltip>{' '}
			<strong>{journeysCount?.toLocaleString()}</strong>
			<Box sx={{ margin: '1rem 0' }}>
				{topStations.map((station: any, index: number) => (
					<Typography key={index + 1} variant="body1" lineHeight={2}>
						<Link to={`/stations/${station.return_station_id}`}>
							{index + 1}. {station.name}
						</Link>
					</Typography>
				))}
			</Box>
			<small>
				<strong>Average distance:</strong>
				<br /> {averageDistance} meters
			</small>
		</>
	);
};

export default DeparturingJourneysStatistics;
