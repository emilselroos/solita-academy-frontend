import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface IJourney {
	JID: number;
	departure_station_id: number;
	departure_station: IOriginStation;
	departure_time: Date;
	return_station_id: number;
	return_station: IDestionationStation;
	return_time: Date;
	distance: number;
	duration: number;
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

const Journey = () => {
	const navigate = useNavigate();
	const { jid } = useParams();
	const [journey, setJourney] = useState<IJourney | undefined>(undefined);

	useEffect(() => {
		fetch(`http://localhost:4820/journeys/${jid}`)
			.then((response) => response.json())
			.then((jsonData) => {
				const journeyData = jsonData.data;
				console.log(journeyData);
				setJourney(journeyData);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<>
			<Grid container alignItems="center" justifyContent="flex-start">
				<Grid item>
					<Button
						onClick={() => navigate(-1)}
						sx={{ marginRight: '1rem' }}
					>
						<ArrowBackIcon />
					</Button>
				</Grid>
				<Grid item>
					<Typography variant="h1">
						Journey #
						{journey ? (
							`${journey?.JID}`
						) : (
							<Skeleton
								width={150}
								style={{ marginLeft: '0.5rem' }}
								inline
							/>
						)}
					</Typography>
				</Grid>
			</Grid>
			<Card>
				<Grid
					container
					spacing={4}
					justifyContent="space-around"
					alignItems="center"
					sx={{ marginBottom: '2.5rem' }}
				>
					<Grid item xs={12}>
						<Typography variant="h2">
							#
							{journey ? (
								journey?.JID
							) : (
								<Skeleton
									width={150}
									style={{ marginLeft: '0.5rem' }}
									inline
								/>
							)}
						</Typography>
					</Grid>
					<Grid item sm={12} md={4}>
						<Typography
							variant="body1"
							textAlign="center"
							lineHeight={2}
						>
							From
							<br />
							<strong>
								{journey ? (
									<Link
										to={`/stations/${journey.departure_station_id}`}
									>
										{journey.departure_station?.name}
									</Link>
								) : (
									<Skeleton width={100} />
								)}
							</strong>
							<br />
							<small>
								at{' '}
								{journey ? (
									new Date(
										journey.departure_time,
									).toLocaleString()
								) : (
									<Skeleton width={100} inline />
								)}
							</small>
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={4} textAlign="center">
						<KeyboardArrowRightIcon fontSize="large" />
					</Grid>
					<Grid item sm={12} md={4}>
						<Typography
							variant="body1"
							textAlign="center"
							lineHeight={2}
						>
							To
							<br />
							<strong>
								{journey ? (
									<Link
										to={`/stations/${journey.return_station_id}`}
									>
										{journey.return_station?.name}
									</Link>
								) : (
									<Skeleton width={100} />
								)}
							</strong>
							<br />
							<small>
								at{' '}
								{journey ? (
									new Date(
										journey.return_time,
									).toLocaleString()
								) : (
									<Skeleton width={100} inline />
								)}
							</small>
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} textAlign="center">
						<Typography variant="body1">
							<strong>Distance: </strong> <br />{' '}
							{journey ? (
								(journey.distance / 1000).toFixed(2)
							) : (
								<Skeleton width={50} inline />
							)}{' '}
							km
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} textAlign="center">
						<Typography variant="body1">
							<strong>Duration: </strong> <br />{' '}
							{journey ? (
								(journey.duration / 60).toFixed(2)
							) : (
								<Skeleton width={50} inline />
							)}{' '}
							min
						</Typography>
					</Grid>
				</Grid>
			</Card>
		</>
	);
};

export default Journey;
