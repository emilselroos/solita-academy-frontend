import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ButtonBack from '../components/ButtonBack';
import CreateJourneyForm from '../components/CreateJourneyForm';

const CreateJourney = () => {
	return (
		<>
			<Grid container alignItems="center" justifyContent="flex-start">
				<Grid item>
					<ButtonBack />
				</Grid>
				<Grid item>
					<Typography variant="h1">New journey</Typography>
				</Grid>
			</Grid>
			<Card>
				<CreateJourneyForm />
			</Card>
		</>
	);
};

export default CreateJourney;
