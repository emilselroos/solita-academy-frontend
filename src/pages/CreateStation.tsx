import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ButtonBack from '../components/ButtonBack';
import CreateStationForm from '../components/CreateStationForm';

const CreateStation = () => {
	return (
		<>
			<Grid container alignItems="center" justifyContent="flex-start">
				<Grid item>
					<ButtonBack />
				</Grid>
				<Grid item>
					<Typography variant="h1">New station</Typography>
				</Grid>
			</Grid>
			<Card>
				<CreateStationForm />
			</Card>
		</>
	);
};

export default CreateStation;
