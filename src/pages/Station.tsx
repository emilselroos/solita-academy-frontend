import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ButtonBack from '../components/ButtonBack';
import Map from '../components/Map';
import { API_ENDPOINT } from '../CONSTANTS';
import Capasity from '../components/Capasity';
import ReturningJourneysStatistics from '../components/ReturningJourneysStatistics';
import DeparturingJourneysStatistics from '../components/DeparturingJourneysStatistics';

interface IStation {
	station_number: number;
	name: string;
	city: string;
	address: string;
	capasity: number;
	x: number;
	y: number;
	stats: {
		departureJourneysCount: number;
		returnJourneysCount: number;
		topDestinations: IDestionationStation[];
		topOrigins: IOriginStation[];
		incomingAverageDistance: number;
		outgoingAverageDistance: number;
	};
	departure_journeys: any;
	return_journeys: any;
}

interface IDestionationStation {
	name: string;
	destination_station_id: number;
	count: number;
}

interface IOriginStation {
	name: string;
	return_station_id: number;
	count: number;
}

const Station = () => {
	const { station_number } = useParams();
	const [station, setStation] = useState<IStation | undefined>(undefined);

	useEffect(() => {
		setStation(undefined);
		fetch(`${API_ENDPOINT}/stations/${station_number}`)
			.then((response) => response.json())
			.then((jsonData) => {
				const { station, stats } = jsonData.data;
				setStation({
					...station,
					stats,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}, [station_number]);

	return (
		<>
			<Grid container alignItems="center" justifyContent="flex-start">
				<Grid item>
					<ButtonBack />
				</Grid>
				<Grid item>
					<Typography variant="h1">
						{station_number} -{' '}
						{station ? (
							station.name
						) : (
							<Skeleton width={200} inline />
						)}
					</Typography>
				</Grid>
			</Grid>

			<Card style={{ paddingBottom: '2rem' }}>
				<CardMedia
					sx={{ height: 260, textAlign: 'center' }}
					title="Map"
				>
					{station && <Map x={station.x} y={station.y} />}
				</CardMedia>
				<Typography
					variant="body1"
					textAlign="center"
					marginBottom="1.5rem"
				>
					<small style={{ color: 'grey' }}>
						{station ? station.address : <Skeleton width={200} />}
					</small>
				</Typography>

				<Grid item xs={12}>
					{station ? (
						<Capasity capasity={station.capasity} />
					) : (
						<Skeleton />
					)}
				</Grid>

				<Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />

				<Grid container textAlign="center">
					<Grid item sm={12} md={6}>
						<Typography variant="h3">
							Departuring journeys
						</Typography>
						{station ? (
							<DeparturingJourneysStatistics
								journeysCount={
									station.stats.departureJourneysCount
								}
								topStations={station.stats.topDestinations}
								averageDistance={
									station.stats.outgoingAverageDistance
								}
							/>
						) : (
							<Skeleton count={7} height={24} width={300} />
						)}
					</Grid>
					<Grid item sm={12} md={6}>
						<Typography variant="h3">Returning journeys</Typography>
						{station ? (
							<ReturningJourneysStatistics
								journeysCount={
									station.stats.returnJourneysCount
								}
								topStations={station.stats.topOrigins}
								averageDistance={
									station.stats.incomingAverageDistance
								}
							/>
						) : (
							<Skeleton count={7} height={24} width={300} />
						)}
					</Grid>
				</Grid>
			</Card>
		</>
	);
};

export default Station;
