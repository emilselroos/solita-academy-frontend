import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AlertCard from './AlertCard';
import { API_ENDPOINT } from '../CONSTANTS';

interface FormValues {
	departure_station_id?: number | '';
	return_station_id?: number | '';
	distance?: number | '';
	duration?: number | '';
	departure_time?: Dayjs | null;
	return_time?: Dayjs | null;
}

interface AlertProps {
	type?: 'success' | 'error';
	message?: string;
}

const ScreateStationSchema = yup.object().shape({
	departure_station_id: yup
		.number()
		.typeError('Must be a number')
		.required('* Required'),
	return_station_id: yup
		.number()
		.typeError('Must be a number')
		.required('* Required'),
	distance: yup.number().typeError('Must be a number').required('* Required'),
	duration: yup.number().typeError('Must be a number').required('* Required'),
	departure_time: yup
		.date()
		.typeError('Must be a date')
		.required('* Required'),
	return_time: yup.date().typeError('Must be a date').required('* Required'),
});

const CreateJourneyForm = () => {
	const [alert, setAlert] = useState<AlertProps | undefined>(undefined);
	const initialValues: FormValues = {
		departure_station_id: '',
		return_station_id: '',
		distance: '',
		duration: '',
		departure_time: dayjs('2023-01-21T12:00:00'),
		return_time: dayjs('2023-01-21T14:00:00'),
	};

	const formik = useFormik({
		validationSchema: ScreateStationSchema,
		initialValues: initialValues,
		onSubmit: async (values, actions) => {
			console.log({ values, actions });
			const response = await fetch(`${API_ENDPOINT}/journeys`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});
			const responseData = await response.json();
			if (responseData.error) {
				// console.log(responseData.error);
				setAlert({ type: 'error', ...responseData.error });
			}
			if (responseData.data) {
				// console.log(responseData.data);
				setAlert({ type: 'success', message: 'New journey created!' });
				actions.resetForm();
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container spacing={2}>
				{alert && (
					<Grid item xs={12}>
						<AlertCard type={alert.type} message={alert.message} />
					</Grid>
				)}

				<Grid item xs={12} sm={12} md={6}>
					<TextField
						id="input-departure-station-id"
						helperText={
							formik.touched.departure_station_id
								? formik.errors.departure_station_id
								: 'Departure Station Number'
						}
						type="text"
						name="departure_station_id"
						placeholder="91"
						value={formik.values.departure_station_id}
						onChange={formik.handleChange}
						error={
							formik.touched.departure_station_id &&
							Boolean(formik.errors.departure_station_id)
						}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<TextField
						id="input-return-station-id"
						helperText={
							formik.touched.return_station_id
								? formik.errors.return_station_id
								: 'Return Station Number'
						}
						type="text"
						name="return_station_id"
						placeholder="601"
						value={formik.values.return_station_id}
						onChange={formik.handleChange}
						error={
							formik.touched.return_station_id &&
							Boolean(formik.errors.return_station_id)
						}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6}>
					<TextField
						id="input-distance"
						helperText={
							formik.touched.distance
								? formik.errors.distance
								: 'Distance (in meters)'
						}
						type="text"
						name="distance"
						placeholder="7469"
						value={formik.values.distance}
						onChange={formik.handleChange}
						error={
							formik.touched.distance &&
							Boolean(formik.errors.distance)
						}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<TextField
						id="input-duration"
						helperText={
							formik.touched.duration
								? formik.errors.duration
								: 'Duration (in minutes)'
						}
						type="text"
						name="duration"
						placeholder="62"
						value={formik.values.duration}
						onChange={formik.handleChange}
						error={
							formik.touched.duration &&
							Boolean(formik.errors.duration)
						}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker
							ampm={false}
							value={formik.values.departure_time}
							onChange={(value) => {
								formik.setFieldValue(
									'departure_time',
									dayjs(value),
								);
							}}
							renderInput={(params) => (
								<TextField
									helperText="Departure Date & Time"
									name="departure_time"
									fullWidth
									{...params}
								/>
							)}
						/>
					</LocalizationProvider>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker
							ampm={false}
							value={formik.values.return_time}
							onChange={(value) => {
								formik.setFieldValue(
									'return_time',
									dayjs(value),
								);
							}}
							renderInput={(params) => (
								<TextField
									helperText="Return Date & Time"
									name="return_time"
									fullWidth
									{...params}
								/>
							)}
						/>
					</LocalizationProvider>
				</Grid>

				<Grid item xs={12}>
					<Button type="submit">Create</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default CreateJourneyForm;
