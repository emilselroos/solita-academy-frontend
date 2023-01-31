import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import PlaceIcon from '@mui/icons-material/Place';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

import { API_ENDPOINT } from '../CONSTANTS';

const Stations = () => {
	const [stationsCount, setStationsCount] = useState<number | undefined>(
		undefined,
	);
	const [journeysCount, setJourneysCount] = useState<number | undefined>(
		undefined,
	);

	useEffect(() => {
		fetch(`${API_ENDPOINT}/stations/count`)
			.then((response) => response.json())
			.then((jsonData) => {
				const stationsCount = jsonData.data.count;
				// Let's wait for 2 seconds before setting state to show of skeletons
				setTimeout(() => {
					setStationsCount(stationsCount);
				}, 2000);
			})
			.catch((error) => {
				console.error(error);
			});

		fetch(`${API_ENDPOINT}/journeys/count`)
			.then((response) => response.json())
			.then((jsonData) => {
				const journeysCount = jsonData.data.count;
				// Let's wait for 2 seconds before setting state to show of skeletons
				setTimeout(() => {
					setJourneysCount(journeysCount);
				}, 2000);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<>
			<Grid container alignItems="center" justifyContent="space-between">
				<Typography variant="h1">Dashboard</Typography>
			</Grid>

			<Grid container gap={2}>
				<Card style={{ minWidth: '360px', padding: '1.5rem' }}>
					<PlaceIcon
						style={{ float: 'left', marginRight: '0.5rem' }}
					/>
					<Typography variant="h2" style={{ marginBottom: '1.5rem' }}>
						Stations
					</Typography>
					<Typography
						variant="body1"
						style={{ marginBottom: '1rem' }}
					>
						<strong>Count:</strong>{' '}
						{stationsCount ? (
							stationsCount.toLocaleString('fi-FI')
						) : (
							<Skeleton width={40} />
						)}
					</Typography>
					<Link to="/stations/create">
						<Button>
							<AddIcon /> New Station
						</Button>
					</Link>
				</Card>

				<Card style={{ minWidth: '360px', padding: '1.5rem' }}>
					<ModeOfTravelIcon
						style={{ float: 'left', marginRight: '0.5rem' }}
					/>
					<Typography variant="h2" style={{ marginBottom: '1.5rem' }}>
						Journeys
					</Typography>
					<Typography
						variant="body1"
						style={{ marginBottom: '1rem' }}
					>
						<strong>Count:</strong>{' '}
						{journeysCount ? (
							journeysCount.toLocaleString('fi-FI')
						) : (
							<Skeleton width={100} />
						)}
					</Typography>
					<Link to="/journeys/create">
						<Button>
							<AddIcon /> New Journey
						</Button>
					</Link>
				</Card>
			</Grid>
		</>
	);
};

export default Stations;
